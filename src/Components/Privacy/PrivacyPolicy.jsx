import React from "react";
import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
  return (
    <div className="privacy-container">
      <div className="privacy-header">
        <div className="privacy-logo">
          {/* Placeholder for logo, you can replace this with actual image */}
          <img
            src="/src/assets/logo4.png"
            alt="CosmicX Logo"
          />
        </div>
        <h1 className="privacy-title">
          <span>CosmicX</span> Privacy Policy
        </h1>
      </div>
      <div className="privacy-content">
        <div className="privacy-section">
          <h2 className="privacy-heading">Welcome to CosmicX!</h2>
          <p className="privacy-paragraph">
            As you embark on this thrilling journey through the cosmos, we want
            to ensure that your personal data is handled with the utmost care
            and respect. This privacy policy outlines how we collect, use, and
            protect your information as you explore new galaxies with us.
          </p>
        </div>

        <div className="privacy-section">
          <h2 className="privacy-heading">Your Data, Your Control</h2>
          <p className="privacy-paragraph">
            At CosmicX, your privacy is paramount. We collect data only to
            enhance your experience and help us create a smoother, more
            personalized voyage. From stardust preferences to journey analytics,
            rest assured that your data stays under your control.
          </p>
        </div>

        <div className="privacy-section">
          <h2 className="privacy-heading">Why We Collect Data</h2>
          <p className="privacy-paragraph">
            We gather data to fuel your cosmic adventure—whether it’s
            customizing your experience, improving our platform, or ensuring
            that your time in the digital universe is seamless and enjoyable.
            Your preferences help us make every mission better than the last.
          </p>
        </div>

        <div className="privacy-section">
          <h2 className="privacy-heading">How We Protect Your Data</h2>
          <p className="privacy-paragraph">
            We take your privacy seriously. Our intergalactic security protocols
            ensure that your data is shielded with state-of-the-art encryption
            and protection. So, while you're exploring the universe, you can
            feel confident that your data is safe with us.
          </p>
        </div>

        <div className="privacy-footer">
          <p>© {new Date().getFullYear()} CosmicX - All Rights Reserved</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
