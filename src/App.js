// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import TeacherPage from './components/TeacherPage'
import PageHeader from './components/header/PageHeader';
import Footer from './components/footer/PageFooter'
import SubjectPage from './components/SubjectPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <PageHeader /> {/* This ensures the Header is always visible */}
      <Routes>
        <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/teacher/:id" element={<TeacherPage />} />
        <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/subject/:subjectId" element={<SubjectPage />} />
        <Route path="/teacher/:teacherId/subject/:subjectUniqueId" element={<SubjectPage />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;