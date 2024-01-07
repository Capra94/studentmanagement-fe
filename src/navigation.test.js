import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom'; 

import Navigation from './components/Navigation';

// Mocks the fetch function to simulate API calls
jest.mock('node-fetch');

describe('Navigation Component Tests', () => {
  // Test 1: Renders the component without crashing
  it('renders Navigation component without crashing', () => {
    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
    expect(screen.getByText('Enrollment')).toBeInTheDocument();
    expect(screen.getByText('Classroom')).toBeInTheDocument();
  });

 
});