import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Search from './components/Search';
import StudentList from './components/StudentList';
import ClassRoomStudents from './components/ClassRoomStudents';
import Navigation from './components/Navigation';
import Home from './components/Home';



function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/students" element={<StudentList />} />
        <Route path="/classroom" element={<ClassRoomStudents />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </Router>
  );
}



export default App;
