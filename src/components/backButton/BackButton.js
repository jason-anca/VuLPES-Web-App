import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(-1)} style={styles.button}>
      &#x2190; Back
    </button>
  );
};

const styles = {
  button: {
    cursor: 'pointer',
    padding: '10px 15px',
    margin: '10px',
    backgroundColor: '#FFA500',
    color: '#333',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
  },
};

export default BackButton;
