import React from 'react';
import YoutubeEmbed from './components/YoutubeEmbed.js';

function Dashboard({ authenticated, setAuthenticated}) {
  return (
    <div>
      <h2>Dashboard</h2>
      <YoutubeEmbed />
    </div>
  );
}

export default Dashboard;
