import React from 'react';
import TeacherCard from './teacherCard/TeacherCard';

const HomePage = () => {
  const teachers = [
    {
      id: 1,
      name: 'John Doe',
      imageUrl: '/images/user.png',
      subjects: [
        { id: 'math', name: 'Mathematics' },
        { id: 'science', name: 'Science' }
      ]
    },
    {
      id: 2,
      name: 'Jane Smith',
      imageUrl: '/images/user.png',
      subjects: [
        { id: 'history', name: 'History' },
        { id: 'art', name: 'Art' }
      ]
    }
  ];

  return (
    <div style={styles.page}>
      <div style={styles.instructions}>
        <p>Click on a teacher's card to view their page.</p>
      </div>
      <div style={styles.cardContainer}>
        {teachers.map(teacher => (
          <TeacherCard key={teacher.id} teacher={teacher} />
        ))}
      </div>
    </div>
  );
};

const styles = {
  page: {
    color: '#FFA500', // Orange text color for consistency with the theme
    backgroundColor: '#333', // Dark background to match the theme
    padding: '20px',
    minHeight: '100vh', // Ensure it takes minimum full height
  },
  instructions: {
    textAlign: 'center',
    margin: '20px 0',
    fontSize: '1.2rem',
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: '20px',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: '20px',
    backgroundColor: '#121212', // Dark mode background
  },
};

export default HomePage;
