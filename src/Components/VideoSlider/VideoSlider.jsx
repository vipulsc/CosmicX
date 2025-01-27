import React, { useState, useEffect } from "react";
import "./VideoSlider.css";

const VideoSlider = ({ speed = 10000 }) => {
  const videos = [
    { src: "/videos/video1.mp4", link: "https://example.com/video1" },
    { src: "/videos/video2.mp4", link: "https://example.com/video2" },
    { src: "/videos/video3.mp4", link: "https://example.com/video3" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length); // Loops back to 0 after last video
    }, speed);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [videos.length, speed]);

  // const setViewportHeight = () => {
  //   const vh = window.innerHeight * 0.01;
  //   document.documentElement.style.setProperty("--vh", `${vh}px`);
  // };

  // // Set the initial value
  // setViewportHeight();

  // // Update the value on resize
  // window.addEventListener("resize", setViewportHeight);

  return (
    <div className="video-slider">
      {videos.map((video, index) => (
        <div
          key={index}
          className={`slider-item ${index === currentIndex ? "active" : ""}`}
        >
          <video
            src={video.src}
            className="slider-video"
            autoPlay
            muted
            loop
            playsInline
          />
          {index === currentIndex && (
            <a
              href={video.link}
              className="know-more-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              Know More
            </a>
          )}
        </div>
      ))}
    </div>
  );
};

export default VideoSlider;
