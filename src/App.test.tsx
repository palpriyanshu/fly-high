import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app header', () => {
  render(<App />);
  const header = screen.getByTestId('app-header');
  expect(header).toBeVisible();
});

test('renders flights board', () => {
  render(<App />);
  const flightBaord = screen.getByRole('table');
  expect(flightBaord).toBeVisible();
});
