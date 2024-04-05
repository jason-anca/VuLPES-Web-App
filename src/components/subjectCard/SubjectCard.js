// components/SubjectCard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const SubjectCard = ({ subject, teacherId }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/teacher/${teacherId}/subject/${subject.uniqueId}`);
  };

  return (
    <div style={styles.card} onClick={handleClick}>
      <h3 style={styles.title}>{subject.name}</h3>
    </div>
  );
};

const styles = {
  card: {
    cursor: 'pointer',
    backgroundColor: '#333',
    color: '#FFA500',
    padding: '20px',
    margin: '10px',
    borderRadius: '8px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    // Add more styling as needed
  },
  title: {
    margin: '0',
  },
  // Add more styles if necessary
};

export default SubjectCard;
