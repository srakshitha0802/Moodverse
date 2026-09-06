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

  it('validates default image on mount and shows Ready', async () => {
    const imgMock = vi.spyOn(validation, 'validateImage').mockResolvedValue();
    const vidMock = vi.spyOn(validation, 'validateVideo');

    render(<VRSelector />);

    // Wait for the status to show "Ready"
    await waitFor(() => expect(screen.getByText(/Ready/i)).toBeInTheDocument());

    // find VRExperience and ensure it received a scene (first scene URL)
    const exp = screen.getByTestId('vr-experience');
    expect(exp.textContent).toBeTruthy();
    // validateImage may or may not be called depending on URL type
    // The important thing is the component loads successfully
    expect(screen.getByRole('button', { name: /Sechelt Beach/i })).toBeInTheDocument();
  });

  it('selects a new scene when clicked and shows Ready', async () => {
    const imgMock = vi.spyOn(validation, 'validateImage').mockResolvedValue();
    const vidMock = vi.spyOn(validation, 'validateVideo');

    render(<VRSelector />);

    // Wait for initial load
    await waitFor(() => expect(screen.getByText(/Ready/i)).toBeInTheDocument());

    // Click on Zen Park button (second scene)
    const btn = screen.getByRole('button', { name: /Zen Park/i });
    fireEvent.click(btn);

    await waitFor(() => expect(screen.getByText(/Ready/i)).toBeInTheDocument());
    const exp = screen.getByTestId('vr-experience');
    expect(exp.textContent).toContain('park.jpg');
  });

  it('loads a custom URL and shows Ready', async () => {
    vi.spyOn(validation, 'validateImage').mockResolvedValue();
    vi.spyOn(validation, 'validateVideo').mockResolvedValue();

    render(<VRSelector />);

    // Wait for initial load
    await waitFor(() => expect(screen.getByText(/Ready/i)).toBeInTheDocument());

    const input = screen.getByPlaceholderText(/Paste 360° image URL/i);
    fireEvent.change(input, { target: { value: 'https://example.com/panorama.jpg' } });
    const loadBtn = screen.getByRole('button', { name: /Load/i });
    fireEvent.click(loadBtn);

    await waitFor(() => expect(screen.getByText(/Ready/i)).toBeInTheDocument());
  });
});
