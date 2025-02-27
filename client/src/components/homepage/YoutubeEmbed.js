import { useState, useEffect } from 'react';
import axios from 'axios'

function YouTubeEmbed() {
  const [videoUrl, setVideoUrl] = useState("https://www.youtube.com/embed/FmiUK2iUI5I");

  const fetchVideoUrl = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/api/getvideo`);
      const result = response.data;
      setVideoUrl(result.data[0].youtube_url);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchVideoUrl();
  }, []);


  return (
    <div className="flex justify-center item-center py-4">
      <iframe
        src={videoUrl}
        title="YouTube video player"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="h-[250px] sm:h-[325px] md:h-[395px] w-[700px] border-none"
        referrerpolicy="strict-origin-when-cross-origin"
      ></iframe>
    </div>
  );
}

export default YouTubeEmbed;
