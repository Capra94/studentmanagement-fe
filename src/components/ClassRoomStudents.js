import React, { useState, useEffect, useCallback } from 'react';
import './styles/ClassRoomStudents.css';

// Functional component for managing class rooms and students
const ClassRoomStudents = () => {
  // State variables for managing class rooms, new class name, selected class room ID,
  // students, selected student ID, and students in the selected classroom
  const [classRooms, setClassRooms] = useState([]);
  const [newClassName, setNewClassName] = useState('');
  const [selectedClassRoomId, setSelectedClassRoomId] = useState(null);
  const [students, setStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [classroomStudents, setClassroomStudents] = useState([]);
  
  

  // Function to fetch and set students in the selected classroom
  const getStudentsInClassroom = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/studentclassroom/getAll/${selectedClassRoomId}`);
      const data = await response.json();

      if (Array.isArray(data)) {
        if (data.length > 0) {
          setClassroomStudents(data);
        } else {
          console.log('No students found in the selected classroom.');
          setClassroomStudents([]);
        }
      } else {
        console.error('Invalid response format for classroom students:', data);
      }
    } catch (error) {
      console.error('Error fetching students in classroom:', error);
    }
  }, [selectedClassRoomId]);

  // Effect hook to fetch students in the selected classroom when the selectedClassRoomId changes
  useEffect(() => {
    if (selectedClassRoomId) {
      getStudentsInClassroom();
    }
  }, [selectedClassRoomId, getStudentsInClassroom]);

  // Effect hook to fetch all class rooms and students on component mount
  useEffect(() => {
    getAllClassRooms();
    getAllStudents();
  }, []);

  // Function to fetch all class rooms from the API
  const getAllClassRooms = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/classroom/getClassrooms');
      const data = await response.json();
      setClassRooms(data);
    } catch (error) {
      console.error('Error fetching classrooms:', error);
    }
  };

  // Function to fetch all students from the API
  const getAllStudents = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/student');
      const data = await response.json();

      if (Array.isArray(data)) {
        setStudents(data);
      } else {
        console.error('Invalid response format for students:', data);
      }
    } catch (error) {
      console.error('Error fetching all students:', error);
    }
  };

  // Function to create a new class room
  const createClassRoom = async () => {
    try {

      if (!newClassName.trim()) {
        alert("Classroom name cannot be empty");
        return;
      }

      const response = await fetch('http://localhost:8080/api/classroom/createClassroom', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newClassName }),
      });


      if (!response.ok) {
        const errorMessage = await response.text();

        if (errorMessage.includes("Classroom with the same name already exists")) {
          // Display a specific alert for the conflict error
          alert("Classroom with the same name already exists. Please choose another name.");
        } else {
          // Display a generic error alert for other conditions
          alert("Error creating classroom. Please try again.");
        }

        return;
      }

      const data = await response.json();
      setClassRooms([...classRooms, data]);
      setNewClassName('');
    } catch (error) {
      console.error(error.message);
    }
  };

  // Function to delete a class room
  const deleteClassRoom = async (classRoomId) => {
    try {
      await fetch(`http://localhost:8080/api/classroom/${classRoomId}`, {
        method: 'DELETE',
      });
      setClassRooms(classRooms.filter((classRoom) => classRoom.id !== classRoomId));
    } catch (error) {
      console.error('Error deleting classroom:', error);
    }
  };


  // Function to add a student to the selected classroom
  const addStudentToClassRoom = async () => {
    try {
      if (!selectedStudentId || !selectedClassRoomId) {
        alert("Please select a student and a classroom");
        return;
      }


      const requestBody = {
        studentId: selectedStudentId,
      };


      const response = await fetch(`http://localhost:8080/api/studentclassroom/add/${selectedStudentId}/${selectedClassRoomId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorMessage = await response.text();

        // Checks if the error message indicates that the student is already in the classroom
        if (errorMessage.includes("Student already in the classroom")) {
          // Displays a specific alert for this condition
          alert("The student is already in the selected classroom");
        } else {
          // Displays a generic error alert for other conditions
          alert("Error adding student to classroom. Please try again.");
        }

        return;
      }

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Error adding student to classroom: ${errorMessage}`);
      }

      
      getStudentsInClassroom();
      setSelectedStudentId(null);
    } catch (error) {
      console.error('Error adding student to classroom:', error);
    }
  };


  // Function to delete a student from the selected classroom
  const deleteStudentFromClassroom = async (studentId, classroomId) => {
    try {
      await fetch(`http://localhost:8080/api/studentclassroom/remove/${studentId}/${classroomId}`, {
        method: 'DELETE',
      });

      setClassroomStudents((prevStudents) =>
        prevStudents.filter((studentObj) => studentObj.student.id !== studentId)
      );
    } catch (error) {
      console.error('Error deleting student from classroom:', error);
    }
  };


  return (
    <div className="container-wrapper">
      <div className="enrollment-title">
        <h1>Classroom Enrollment</h1>
      </div>
      <div className="addClassroom-wrapper">
        <div className="container">
        

          {/* Create Classroom Section */}
          <div>
            <p>Enter a name to create a class</p>
            <div className="input-container">
              <input type="text" placeholder="Class Name" value={newClassName} onChange={(e) => setNewClassName(e.target.value)} />
              <button onClick={createClassRoom}>Create Classroom</button>
            </div>
          </div>

          {/* Display Classrooms Section */}
          <div>
            <h3>Classrooms</h3>
            <ul className="classroom-list">
              {classRooms.map((classRoom) => (
                <li key={classRoom.id} className="classroom-list-item">
                  {classRoom.name}
                  <button className="deleteButton" onClick={() => deleteClassRoom(classRoom.id)}>Delete</button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Display add student to classroom */}
        <div className='studentClassroomContainer'>
          <div className='studentClassroomWrapper' >
            <br></br>
            <p>Select a classroom from the dropdown menu to view enrolled students</p>
            <p><b>Adding students</b>: Choose a <b>classrom</b> and a <b>student</b> to assign the student to the class</p>
            <select onChange={(e) => setSelectedClassRoomId(e.target.value)}>
              <option value="">Select Classroom</option>
              {classRooms.map((classRoom) => (
                <option key={classRoom.id} value={classRoom.id}>
                  {classRoom.name}
                </option>
              ))}
            </select>

            <select onChange={(e) => setSelectedStudentId(e.target.value)}>
              <option value="">Select Student</option>
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.name}
                </option>
              ))}
            </select>

            <button onClick={addStudentToClassRoom}>Add Student</button>
          </div>


          {/* Display students in selected classroom */}
          <div className='student-classroom'>
            <h2>Students in Selected Classroom</h2>
            {console.log('Classroom Students:', classroomStudents)}
            {classroomStudents.length > 0 ? (
              <ul className="classroom-list">
                {classroomStudents.map((studentObj) => (
                  <li key={studentObj.id} className="classroom-list-item">
                    {studentObj.student.name}
                    <button className="deleteButton" onClick={() => deleteStudentFromClassroom(studentObj.student.id, selectedClassRoomId)}>Delete</button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No students in this classroom.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


export default ClassRoomStudents;
