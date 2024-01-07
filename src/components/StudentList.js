import React, { useState, useEffect } from 'react';
import './styles/StudentList.css';



function StudentList() {
  // State variables for storing the list of students, new student details, and the student being edited
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    name: '',
    email: '',
    address: '',
    phoneNumber: '',
    birthdate: '',
    grade: '',
  });
  const [editingStudent, setEditingStudent] = useState(null);

  // Effect hook to fetch students from the API on component mount
  useEffect(() => {
    fetchStudents();
  }, []);

  // Function to fetch students from the API
  const fetchStudents =  () => {
    fetch('http://localhost:8080/api/student')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error fetching students');
        }
        return response.json();
      })
      .then(data => setStudents(data))
      .catch(error => console.error('Error fetching students', error));
  };


  const isValidEmail = (email) => {
    // Regular expression for a basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhoneNumber = (phoneNumber) => {

    // This assumes a valid phone number has at least 10 digits
    const phoneNumberRegex = /^\d{10,}$/;
    return phoneNumberRegex.test(phoneNumber);
  };

  const isValidBirthdate = (birthdate) => {
    // Regular expression for a basic birthdate validation (YYYY-MM-DD)
    const birthdateRegex = /^\d{4}-\d{2}-\d{2}$/;
    return birthdateRegex.test(birthdate);
  };

  const handleAddStudent = () => {
    // Check if any field is empty
    if (
      newStudent.name.trim() === '' ||
      newStudent.email.trim() === '' ||
      newStudent.address.trim() === '' ||
      newStudent.phoneNumber.trim() === '' ||
      newStudent.birthdate.trim() === '' ||
      newStudent.grade.trim() === ''
    ) {
      alert('Please fill in all fields.');
      return;
    }

    // Check if the email is valid
    if (!isValidEmail(newStudent.email)) {
      alert('Invalid email format. (ex: Hans.Müller@online.de)');
      return;
    }

    // Check if the phone number is valid
    if (!isValidPhoneNumber(newStudent.phoneNumber)) {
      alert('Invalid phone number format. Please use only 10 digits');
      return;
    }

    // Check if the birthdate is valid
    if (!isValidBirthdate(newStudent.birthdate)) {
      alert('Invalid birthdate format. Please use YYYY-MM-DD.');
      return;
    }

    // Makes the API call to add the student
    fetch('http://localhost:8080/api/student', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newStudent),
    })
      .then(response => {
        if (!response.ok) {
          console.error('Error:', response.statusText);
          throw new Error('Error adding student');
        }
        setNewStudent({
          name: '',
          email: '',
          address: '',
          phoneNumber: '',
          birthdate: '',
          grade: '',
        }); // Clears input
        fetchStudents(); // Refreshes the student list
      })
      .catch(error => console.error('Error adding student', error));
  };

  // Function to handle deleting a student
  const handleDeleteStudent = (studentId) => {
    fetch(`http://localhost:8080/api/student/delete?studentId=${studentId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error deleting student');
        }
        fetchStudents(); // Refreshes the student list
      })
      .catch(error => console.error('Error deleting student', error));
  };

  // Function to handle clicking the update button for a student
  const handleUpdateClick = (student) => {
    setEditingStudent(student);
  };

  // Handles updating the students
  const handleUpdateStudent = () => {
    // Check if any field is empty
    if (
      editingStudent.name.trim() === '' ||
      editingStudent.email.trim() === '' ||
      editingStudent.address.trim() === '' ||
      editingStudent.phoneNumber.trim() === '' ||
      editingStudent.birthdate.trim() === '' ||
      editingStudent.grade.trim() === ''
    ) {
      alert('Please fill in all fields.');
      return;
    }

    // Check if the email is valid
    if (!isValidEmail(editingStudent.email)) {
      alert('Invalid email format. (ex: Hans.Müller@online.de)');
      return;
    }

    // Check if the phone number is valid
    if (!isValidPhoneNumber(editingStudent.phoneNumber)) {
      alert('Invalid phone number format. Please use 10 digits');
      return;
    }

    // Check if the birthdate is valid
    if (!isValidBirthdate(editingStudent.birthdate)) {
      alert('Invalid birthdate format. Please use YYYY-MM-DD.');
      return;
    }

    fetch(`http://localhost:8080/api/student/update?studentId=${editingStudent.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editingStudent),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error updating student');
        }
        setEditingStudent(null); // Resets editing state
        fetchStudents(); // Refreshes the student list
      })
      .catch(error => console.error('Error updating student', error));
  };

  const inputFields = [
    { key: 'name', placeholder: 'Name' },
    { key: 'email', placeholder: 'Email' },
    { key: 'address', placeholder: 'Address' },
    { key: 'phoneNumber', placeholder: 'Phone Number (10 digits)' },
    { key: 'birthdate', placeholder: 'Birthdate (YYYY-MM-DD)' },
    { key: 'grade', placeholder: 'Grade' },
  ];

  const renderInputUpdate = (field) => (
    <input
      key={field.key}
      type="text"
      value={editingStudent[field.key]}
      onChange={(e) => setEditingStudent({ ...editingStudent, [field.key]: e.target.value })}
      placeholder={field.placeholder}
    />
  );

  const renderInputAdd = (field) => (
    <input
      key={field.key}
      type="text"
      value={newStudent[field.key]}
      onChange={(e) => setNewStudent({ ...newStudent, [field.key]: e.target.value })}
      placeholder={field.placeholder}
    />
  );

  return (
    <div className="student-list-container">
      <h1 id="title">Enrollment</h1>
      <p>Use the Form on the left to <strong>add</strong> a student to the System.</p>
      <ul className="student-list-ul">
        {students.map(student => (
          <li key={student.id} className="student-item">
            {editingStudent && editingStudent.id === student.id ? (
              <div className="edit-student-form">
                {inputFields.map(renderInputUpdate)}
                <button className="update-button" onClick={handleUpdateStudent}>Update</button>
              </div>
            ) : (
              <div className="student-info">
                <div className="student-info-name"><p>{student.name}</p></div>
                <p><b>Email:</b> {student.email}</p>
                <p><b>Address:</b> {student.address}</p>
                <p><b>Phone Number:</b> {student.phoneNumber}</p>
                <p><b>Birthdate:</b> {student.birthdate}</p>
                <p><b>Grade:</b> {student.grade}</p>
                <button className="delete-button" onClick={() => handleDeleteStudent(student.id)}>Delete</button>
                <button className="update-button"  onClick={() => handleUpdateClick(student)}>Update</button>
              </div>
            )}
          </li>
        ))}
      </ul>
      <div className="add-student-form">
        <h2>Student Form</h2>
        {inputFields.map(renderInputAdd)}
        <button className="add-button" onClick={handleAddStudent}>Add Student</button>
      </div>
    </div>
  );
}

export default StudentList;
