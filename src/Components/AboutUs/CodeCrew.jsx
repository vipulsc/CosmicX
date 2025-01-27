import React from "react";
import "./CodeCrew.css";

import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaYoutube,
  FaGithub,
} from "react-icons/fa";

const CodeCrew = () => {
  const developers = [
    {
      name: "Vipul Singh",
      image: "IMG_9536.jpeg",
      description:
        "Lead Frontend Engineer | Chief Architect of Digital Experiences",
      isLead: true,
      github: "https://github.com/Vipul04s",
      linkedin: "https://linkedin.com/in/vipulsingh14",
    },
    {
      name: "Shaurya Sharma",
      image: "image123.png",
      description: "Backend Infrastructure Specialist",
      isLead: false,
      github: "https://github.com/shaurya-afk",
      linkedin: "https://linkedin.com/in/shaurya-afk",
    },
  ];

  return (
    <div className="code-crew-container">
      <div className="crew-content">
        <header className="crew-header">
          <h1>The Code Crew</h1>
          <p>Innovative Digital Engineering</p>
        </header>

        <div className="developers-grid">
          {developers.map((dev, index) => (
            <div key={index} className="developer-card">
              <div className="developer-image-container">
                <img
                  src={dev.image}
                  alt={dev.name}
                  className="developer-image"
                />
              </div>
              <div className="developer-details">
                <h3>{dev.name}</h3>
                <p className="developer-description">{dev.description}</p>

                <div className="developer-links">
                  <a
                    href={dev.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="socialIcons">
                      <FaGithub />
                    </div>
                    GitHub
                  </a>
                  <a
                    href={dev.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="socialIcons">
                      <FaLinkedin />
                    </div>
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="crew-contact">
        <p>
          Contact us:{" "}
          <a href="mailto:xcosmic51@gmail.com" className="contact-email">
            xcosmic51@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default CodeCrew;
