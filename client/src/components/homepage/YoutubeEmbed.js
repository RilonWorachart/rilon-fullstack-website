import React from 'react';

function YouTubeEmbed() {
  return (
    <div className="flex justify-center item-center py-4">
      <iframe 
        src="https://www.youtube.com/embed/FmiUK2iUI5I" 
        title="YouTube video player"
        frameBorder="0" 
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
        allowFullScreen
        className="h-[250px] sm:h-[325px] md:h-[395px] w-[700px]"
      ></iframe>
    </div>
  );
}

export default YouTubeEmbed;
