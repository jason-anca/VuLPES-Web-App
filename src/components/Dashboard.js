/** @jsxImportSource theme-ui */
import React from 'react';
import YoutubeEmbed from './embed/YoutubeEmbed.js';

function Dashboard({ authenticated, setAuthenticated }) {

  return (
      <div>
        <h2>Dashboard</h2>
        <YoutubeEmbed />
      </div>
  );
}

export default Dashboard;
