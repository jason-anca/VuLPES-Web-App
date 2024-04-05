export const embedYouTubeVideos = (content) => {
  // This regex matches both full YouTube URLs and shortened youtu.be URLs, capturing the video ID
  const youTubeUrlRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu.be\/)([a-zA-Z0-9_-]+)(?=[^\w-]|$)/g;
  
  return content.replace(youTubeUrlRegex, (match, videoId) => {
    // Directly use the captured videoId from the regex to construct the iframe embed
    return `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  });
};
