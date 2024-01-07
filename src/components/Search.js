import React, { useState, useEffect } from 'react';
import './styles/Search.css'





function Search() {
  // State variables for storing students and search query
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // useEffect to fetch students when the component mounts
  useEffect(() => {
    fetchStudents();
  }, []);

  // Function to fetch students from the API
  const fetchStudents = () => {
    fetch('http://localhost:8080/api/student')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setStudents(data))
      .catch(error => console.error('Error fetching students', error));
  };

  // Function to handle searching for students based on the search query
  const handleSearch = () => {
    const filteredStudents = students.filter(student =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setStudents(filteredStudents);
  };

  // Function to handle clearing the search query and fetching all students
  const handleClearSearch = () => {
    setSearchQuery('');
    fetchStudents();
  };

  
  return (
    <div className="container">
      {/* Heading for the search section */}
      <h1 className="heading">Find Your Student!</h1>
      {/* Subtitle for using the search bar */}
      <p>Use the <strong>search-bar</strong> to find a student currently in the system</p>
      {/* Container for the search input and buttons */}
      <div className="searchContainer">
        {/* Input for entering the search query */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by name"
          className="searchInput"
        />
        {/* Button to initiate the search */}
        <button className="button" onClick={handleSearch}>Search</button>
        {/* Button to clear the search and fetch all students */}
        <button className="button" onClick={handleClearSearch}>Clear Search</button>
      </div>
      <br></br>
      {/* Heading for the list of students */}
      <h2>List of Students</h2>
      {/* Unordered list for displaying the list of students */}
      <ul className="studentList">
        {/* Mapping through the students and rendering each student */}
        {students.map(student => (
          <li key={student.id} className="studentItem">
            {/* Displaying student information */}
            <div>
              <strong>Name:</strong> {student.name}
            </div>
            <div>
              <strong>ID:</strong> {student.id}
            </div>
            <div>
              <strong>Email:</strong> {student.email}
            </div>
            <div>
              <strong>Address:</strong> {student.address}
            </div>
            <div>
              <strong>Phone Number:</strong> {student.phoneNumber}
            </div>
            <div>
              <strong>Birthdate:</strong> {student.birthdate}
            </div>
            <div>
              <strong>Grade:</strong> {student.grade}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}




export default Search;
