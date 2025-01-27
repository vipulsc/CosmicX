import React, { useState, useEffect } from "react";
import "./SpaceVote.css";

const ideasData = [
  {
    id: 1,
    title: "Colonizing Mars",
    description:
      "Establishing a permanent human settlement on Mars, focusing on creating sustainable living conditions, agriculture, and energy systems. This would ensure humanity's survival in case of Earth-bound catastrophes.",
    sender: "Alice",
    photo: "alice.jpg",
    likes: 320,
  },
  {
    id: 2,
    title: "Space Elevator",
    description:
      "Constructing a space elevator to revolutionize space travel by providing a cost-effective and efficient way to transport goods and humans into orbit, reducing reliance on traditional rockets.",
    sender: "Bob",
    photo: "bob.jpg",
    likes: 280,
  },
  {
    id: 3,
    title: "Exploring Europa",
    description:
      "Sending probes to explore Europa, one of Jupiter's moons, to investigate its subsurface ocean and potential for extraterrestrial life beneath its icy crust.",
    sender: "Charlie",
    photo: "charlie.jpg",
    likes: 250,
  },
  {
    id: 4,
    title: "Interstellar Travel",
    description:
      "Developing advanced propulsion systems like warp drives or solar sails to enable interstellar travel and explore distant star systems for new planets and resources.",
    sender: "Diana",
    photo: "diana.jpg",
    likes: 200,
  },
  {
    id: 5,
    title: "Asteroid Mining",
    description:
      "Mining asteroids for valuable resources like rare metals and water to support space missions and reduce Earth's dependency on terrestrial mining.",
    sender: "Eve",
    photo: "eve.jpg",
    likes: 180,
  },
];

const SpaceVote = () => {
  const [ideas, setIdeas] = useState(ideasData);
  const [voted, setVoted] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState(null);

  useEffect(() => {
    setIdeas((prevIdeas) => [...prevIdeas].sort((a, b) => b.likes - a.likes));
  }, []);

  const handleVote = (id) => {
    if (voted) return;
    setIdeas((prevIdeas) =>
      prevIdeas.map((idea) =>
        idea.id === id ? { ...idea, likes: idea.likes + 1 } : idea
      )
    );
    setVoted(true);
  };

  const handleClick = (idea) => {
    setSelectedIdea(idea);
  };

  return (
    <div className="sol-page-container">
      <div className="sol-container">
        <div className="sol-header">
          <h2>🌌 Share and Explore Space Ideas! 🚀</h2>
        </div>

        {/* Top Idea */}
        <div className="sol-ideas-list">
          <div
            className="sol-idea-card sol-top-card"
            onClick={() => handleClick(ideas[0])}
          >
            <div className="sol-crown">👑</div>
            <h3 className="sol-idea-title">{ideas[0].title}</h3>
            {selectedIdea?.id === ideas[0].id && (
              <p className="sol-description">{ideas[0].description}</p>
            )}
            <p className="sol-sender">Submitted by: {ideas[0].sender}</p>
            <p className="sol-likes">Likes: {ideas[0].likes}</p>
            <button
              className={`sol-vote-button ${voted ? "sol-voted" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                handleVote(ideas[0].id);
              }}
              disabled={voted}
            >
              {voted ? "Thanks for Voting!" : "Vote"}
            </button>
          </div>
        </div>

        {/* Remaining Ideas */}
        <div className="sol-ideas-grid">
          {ideas.slice(1).map((idea) => (
            <div
              key={idea.id}
              className="sol-idea-card"
              onClick={() => handleClick(idea)}
            >
              <h3 className="sol-idea-title">{idea.title}</h3>
              {selectedIdea?.id === idea.id && (
                <p className="sol-description">{idea.description}</p>
              )}
              <p className="sol-sender">Submitted by: {idea.sender}</p>
              <p className="sol-likes">Likes: {idea.likes}</p>
              <button
                className={`sol-vote-button ${voted ? "sol-voted" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleVote(idea.id);
                }}
                disabled={voted}
              >
                {voted ? "Thanks for Voting!" : "Vote"}
              </button>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedIdea && (
          <div className="sol-modal">
            <div className="sol-modal-content">
              <span className="sol-close" onClick={() => setSelectedIdea(null)}>
                &times;
              </span>
              <h3>{selectedIdea.title}</h3>
              <img
                src={selectedIdea.photo}
                alt={selectedIdea.sender}
                className="sol-sender-photo"
              />
              <p>{selectedIdea.description}</p>
              <p>
                <strong>Submitted by:</strong> {selectedIdea.sender}
              </p>
              <p>
                <strong>Likes:</strong> {selectedIdea.likes}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpaceVote;
