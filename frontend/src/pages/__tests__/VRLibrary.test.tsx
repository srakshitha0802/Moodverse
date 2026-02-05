import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import VRLibrary from '../VRLibrary';

describe('VRLibrary', () => {
  it('renders preset scene thumbnails for JPG scenes', () => {
    const { container } = render(
      <MemoryRouter>
        <VRLibrary />
      </MemoryRouter>
    );
    // expect at least one img in the preset scenes area
    const imgs = container.querySelectorAll('.vr-card img');
    expect(imgs.length).toBeGreaterThanOrEqual(1);
  });
});
