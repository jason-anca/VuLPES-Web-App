import React from 'react';
import { useParams } from 'react-router-dom';
import SubjectCard from './subjectCard/SubjectCard';

// Example data, replace with your actual data source
const teachers = [
    {
        id: '1',
        name: 'John Doe',
        subjects: [
            { id: 'math', name: 'Mathematics', uniqueId: '1_math' },
        ],
    },
    {
        id: '2',
        name: 'Jane Smith',
        subjects: [
            { id: 'math', name: 'Mathematics', uniqueId: '2_math' },
            { id: 'history', name: 'History', uniqueId: '2_history' },
        ],
    },
];

const TeacherPage = () => {
    const { id } = useParams();
    const teacher = teachers.find((teacher) => teacher.id === id);

    if (!teacher) {
        return <div>Teacher not found</div>;
    }

    return (
        <div style={styles.page}>
            <h1>{teacher.name}'s Subjects</h1>
            <div style={styles.subjectsContainer}>
                {teacher.subjects.map((subject) => (
                    <SubjectCard key={subject.id} subject={subject} teacherId={teacher.id} />
                ))}
            </div>
        </div>
    );
};

const styles = {
    page: {
        color: '#FFA500', // Maintain the theme
        backgroundColor: '#333',
        padding: '20px',
        minHeight: '100vh',
    },
    subjectsContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        // Add more styling as needed
    },
};

export default TeacherPage;