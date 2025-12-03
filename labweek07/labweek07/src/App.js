import React, { useState } from 'react';
import './App.css';

function App() {
  const [studentInfo] = useState({
    name: "Shayan Pourahmad",
    studentId: "101474651",
    course: "COMP 3123 - Full Stack Development I",
    semester: "Fall 2023",
    college: "George Brown College"
  });

  const [courses] = useState([
    { code: "COMP 3123", name: "Full Stack Development I" },
    { code: "COMP 3125", name: "Web Development" },
    { code: "MATH 1102", name: "Technical Mathematics" },
    { code: "COMM 2000", name: "Technical Communication" }
  ]);

  return (
    <div className="App">
      <header className="App-header">
        <div className="student-info">
          <h1>Student Dashboard</h1>
          <div className="info-card">
            <h2>Student Information</h2>
            <p><strong>Name:</strong> {studentInfo.name}</p>
            <p><strong>Student ID:</strong> {studentInfo.studentId}</p>
            <p><strong>Course:</strong> {studentInfo.course}</p>
            <p><strong>Semester:</strong> {studentInfo.semester}</p>
            <p><strong>College:</strong> {studentInfo.college}</p>
          </div>
        </div>
        
        <div className="courses-section">
          <h2>Current Courses</h2>
          <div className="courses-grid">
            {courses.map((course, index) => (
              <CourseCard 
                key={index}
                code={course.code}
                name={course.name}
              />
            ))}
          </div>
        </div>
      </header>
    </div>
  );
}

// Component using props
function CourseCard({ code, name }) {
  return (
    <div className="course-card">
      <h3>{code}</h3>
      <p>{name}</p>
    </div>
  );
}

export default App;