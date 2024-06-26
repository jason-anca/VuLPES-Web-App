import React from 'react';
import { useNavigate } from 'react-router-dom';

const TeacherCard = ({ teacher }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log("Navigating with teacher ID:", teacher.id);
    navigate(`/teacher/${teacher.id}`);
  };
  const imagePath = teacher.imageUrl || '/images/user.png'; //fallback image path for users
  console.log(`Loading image for ${teacher.name}: ${teacher.imageUrl}`); // Debugging line

  const handleImageError = (e) => {
    console.log(`Error loading image for ${teacher.name}`);
};

  return (
    <div style={styles.card} onClick={handleClick}>
      <img src={imagePath} alt={teacher.name} style={styles.image} onError={handleImageError} />
      <h3 style={styles.name}>{teacher.name}</h3>
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
