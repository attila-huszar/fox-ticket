import React from 'react';
import { render, screen } from '@testing-library/react';
import Logout from './logout';

test('renders learn react link', () => {
  render(<Logout />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
