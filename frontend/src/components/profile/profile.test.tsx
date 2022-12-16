import React from 'react';
import { render, screen } from '@testing-library/react';
import Profile from './profile';

test('renders learn react link', () => {
  render(<Profile />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
