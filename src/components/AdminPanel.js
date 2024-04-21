import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminPanel = () => {
    const { user } = useAuth();
    const [teachers, setTeachers] = useState([]);
    const [role, setRole] = useState('teacher');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [subjects, setSubjects] = useState([{ name: '', classYear: '' }]);

    useEffect(() => {
        const loadedTeachers = JSON.parse(localStorage.getItem('teachers')) || [];
        setTeachers(loadedTeachers);
    }, []);

    const showToast = (message, type = "info") => {
        toast(message, { type: type });
    };

    const handleSubmit = () => {
        if (!username || !password || !name || password !== confirmPassword) {
            showToast("Please fill all fields and make sure passwords match.", "error");
            return;
        }
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
        showToast(`${role.charAt(0).toUpperCase() + role.slice(1)} added successfully!`, "success");
        clearForm();
    };

    const handleDelete = (teacherId) => {
        const updatedTeachers = teachers.filter(teacher => teacher.id !== teacherId);
        localStorage.setItem('teachers', JSON.stringify(updatedTeachers));
        setTeachers(updatedTeachers);
        showToast('Teacher deleted successfully', "warning");
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
            showToast('Please complete the subject details before adding another.', "error");
            return;
        }
        setSubjects([...subjects, { name: '', classYear: '' }]);
    };

    const clearForm = () => {
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        setName('');
        setSubjects([{ name: '', classYear: '' }]);
    };

    const clearLocalStorage = () => {
        localStorage.clear();
        setTeachers([]);
        showToast('Local storage cleared!', "info");
    };

    if (!user || user.role !== 'admin') {
        return <div style={styles.page}><h2>Access Denied</h2></div>;
    }

    return (
        <div style={styles.page}>
            <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            <h1 style={styles.title}>Admin Panel</h1>
            <button onClick={clearLocalStorage} style={styles.buttonStyle}>Clear Local Storage</button>
        
            <select value={role} onChange={e => setRole(e.target.value)} style={styles.selectStyle}>
                <option value="teacher">Teacher</option>
                <option value="admin">Admin</option>
            </select>
            {/* Form for creating a new teacher/admin */}
            <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} style={styles.inputStyle} />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} style={styles.inputStyle} />
            <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} style={styles.inputStyle} />
            <input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} style={styles.inputStyle} />
            {role === 'teacher' && subjects.map((subject, index) => (
                <div key={index}>
                    <input type="text" placeholder="Subject Name" value={subject.name} onChange={e => handleSubjectChange(index, 'name', e.target.value)} style={styles.inputStyle} />
                    <select value={subject.classYear} onChange={e => handleSubjectChange(index, 'classYear', e.target.value)} style={styles.selectStyle}>
                        <option value="">Select a Class</option>
                        <option value="1st">1st Class</option>
                        <option value="2nd">2nd Class</option>
                        <option value="3rd">3rd Class</option>
                        <option value="4th">4th Class</option>
                        <option value="5th">5th Class</option>
                        <option value="5th">6th Class</option>
                        <option value=""></option>
                        <option value="">Select a Year</option>
                        <option value="1st">1st Year</option>
                        <option value="2nd">2nd Year</option>
                        <option value="3rd">3rd Year</option>
                        <option value="4th">4th Year</option>
                        <option value="5th">5th Year</option>
                        <option value="5th">6th Year</option>
                    </select>
                </div>
            ))}
            <button onClick={addSubject} style={styles.buttonStyle}>Add Another Subject</button>
            <button onClick={handleSubmit} style={styles.buttonStyle}>Create {role.charAt(0).toUpperCase() + role.slice(1)}</button>
            <h1 style={styles.title}>Teachers and Admins Registered</h1>
            {teachers.map(teacher => (
                <div key={teacher.id} style={styles.teacher}>
                    <p>{teacher.name}</p>
                    <p>Subjects: {teacher.subjects.map(subject => `${subject.name} `)}</p>
                    <button onClick={() => handleDelete(teacher.id)} style={styles.buttonStyle}>Delete</button>
                </div>
            ))}
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
        borderRadius: '15px',
        padding: '10px',
        backgroundColor: '#222',
        borderColor: '#FFA500',
        color: '#FFA500',
        display: 'flex',
        justifyContent: 'space-between',
        width: '50%',
        boxSizing: 'border-box',
        marginBottom: '20px',
    },
    inputStyle: {
        margin: '5px 0',
        padding: '8px 12px',

        width: '150px',
        borderRadius: '4px',
        backgroundColor: '#222',
        borderColor: '#FFA500',
        color: '#FFA500',
        outline: 'none',
    },
    selectStyle: {
        margin: '10px 0',
        padding: '8px 12px',
        width: '180px',
        borderRadius: '4px',
        backgroundColor: '#222',
        borderColor: '#FFA500',
        color: '#FFA500',
        outline: 'none',
    },
    buttonStyle: {
        padding: '10px',
        margin: '10px 0',
        backgroundColor: '#FFA500',
        color: '#333',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 'bold',
        width: '180px',
    },
    title: {
        marginBottom: '20px',
        color: '#FFA500',
    },
};

export default AdminPanel;
