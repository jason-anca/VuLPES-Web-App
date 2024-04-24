import React from 'react';
import { useNavigate } from 'react-router-dom';

const SubjectCard = ({ subject, teacherId }) => {
  const navigate = useNavigate();

  console.log("Received IDs in SubjectCard:", teacherId, subject.uniqueId);

  const handleClick = () => {
    if (teacherId && subject.uniqueId) {
      console.log("Navigating to Subject Page with:", teacherId, subject.uniqueId);
      navigate(`/teacher/${teacherId}/subject/${subject.uniqueId}`);
    } else {
      console.error("Missing IDs:", { teacherId, subjectUniqueId: subject.uniqueId });
    }
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
    backgroundColor: '#282C34',
    color: '#FFA500',
    padding: '20px',
    margin: '10px',
    borderRadius: '8px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  title: {
    margin: '0',
  },
};

export default SubjectCard;
