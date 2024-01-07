import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Navigation.css';


// Function that returns a navigation bar
function Navigation() {
  return (
    // Navigation container with an unordered list
    <nav className="nav">
      <ul className="nav-list">
        {/* Navigation item for the Home page */}
        <li className="nav-item">
          {/* Link to the Home page */}
          <Link to="/" className="nav-link">Home</Link>
        </li>
        {/* Navigation item for the Search page */}
        <li className="nav-item">
          {/* Link to the Search page */}
          <Link to="/search" className="nav-link">Search</Link>
        </li>
        {/* Navigation item for the Enrollment page */}
        <li className="nav-item">
          {/* Link to the Enrollment page */}
          <Link to="/students" className="nav-link">Enrollment</Link>
        </li>
        {/* Navigation item for the Classroom page */}
        <li className="nav-item">
          {/* Link to the Classroom page */}
          <Link to="/classroom" className="nav-link">Classroom</Link>
        </li>
      </ul>
    </nav>
  );
}



export default Navigation;