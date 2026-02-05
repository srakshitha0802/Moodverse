import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import VRSelector from '../VRSelector';
import * as validation from '../../utils/vrValidation';

// Mock VRExperience to make assertions simpler
vi.mock('../VRExperience', () => ({
  default: (props: any) => <div data-testid="vr-experience">{props.scene}</div>
}));

describe('VRSelector', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('validates default image on mount and shows OK', async () => {
    const imgMock = vi.spyOn(validation, 'validateImage').mockResolvedValue();
    const vidMock = vi.spyOn(validation, 'validateVideo');

    render(<VRSelector />);

    await waitFor(() => expect(screen.getByText(/OK/i)).toBeInTheDocument());

    // find VRExperience and ensure it received a scene (first scene URL)
    const exp = screen.getByTestId('vr-experience');
    expect(exp.textContent).toBeTruthy();
    expect(imgMock).toHaveBeenCalled();
    expect(vidMock).not.toHaveBeenCalled();
  });

  it('validates a video scene when clicked and shows OK', async () => {
    const imgMock = vi.spyOn(validation, 'validateImage').mockImplementation(() => Promise.reject(new Error('no')));
    const vidMock = vi.spyOn(validation, 'validateVideo').mockResolvedValue();

    render(<VRSelector />);

    // click a button that contains a .mp4 in the VR_SCENES list
    const btn = screen.getByRole('button', { name: /Flower Demo \(video\)/i });
    fireEvent.click(btn);

    await waitFor(() => expect(screen.getByText(/OK/i)).toBeInTheDocument());
    expect(vidMock).toHaveBeenCalled();
    const exp = screen.getByTestId('vr-experience');
    expect(exp.textContent).toContain('.mp4');
  });

  it('shows fallback when both image and video validation fail for a custom URL', async () => {
    vi.spyOn(validation, 'validateImage').mockRejectedValue(new Error('bad'));
    vi.spyOn(validation, 'validateVideo').mockRejectedValue(new Error('bad'));

    render(<VRSelector />);

    const input = screen.getByPlaceholderText(/Paste image or video URL/i);
    fireEvent.change(input, { target: { value: 'https://example.com/broken' } });
    const loadBtn = screen.getByRole('button', { name: /Load URL/i });
    fireEvent.click(loadBtn);

    await waitFor(() => expect(screen.getByText(/Fallback/i)).toBeInTheDocument());
    expect(screen.getByText(/could not be validated/i)).toBeInTheDocument();
  });
});
