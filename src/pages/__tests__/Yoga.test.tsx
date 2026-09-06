import React from 'react';
import { render, screen } from '@testing-library/react';
import Yoga from '../Yoga';

describe('Yoga page', () => {
  it('renders steps with images and video iframes', () => {
    const { container } = render(<Yoga />);
    expect(screen.getByText(/Step-by-step Yoga Sequence/i)).toBeInTheDocument();

    const imgs = container.querySelectorAll('img');
    expect(imgs.length).toBeGreaterThanOrEqual(5);

    const iframes = container.querySelectorAll('iframe');
    expect(iframes.length).toBeGreaterThanOrEqual(5);

    // basic accessibility checks
    imgs.forEach(img => expect(img.getAttribute('alt')).toBeTruthy());
    iframes.forEach(f => expect(f.getAttribute('title')).toBeTruthy());
  });
});
