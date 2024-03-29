import React from 'react';
import { useNavigate } from 'react-router-dom';

const TeacherCard = ({ teacher }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/teacher/${teacher.id}`);
  };

  console.log(`Loading image for ${teacher.name}: ${teacher.imageUrl}`); // Debugging line

  return (
    <div style={styles.card} onClick={handleClick}>
      <img src={teacher.imageUrl} alt={teacher.name} style={styles.image} />
      <h3 style={styles.name}>{teacher.name}</h3>
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
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  image: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '10px',
  },
  name: {
    margin: '0',
  },
};

export default TeacherCard;
