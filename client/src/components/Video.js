import React from 'react';

const Video = ({ videoUrl, width, height }) => {
  const videoId = videoUrl?.split('v=')[1]?.split('&')[0];
  return (
    <iframe
      title='YouTube video player'
      width={width}
      height={height}
      src={`https://www.youtube.com/embed/${videoId}`}
      frameBorder='0'
      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
      allowFullScreen
    />
  );
};

export default Video;
