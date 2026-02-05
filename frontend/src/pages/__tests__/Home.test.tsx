import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../Home';
import { MemoryRouter } from 'react-router-dom';

describe('Home page', () => {
  it('renders feature cards', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(screen.getAllByText(/Meditation/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Yoga/i).length).toBeGreaterThan(0);
  });
});
