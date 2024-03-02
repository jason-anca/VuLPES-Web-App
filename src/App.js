// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import Header from './components/PageHeader';

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <Router>
      <div className="App">
        <Header authenticated={authenticated} setAuthenticated={setAuthenticated} /> {/* Pass setAuthenticated as a prop */}
        <Routes>
          <Route path="/" element={authenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login setAuthenticated={setAuthenticated} />} />
          <Route
            path="/dashboard"
            element={authenticated ? <Dashboard authenticated={authenticated} setAuthenticated={setAuthenticated} /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
