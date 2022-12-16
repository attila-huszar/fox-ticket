import React from 'react';
import { render, screen } from '@testing-library/react';
import Purchase from './purchases';

test('renders learn react link', () => {
  render(<Purchase />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
