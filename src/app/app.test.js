/* eslint-disable no-undef */
import React from 'react';
import { render, screen } from '@testing-library/react';

import App from 'app/app';

// eslint-disable-next-line no-undef
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
