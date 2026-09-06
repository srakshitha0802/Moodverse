import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MoodDetector from '../MoodDetector';

function makeMockStream(){
  const stop = vi.fn();
  return {
    getTracks: () => [{ stop }],
    _stop: stop
  } as any;
}

describe('MoodDetector', () => {
  beforeEach(()=>{
    vi.restoreAllMocks();
    // Ensure mediaDevices exists in the test environment
    if(!(global as any).navigator) (global as any).navigator = {};
    (global as any).navigator.mediaDevices = { getUserMedia: vi.fn() };
  });

  it('starts camera when permission granted and toggles off', async () => {
    const stream = makeMockStream();
    const getUserMedia = vi.spyOn(navigator.mediaDevices, 'getUserMedia' as any).mockResolvedValue(stream as any);

    render(<MoodDetector />);

    await waitFor(()=> expect(getUserMedia).toHaveBeenCalled());

    // Button to toggle
    const btn = screen.getByRole('button', { name: /Turn camera off|Turn camera on/i });
    expect(btn).toBeInTheDocument();

    // Click to turn off
    fireEvent.click(btn);

    await waitFor(()=> expect(stream.getTracks()[0].stop).toHaveBeenCalled());
  });

  it('handles permission denied gracefully', async () => {
    const getUserMedia = vi.spyOn(navigator.mediaDevices, 'getUserMedia' as any).mockRejectedValue(new Error('denied'));
    render(<MoodDetector />);

    await waitFor(()=> expect(screen.getByText(/Camera access denied/i)).toBeInTheDocument());
  });
});
