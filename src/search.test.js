
// Import necessary libraries for testing
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Search from './components/Search';

// Mock the fetch function to simulate API calls
jest.mock('node-fetch');



describe('Search Component Tests', () => {
  // Test 1: Renders the component without crashing
  it('renders Search component without crashing', () => {
    render(<Search />);
    expect(screen.getByText('Find Your Student!')).toBeInTheDocument();
  });


  // Test 2: Handles input change in the search bar
  it('handles input change in the search bar', () => {
    render(<Search />);
    const searchInput = screen.getByPlaceholderText('Search by name');

    // Enter a search query and check if the input value is updated
    fireEvent.change(searchInput, { target: { value: 'Alice' } });
    expect(searchInput.value).toBe('Alice');
  });

  
});




