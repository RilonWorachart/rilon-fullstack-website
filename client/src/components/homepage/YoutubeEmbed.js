import React from 'react';

function YouTubeEmbed() {
  return (
    <div className="flex justify-center item-center py-4">
      <iframe 
        src="https://www.youtube.com/embed/FmiUK2iUI5I" 
        title="YouTube video player" 
        frameborder="0" 
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen
        className="w-[650px] h-[360px]"
      ></iframe>
    </div>
  );
}

export default YouTubeEmbed;
