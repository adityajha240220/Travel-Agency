import { useState, useEffect } from 'react';

const videos = [
  '/videos/video1.mp4',
  '/videos/video2.mp4',
  '/videos/video3.mp4',
];

export default function VideoCarousel() {
  const [currentVideo, setCurrentVideo] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % videos.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 z-0">
      {videos.map((video, index) => (
        <video
          key={index}
          autoPlay
          muted
          loop
          className={`w-full h-full object-cover ${index === currentVideo ? '' : 'hidden'}`}
          src={video}
        />
      ))}
    </div>
  );
}