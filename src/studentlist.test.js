import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import StudentList from '../components/StudentList';

// Mock the fetch function to simulate API calls
jest.mock('node-fetch');

describe('StudentList Component Tests', () => {
    // Test 1: Renders the component without crashing
    it('renders StudentList component without crashing', () => {
      render(<StudentList />);
      expect(screen.getByText('Enrollment')).toBeInTheDocument();
    });

   
  });
