import React, { useState, useEffect } from 'react';

function getYoutubeIdFromLink(link) {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/;
    const match = link.match(regex);
    return match ? match[1] : null;
}

function YoutubeEmbed() {
    const [youtubeLink, setYoutubeLink] = useState('');
    const [embedUrl, setEmbedUrl] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const lastLink = localStorage.getItem('lastYoutubeLink');
        if (lastLink) {
            setYoutubeLink(lastLink);
            const videoId = getYoutubeIdFromLink(lastLink);
            videoId && setEmbedUrl(`https://www.youtube.com/embed/${videoId}`);
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const youtubeId = getYoutubeIdFromLink(youtubeLink);
        if (youtubeId) {
            setEmbedUrl(`https://www.youtube.com/embed/${youtubeId}`);
            localStorage.setItem('lastYoutubeLink', youtubeLink);
            setErrorMessage('');
        } else {
            setErrorMessage('Please enter a valid YouTube link.');
        }
    };

    return (
        <div>
            <h3>Add YouTube Link</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="youtubeInput">YouTube Link:</label>
                <input
                    id="youtubeInput"
                    type="text"
                    placeholder="Enter YouTube Link"
                    value={youtubeLink}
                    onChange={(e) => setYoutubeLink(e.target.value)}
                />
                <button type="submit">Embed</button>
            </form>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {embedUrl && (
                <div>
                    <h3>Embedded Video</h3>
                    <iframe
                        title="Embedded Video"
                        width="560"
                        height="315"
                        src={embedUrl}
                        style={{ border: '0' }}  // Using style for border as frameborder is obsolete
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            )}
        </div>
    );
}

export default YoutubeEmbed;
