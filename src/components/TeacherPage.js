import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import SubjectCard from './subjectCard/SubjectCard';

const teachers = [
    {
        id: '1',
        name: 'John Doe',
        subjects: [
            { id: 'maths', name: 'Mathematics', uniqueId: '1_maths_1st', class: '1st' },
            { id: 'science', name: 'Science', uniqueId: '1_science_1st', class: '1st' },
            { id: 'geography', name: 'Geography', uniqueId: '1_geography_1st', class: '1st' },
            { id: 'science', name: 'Science', uniqueId: '1_science_2nc', class: '2nd' },
            { id: 'geography', name: 'Geography', uniqueId: '1_geography_2nd', class: '2nd' },
        ],
    },
    {
        id: '2',
        name: 'Jane Smith',
        subjects: [
            { id: 'maths', name: 'Mathematics', uniqueId: '2_maths_1st', class: '1st' },
            { id: 'history', name: 'History', uniqueId: '2_history_1st', class: '1st' },
            { id: 'art', name: 'Art', uniqueId: '2_art_2nd', class: '2nd' },
        ],
    },
];

const TeacherPage = () => {
    const { id } = useParams();
    const teacher = teachers.find((teacher) => teacher.id === id);
    const [selectedClass, setSelectedClass] = useState('');

    const classes = [...new Set(teacher?.subjects.map(subject => subject.class))];

    const handleClassChange = (event) => {
        setSelectedClass(event.target.value);
    };


    if (!teacher) {
        return <div style={styles.page}>Teacher not found</div>;
    }

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
                    .filter(subject => subject.class === selectedClass)
                    .map((subject) => (
                        <SubjectCard key={subject.uniqueId} subject={subject} teacherId={teacher.id} />
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