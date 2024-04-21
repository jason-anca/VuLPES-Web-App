import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import TeacherPage from './components/TeacherPage';
import PageHeader from './components/header/PageHeader';
import Footer from './components/footer/PageFooter';
import SubjectPage from './components/SubjectPage';
import SignUp from './components/SignUpPage';
import AdminPanel from './components/AdminPanel';
import { AuthProvider } from './contexts/AuthContext';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';

Amplify.configure(awsExports);

function App() {
  useEffect(() => {
    // Initialize default users if not already present
    const initializeUsers = () => {
      const defaultUsers = [
        { username: 'admin', password: 'admin', role: 'admin' },
        { username: 'teacher', password: 'teacher', role: 'teacher' }
      ];
      if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify(defaultUsers));
      }
    };

    initializeUsers();
  }, []);

  return (
    <Router>
      <AuthProvider>
        <PageHeader />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/subject/:subjectId" element={<SubjectPage />} />
          <Route path="/teacher/:teacherId" element={<TeacherPage />} />
          <Route path="/teacher/:teacherId/subject/:subjectUniqueId" element={<SubjectPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </Router>
  );
}

export default App;