import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app header', () => {
  render(<App />);
  const header = screen.getByTestId('app-header');
  expect(header).toBeVisible();
});
