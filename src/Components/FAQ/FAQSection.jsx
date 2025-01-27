import React, { useState } from "react";
import "./FAQSection.css";

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What is the CosmicX mission?",
      answer:
        "To inspire cosmic explorers and provide tools to navigate the universe. Think of us as your cosmic co-pilot!",
    },
    {
      question: "What happens when you enter a black hole?",
      answer:
        "You’d experience spaghettification! Yes, you'd stretch like spaghetti while exploring the unknown.",
    },
    {
      question: "Can CosmicX help me find alien life?",
      answer:
        "While we can't guarantee aliens, our tools can help you explore exoplanets and track mysterious signals!",
    },
    {
      question: "Why do astronauts wear diapers?",
      answer:
        "Because space waits for no one. When nature calls, astronauts rely on Maximum Absorbency Garments!",
    },
    {
      question: "Do aliens use Wi-Fi?",
      answer:
        "Probably not! They're more likely to use quantum entanglement for instant communication across galaxies.",
    },
    {
      question: "What’s the tastiest space snack?",
      answer:
        "Freeze-dried ice cream! It's the closest you'll get to dessert while orbiting Earth.",
    },
  ];

  return (
    <div className="cosmic-faq-wrapper">
      <div className="cosmic-faq">
        <div className="faq-header">
          <h2>🚀 CosmicX Astronaut FAQ 🚀</h2>
          <p>Your guide to the stars, galaxies, and beyond!</p>
        </div>
        <div className="faq-container">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`faq-item ${activeIndex === index ? "active" : ""}`}
              onClick={() => toggleFAQ(index)}
            >
              <div className="faq-question">
                <span className="faq-icon">🪐</span>
                {faq.question}
              </div>
              <div className="faq-answer">{faq.answer}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="rocket"></div>
    </div>
  );
};

export default FAQSection;
