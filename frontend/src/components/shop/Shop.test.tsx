import React from 'react';
import { render, screen } from '@testing-library/react';
import Shop from './Shop';

test('renders learn react link', () => {
  render(<Shop />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
