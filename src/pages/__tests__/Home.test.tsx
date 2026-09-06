import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Home from '../Home';
import { MemoryRouter } from 'react-router-dom';

describe('Home page', () => {
  it('renders feature cards', async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    
    // Wait for loading screen to disappear (1200ms timeout in component)
    await waitFor(() => {
      expect(screen.queryByText(/Loading Moodverse/i)).not.toBeInTheDocument();
    }, { timeout: 5000 });
    
    // Now check for feature cards
    expect(screen.getAllByText(/Meditation/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Yoga/i).length).toBeGreaterThan(0);
  });
});
