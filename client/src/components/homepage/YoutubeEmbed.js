import React from 'react';

function YouTubeEmbed() {
  return (
    <div className="flex justify-center item-center py-4 4xl:px-[20%]">
      <iframe 
        src="https://www.youtube.com/embed/FmiUK2iUI5I" 
        title="YouTube video player" 
        frameborder="0" 
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen
        className="w-[100%] h-[300px] lg:h-[500px]"
      ></iframe>
    </div>
  );
}

export default YouTubeEmbed;
