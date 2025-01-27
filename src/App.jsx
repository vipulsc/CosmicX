// Importing React and necessary hooks
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importing components
import Navbar from "./Components/Navbar/Navbar";
import VideoSlider from "./Components/VideoSlider/VideoSlider";
import VideoInfo from "./Components/VideoInfo/VideoInfo";
import GoToTop from "./Components/GoToTop/GoToTop";
import Planet from "./Components/Planet/Planet";
import Footer from "./Components/Footer/Footer";
import PrivacyPolicy from "./Components/Privacy/PrivacyPolicy";
import ResetToTop from "./Components/ResetToTop";
import FAQSection from "./Components/FAQ/FAQSection";
import StellarGateway from "./NebulaPortal/StellarGateway";
import SpaceVote from "./SolVote/SpaceVote";
import NebulaNotes from "./NebulaNotes/NebulaNotes";

// Importing individual planet components
import Sun from "./Planets/Sun/Sun";
import Mercury from "./Planets/Mercury/Mercury";
import Venus from "./Planets/Venus/Venus";
import Earth from "./Planets/Earth/Earth";
import Mars from "./Planets/Mars/Mars";
import Jupiter from "./Planets/Jupiter/Jupiter";
import Saturn from "./Planets/Saturn/Saturn";
import Uranus from "./Planets/Uranus/Uranus";
import Neptune from "./Planets/Neptune/Neptune";
import Moon from "./Planets/Moon/Moon";

// Importing CSS
import "./App.css";

// Importing axios for API requests
import axios from "axios";
import AboutUs from "./Components/AboutUs/CodeCrew";
import FeatureSummary from "./Components/Features/FeatureSummary";
import News from "./Components/News/News";

const App = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Scroll to the top function
  const scrollToTop = () => {
    const topElement = document.getElementById("top");
    if (topElement) {
      topElement.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Visibility toggle for the "Go To Top" button
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility); // Add scroll listener
    return () => window.removeEventListener("scroll", toggleVisibility); // Cleanup listener on component unmount
  }, []);

  // Example: Axios call with CORS handling
  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        const response = await axios.get("/api/planets"); // Proxy setup in development
        console.log("Fetched planets data: ", response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchPlanets();
  }, []);

  return (
    <Router>
      <ResetToTop /> {/* Automatically scrolls to top on route change */}
      <div id="top">
        <Navbar />
        <Routes>
          {/* Main Page */}
          <Route
            path="/"
            element={
              <>
                <StellarGateway />
                <VideoSlider />
                <VideoInfo />
                <div id="events">
                  <div className="planete">
                    <Planet />
                  </div>
                </div>
              </>
            }
          />

          {/* Privacy Policy */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />

          {/* FAQ Section */}
          <Route path="/faq" element={<FAQSection />} />

          {/* Individual Planet Routes */}
          <Route path="/Mercury" element={<Mercury />} />
          <Route path="/Venus" element={<Venus />} />
          <Route path="/Earth" element={<Earth />} />
          <Route path="/Mars" element={<Mars />} />
          <Route path="/Jupiter" element={<Jupiter />} />
          <Route path="/Saturn" element={<Saturn />} />
          <Route path="/Uranus" element={<Uranus />} />
          <Route path="/Neptune" element={<Neptune />} />
          <Route path="/Sun" element={<Sun />} />
          <Route path="/Moon" element={<Moon />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/feature" element={<FeatureSummary />} />

          <Route path="/report" element={<News />} />
          <Route path="/NebulaNotes" element={<NebulaNotes />} />
        </Routes>
        <GoToTop scrollToTop={scrollToTop} isVisible={isVisible} />
      </div>
      <Footer />
    </Router>
  );
};

export default App;
