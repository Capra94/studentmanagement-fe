import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import ClassRoomStudents from './components/ClassRoomStudents';

// Mocks the fetch function to simulate API calls
jest.mock('node-fetch');

describe('Classroom Component Tests', () => {
  // Test 1: Renders the component without crashing
  it('renders Classroom component without crashing', () => {
    render(<ClassRoomStudents />);
    expect(screen.getByText('Classroom Enrollment')).toBeInTheDocument();
  });

  

});