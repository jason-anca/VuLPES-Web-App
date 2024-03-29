import React, { useState, useEffect } from 'react';

function YoutubeEmbed() {
  const [youtubeLink, setYoutubeLink] = useState('');
  const [embedUrl, setEmbedUrl] = useState('');

  useEffect(() => {
    // Retrieve last submitted link from local storage when component mounts
    const lastLink = localStorage.getItem('lastYoutubeLink');
    if (lastLink) {
      setYoutubeLink(lastLink);
      setEmbedUrl(`https://www.youtube.com/embed/${getYoutubeIdFromLink(lastLink)}`);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate YouTube link
    const youtubeId = getYoutubeIdFromLink(youtubeLink);
    if (youtubeId) {
      const embedUrl = `https://www.youtube.com/embed/${youtubeId}`;
      setEmbedUrl(embedUrl);
      localStorage.setItem('lastYoutubeLink', youtubeLink); // Save link to local storage
    } else {
      // Handle invalid YouTube link
      alert('Invalid YouTube link');
    }
  };

  const getYoutubeIdFromLink = (link) => {
    // Extract YouTube video ID from link
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = link.match(regex);
    return match ? match[1] : null;
  };

  return (
    <div>
      <h3>Add YouTube Link</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter YouTube Link"
          value={youtubeLink}
          onChange={(e) => setYoutubeLink(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {embedUrl && (
        <div>
          <h3>Embedded Video</h3>
          <iframe
            title="Embedded Video"
            width="560"
            height="315"
            src={embedUrl}
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      )}
    </div>
  );
}

export default YoutubeEmbed;
