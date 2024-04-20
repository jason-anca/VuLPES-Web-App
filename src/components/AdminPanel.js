import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const AdminPanel = () => {
    const { user } = useAuth();
    const [teachers, setTeachers] = useState([]);
    const [role, setRole] = useState('teacher');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [subjects, setSubjects] = useState([{ name: '', classYear: '' }]);

    useEffect(() => {
        const loadedTeachers = JSON.parse(localStorage.getItem('teachers')) || [];
        setTeachers(loadedTeachers);
    }, []);

    const handleSubmit = () => {
        const newUser = {
            id: Date.now().toString(),
            username,
            password,
            name,
            role,
            subjects
        };
        const updatedTeachers = [...teachers, newUser];
        localStorage.setItem('teachers', JSON.stringify(updatedTeachers));
        setTeachers(updatedTeachers);
        alert(`${role.charAt(0).toUpperCase() + role.slice(1)} added successfully!`);
        clearForm();
    };

    const handleDelete = (teacherId) => {
        const updatedTeachers = teachers.filter(teacher => teacher.id !== teacherId);
        localStorage.setItem('teachers', JSON.stringify(updatedTeachers));
        setTeachers(updatedTeachers);
        alert('Teacher deleted successfully');
    };

    const handleSubjectChange = (index, field, value) => {
        const updatedSubjects = subjects.map((subject, i) => {
            if (i === index) {
                return { ...subject, [field]: value };
            }
            return subject;
        });
        setSubjects(updatedSubjects);
    };

    const addSubject = () => {
        if (!subjects[subjects.length - 1].name || !subjects[subjects.length - 1].classYear) {
            alert('Please complete the subject details before adding another.');
            return;
        }
        setSubjects([...subjects, { name: '', classYear: '' }]);
    };

    const clearForm = () => {
        setUsername('');
        setPassword('');
        setName('');
        setSubjects([{ name: '', classYear: '' }]);
    };

    const clearLocalStorage = () => {
        localStorage.clear();
        setTeachers([]);
        alert('Local storage cleared!');
    };

    if (!user || user.role !== 'admin') {
        return <div style={styles.page}><h2>Access Denied</h2></div>;
    }

    return (
        <div style={styles.page}>
            <h1 style={styles.title}>Admin Panel</h1>
            <button onClick={clearLocalStorage} style={styles.buttonStyle}>Clear Local Storage</button>
            {teachers.map(teacher => (
                <div key={teacher.id} style={styles.teacher}>
                    <p>{teacher.name} - {teacher.subjects.map(subject => `${subject.name} `)}</p>
                    <button onClick={() => handleDelete(teacher.id)} style={styles.buttonStyle}>Delete</button>
                </div>
            ))}
            <select value={role} onChange={e => setRole(e.target.value)} style={styles.selectStyle}>
                <option value="teacher">Teacher</option>
                <option value="admin">Admin</option>
            </select>
            {/* Form for creating a new teacher/admin */}
            <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} style={styles.inputStyle} />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} style={styles.inputStyle} />
            <input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} style={styles.inputStyle} />
            {role === 'teacher' && subjects.map((subject, index) => (
                <div key={index}>
                    <input type="text" placeholder="Subject Name" value={subject.name} onChange={e => handleSubjectChange(index, 'name', e.target.value)} style={styles.inputStyle} />
                    <input type="text" placeholder="Class Year" value={subject.classYear} onChange={e => handleSubjectChange(index, 'classYear', e.target.value)} style={styles.inputStyle} />
                </div>
            ))}
            <button onClick={addSubject} style={styles.buttonStyle}>Add Another Subject</button>
            <button onClick={handleSubmit} style={styles.buttonStyle}>Create {role.charAt(0).toUpperCase() + role.slice(1)}</button>
        </div>
    );
};

const styles = {
    page: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        minHeight: '100vh',
        color: '#FFA500',
        backgroundColor: '#333',
    },
    teacher: {
        margin: '10px',
        padding: '10px',
        backgroundColor: '#222',
        borderColor: '#FFA500',
        color: '#FFA500',
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        boxSizing: 'border-box',
    },
    inputStyle: {
        margin: '5px 0',
        padding: '8px 12px',
        marginRight: '10px',
        width: '300px',
        borderRadius: '4px',
        backgroundColor: '#222',
        borderColor: '#FFA500',
        color: '#FFA500',
        outline: 'none',
    },
    selectStyle: {
        margin: '10px 0',
        padding: '8px 12px',
        width: '310px',
        borderRadius: '4px',
        backgroundColor: '#222',
        borderColor: '#FFA500',
        color: '#FFA500',
        outline: 'none',
    },
    buttonStyle: {
        padding: '10px 20px',
        margin: '10px 0',
        backgroundColor: '#FFA500',
        color: '#333',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 'bold',
    },
    title: {
        marginBottom: '20px',
        color: '#FFA500',
    },
};

export default AdminPanel;
