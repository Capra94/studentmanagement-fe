


import React from 'react';
import './styles/Home.css';



const Home = () => {
  return (
    // Container for the home content
    <div className="home-container">
      {/* Heading for the welcome message */}
      <h1 className="home-heading">Welcome to the BEST Student-Manager You will never need!</h1>
      {/* Subtitle for managing students with ease */}
      <p className="home-content">Manage your students and their information with ease.</p>
      {/* Section for displaying current functions */}
      <div className="current-functions">
        <br></br>
        {/* Title for the list of current functions */}
        <p><strong>Current Features</strong></p>
        {/* Unordered list for listing current functions */}
        <ul>
          {/* List item for searching students */}
          <li>Search Students</li>
          {/* List item for enrolling and removing students */}
          <li>Enroll and Remove Students from the System</li>
          {/* List item for changing students' information */}
          <li>Change Student's Info</li>
          {/* List item for adding students to classes */}
          <li>Add Students to Classes and Remove them</li>
        </ul>
      </div>
    </div>
  );
};


export default Home;
