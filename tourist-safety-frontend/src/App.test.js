import { render, screen } from '@testing-library/react';
import App from './App';

test('renders GeoGuard brand', () => {
  render(<App />);
  const brandElement = screen.getByText(/GeoGuard/i);
  expect(brandElement).toBeInTheDocument();
});

test('renders dashboard by default', () => {
  render(<App />);
  const dashboardElement = screen.getByText(/Smart Tourist Dashboard/i);
  expect(dashboardElement).toBeInTheDocument();
});
