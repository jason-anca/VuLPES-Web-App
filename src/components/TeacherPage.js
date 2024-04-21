import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SubjectCard from './subjectCard/SubjectCard';
import '../css/TeacherPage.css';

const TeacherPage = () => {
  const { teacherId } = useParams();
  const [teacher, setTeacher] = useState(null);
  const [selectedClass, setSelectedClass] = useState('');

  console.log("Navigating with teacher ID:", teacherId); // Check if the teacherId is captured correctly

  useEffect(() => {
    const teachers = JSON.parse(localStorage.getItem('teachers')) || [];
    const foundTeacher = teachers.find(t => t.id === teacherId);

    console.log("Teacher details:", foundTeacher);  // To debug and ensure the teacher details are found

    setTeacher(foundTeacher);
  }, [teacherId]);

  if (!teacher) {
    return <div className="page">Teacher not found</div>;
  }

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
  };

  const classes = [...new Set(teacher.subjects.map(subject => subject.classYear))];
  console.log("Classes available:", [...new Set(teacher.subjects.map(subject => subject.classYear))]);

  return (
    <div className="page">
      <h1>{teacher.name}'s Subjects</h1>
      <div>
        <label htmlFor="classFilter" className="labelStyle">Select the Class you are in:</label>
        <select id="classFilter" onChange={handleClassChange} value={selectedClass} className="selectStyle">
          <option value="">Select a Class</option>
          {classes.map(cls => (
            <option key={cls} value={cls}>{cls}</option>
          ))}
        </select>
      </div>
      <div className="subjectsContainer">
        {selectedClass && teacher.subjects
          .filter(subject => subject.classYear === selectedClass)
          .map((subject) => (
            <SubjectCard key={subject.uniqueId} subject={subject} teacherId={teacherId} />
          ))}
      </div>
    </div>
  );
};

export default TeacherPage;
