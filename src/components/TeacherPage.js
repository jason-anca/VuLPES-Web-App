import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SubjectCard from './subjectCard/SubjectCard';

const TeacherPage = () => {
  const { teacherId } = useParams();
  const [teacher, setTeacher] = useState(null);
  const [selectedClass, setSelectedClass] = useState('');

  useEffect(() => {
    const fetchTeacher = () => {
        const teachers = JSON.parse(localStorage.getItem('teachers')) || [];
        const foundTeacher = teachers.find(t => t.id.toString() === teacherId);
        console.log("Loaded subjects for teacher:", foundTeacher?.subjects);
        setTeacher(foundTeacher);
    };

    fetchTeacher();
}, [teacherId]);

  if (!teacher) {
    return <div style={styles.page}>Teacher not found</div>;
  }

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
  };

  const classes = [...new Set(teacher.subjects.map(subject => subject.classYear))];
  console.log("Classes available:", classes);

  return (
    <div style={styles.page}>
      <h1>{teacher.name}'s Subjects</h1>
      <div>
        <label htmlFor="classFilter" style={styles.labelStyle}>Select the Class you are in:</label>
        <select id="classFilter" onChange={handleClassChange} value={selectedClass} style={styles.selectStyle}>
          <option value="">Select a Class</option>
          {classes.map(cls => (
            <option key={cls} value={cls}>{cls}</option>
          ))}
        </select>
      </div>
      <div style={styles.subjectsContainer}>
        {selectedClass && teacher.subjects
          .filter(subject => subject.classYear === selectedClass)
          .map((subject) => (
            <SubjectCard key={subject.uniqueId} subject={subject} />
          ))}
      </div>
    </div>
  );
};

const styles = {
    page: {
        color: '#FFA500',
        backgroundColor: '#333',
        padding: '20px',
        minHeight: '100vh',
    },
    subjectsContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    labelStyle: {
        marginRight: '10px',
        color: '#FFA500',
        fontSize: '18px',
    },
    selectStyle: {
        marginLeft: '10px',
        padding: '8px 12px',
        fontSize: '16px',
        borderRadius: '4px',
        backgroundColor: '#333', // Dark background for contrast
        borderColor: '#FFA500',
        color: '#FFA500', // Orange text color
        outline: 'none',
        '&:hover': {
            backgroundColor: '#555', // Slightly lighter on hover
        },
        '&:focus': {
            borderColor: '#FFA500',
            boxShadow: '0 0 5px #FFA500', // Orange glow effect
        }
    },

};

export default TeacherPage;