import React from 'react'; 
import { render, screen } from '@testing-library/react';
import Dashboard from './Dashboard'; 

test('renders the dashboard heading', () => {
  render(<Dashboard />); // Render the Dashboard component
  const headingElement = screen.getByText(/Hotel Booking Dashboard/i); 
  expect(headingElement).toBeInTheDocument(); 
});
