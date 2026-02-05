import React from 'react';
import { render, screen } from '@testing-library/react';
import Music from '../Music';

describe('Music page', () => {
  it('renders an embedded YouTube iframe for YouTube tracks', () => {
    render(<Music />);
    const iframes = document.querySelectorAll('iframe');
    expect(iframes.length).toBeGreaterThanOrEqual(1);
  });
});
