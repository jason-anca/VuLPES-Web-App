import React, { useState } from 'react';
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

  // State to hold the search query
  const [searchQuery, setSearchQuery] = useState('');

  // Filter teachers based on search query
  const filteredTeachers = teachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={styles.page}>
      <div style={styles.instructions}>
        <p>Click on a teacher's card to view their page.</p>
      </div>
      <div style={styles.searchBox}>
        <input
          type="text"
          placeholder="Search Teachers"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.searchInput}
        />
      </div>
      <div style={styles.cardContainer}>
        {filteredTeachers.map(teacher => (
          <TeacherCard key={teacher.id} teacher={teacher} />
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
  searchBox: {
    textAlign: 'center',
    margin: '20px 0',
  },
  searchInput: {
    fontSize: '16px',
    padding: '10px 20px',
    width: '300px',
    borderRadius: '5px',
    border: '2px solid #FFA500',
  },
};

export default HomePage;
