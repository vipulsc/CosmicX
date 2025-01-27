// import React, { useState } from "react";
// import { Link } from "react-router-dom"; // Use Link from react-router-dom
// import {
//   FaFacebook,
//   FaTwitter,
//   FaLinkedin,
//   FaInstagram,
//   FaYoutube,
// } from "react-icons/fa";
// import { BiMailSend } from "react-icons/bi";
// import "./Footer.css";

// const Footer = () => {
//   const [email, setEmail] = useState("");
//   const [feedback, setFeedback] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });
//   const [showFeedbackForm, setShowFeedbackForm] = useState(false);
//   const [showStayUpdatedForm, setShowStayUpdatedForm] = useState(false);

//   // Handle feedback form changes
//   const handleFeedbackChange = (e) => {
//     setFeedback({
//       ...feedback,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // Handle feedback form submission
//   const handleFeedbackSubmit = (e) => {
//     e.preventDefault();
//     if (feedback.name && feedback.email && feedback.message) {
//       alert("Thank you for your feedback!");
//       setFeedback({
//         name: "",
//         email: "",
//         message: "",
//       });
//     } else {
//       alert("Please fill in all fields.");
//     }
//   };

//   // Handle email subscription
//   const handleSubscribe = (e) => {
//     e.preventDefault();
//     if (email) {
//       alert(`Subscribed successfully with ${email}!`);
//       setEmail("");
//     } else {
//       alert("Please enter a valid email.");
//     }
//   };

//   return (
//     <footer className="footer">
//       {/* Wave Effect */}
//       <div className="waveEffect"></div>

//       {/* Social Media Icons */}
//       <div className="socialIcons">
//         <a
//           href="https://facebook.com"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <FaFacebook />
//         </a>
//         <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
//           <FaTwitter />
//         </a>
//         <a
//           href="https://linkedin.com"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <FaLinkedin />
//         </a>
//         <a
//           href="https://instagram.com"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <FaInstagram />
//         </a>
//         <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
//           <FaYoutube />
//         </a>
//       </div>

//       {/* Links Section */}
//       <div className="links">
//         <a href="#about">About Us</a>
//         <a href="#services">Services</a>
//         <a href="#features">Features</a>
//         <a href="#testimonials">Testimonials</a>
//         <a href="#contact">Contact</a>
//         <Link to="/faq" className="clickable">
//           FAQ
//         </Link>
//         <Link to="/sun" className="clickable">
//           SUN
//         </Link>
//         <Link to="/privacy-policy" className="clickable">
//           Privacy Policy
//         </Link>
//       </div>

//       {/* Feedback Section */}
//       <div className="formToggleSection">
//         <button
//           className="formToggleButton"
//           onClick={() => setShowFeedbackForm(!showFeedbackForm)}
//         >
//           {showFeedbackForm ? "Close Feedback" : "Give Feedback"}
//         </button>
//         {showFeedbackForm && (
//           <div className="feedback">
//             <h3>Feedback</h3>
//             <form onSubmit={handleFeedbackSubmit}>
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Your Name"
//                 value={feedback.name}
//                 onChange={handleFeedbackChange}
//                 required
//               />
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Your Email"
//                 value={feedback.email}
//                 onChange={handleFeedbackChange}
//                 required
//               />
//               <textarea
//                 name="message"
//                 placeholder="Your Feedback"
//                 rows="4"
//                 value={feedback.message}
//                 onChange={handleFeedbackChange}
//                 required
//               ></textarea>
//               <button type="submit">Submit</button>
//             </form>
//           </div>
//         )}
//       </div>

//       {/* Stay Updated Section */}
//       <div className="formToggleSection">
//         <button
//           className="formToggleButton"
//           onClick={() => setShowStayUpdatedForm(!showStayUpdatedForm)}
//         >
//           {showStayUpdatedForm ? "Close Stay Updated" : "Stay Updated"}
//         </button>
//         {showStayUpdatedForm && (
//           <div className="stayUpdated">
//             <h3>Stay Updated</h3>
//             <form onSubmit={handleSubscribe}>
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//               <button type="submit">
//                 <BiMailSend /> Subscribe
//               </button>
//             </form>
//           </div>
//         )}
//       </div>

//       {/* Copyright Section */}
//       <div className="copyright">
//         &copy; {new Date().getFullYear()} CosmicX. All rights reserved.
//       </div>
//     </footer>
//   );
// };

// export default Footer;

 
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   FaFacebook,
//   FaTwitter,
//   FaLinkedin,
//   FaInstagram,
//   FaYoutube,
// } from "react-icons/fa";
// import { BiMailSend } from "react-icons/bi";
// import "./Footer.css";

// const Footer = () => {
//   const [email, setEmail] = useState("");
//   const [feedback, setFeedback] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });
//   const [showFeedbackForm, setShowFeedbackForm] = useState(false);
//   const [showStayUpdatedForm, setShowStayUpdatedForm] = useState(false);
//   // Added for server response handling
//   const [submitStatus, setSubmitStatus] = useState("");

//   // Handle feedback form changes
//   const handleFeedbackChange = (e) => {
//     setFeedback({
//       ...feedback,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // Modified to connect with server
//   const handleFeedbackSubmit = async (e) => {
//     e.preventDefault();
//     if (feedback.name && feedback.email && feedback.message) {
//       try {
//         const response = await fetch('http://localhost:5000/submit-feedback', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(feedback),
//         });

//         const data = await response.json();

//         if (response.ok) {
//           setSubmitStatus('Thank you for your feedback!');
//           setFeedback({
//             name: "",
//             email: "",
//             message: "",
//           });
//         } else {
//           setSubmitStatus(data.error || 'Failed to submit feedback');
//         }
//       } catch (err) {
//         setSubmitStatus('Error connecting to server: '+err);
//       }
//     } else {
//       setSubmitStatus('Please fill in all fields.');
//     }
//   };

//   // Handle email subscription
//   // const handleSubscribe = (e) => {
//   //   e.preventDefault();
//   //   if (email) {
//   //     alert(`Subscribed successfully with ${email}!`);
//   //     setEmail("");
//   //   } else {
//   //     alert("Please enter a valid email.");
//   //   }
//   // };

//   const handleSubscribe = async (e) => {
//     e.preventDefault();

//     if (email) {
//       try {
//         const response = await fetch("http://localhost:5000/subscribe", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ email }),
//         });

//         const data = await response.json();
//         if (response.ok) {
//           alert(data.message || "Subscribed successfully!");
//           setEmail("");
//         } else {
//           alert(data.error || "Failed to subscribe.");
//         }
//       } catch (error) {
//         alert("Error connecting to server: " + error.message);
//       }
//     } else {
//       alert("Please enter a valid email.");
//     }
//   };

//   return (
//     <footer className="footer">
//       {/* Wave Effect */}
//       <div className="waveEffect"></div>

//       {/* Social Media Icons */}
//       <div className="socialIcons">
//         <a
//           href="https://facebook.com"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <FaFacebook />
//         </a>
//         <a
//           href="https://twitter.com"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <FaTwitter />
//         </a>
//         <a
//           href="https://linkedin.com"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <FaLinkedin />
//         </a>
//         <a
//           href="https://instagram.com"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <FaInstagram />
//         </a>
//         <a
//           href="https://youtube.com"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <FaYoutube />
//         </a>
//       </div>

//       {/* Links Section */}
//       <div className="links">
//         <a href="#about">About Us</a>
//         <a href="#services">Services</a>
//         <a href="#features">Features</a>
//         <a href="#testimonials">Testimonials</a>
//         <a href="#contact">Contact</a>
//         <Link to="/faq" className="clickable">
//           FAQ
//         </Link>
//         <Link to="/sun" className="clickable">
//           SUN
//         </Link>
//         <Link to="/privacy-policy" className="clickable">
//           Privacy Policy
//         </Link>
//       </div>

//       {/* Feedback Section */}
//       <div className="formToggleSection">
//         <button
//           className="formToggleButton"
//           onClick={() => setShowFeedbackForm(!showFeedbackForm)}
//         >
//           {showFeedbackForm ? "Close Feedback" : "Give Feedback"}
//         </button>
//         {showFeedbackForm && (
//           <div className="feedback">
//             <h3>Feedback</h3>
//             {/* Added status message display */}
//             {submitStatus && <div className="statusMessage">{submitStatus}</div>}
//             <form onSubmit={handleFeedbackSubmit}>
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Your Name"
//                 value={feedback.name}
//                 onChange={handleFeedbackChange}
//                 required
//               />
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Your Email"
//                 value={feedback.email}
//                 onChange={handleFeedbackChange}
//                 required
//               />
//               <textarea
//                 name="message"
//                 placeholder="Your Feedback"
//                 rows="4"
//                 value={feedback.message}
//                 onChange={handleFeedbackChange}
//                 required
//               ></textarea>
//               <button type="submit">Submit</button>
//             </form>
//           </div>
//         )}
//       </div>

//       {/* Stay Updated Section */}
//       <div className="formToggleSection">
//         <button
//           className="formToggleButton"
//           onClick={() => setShowStayUpdatedForm(!showStayUpdatedForm)}
//         >
//           {showStayUpdatedForm ? "Close Stay Updated" : "Stay Updated"}
//         </button>
//         {showStayUpdatedForm && (
//           <div className="stayUpdated">
//             <h3>Stay Updated</h3>
//             <form onSubmit={handleSubscribe}>
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//               <button type="submit">
//                 <BiMailSend /> Subscribe
//               </button>
//             </form>
//           </div>
//         )
//       }
//       </div>

//       {/* Copyright Section */}
//       <div className="copyright">
//         &copy; {new Date().getFullYear()} CosmicX. All rights reserved.
//       </div>
//     </footer>
//   );
// };

// export default Footer;

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   FaFacebook,
//   FaTwitter,
//   FaLinkedin,
//   FaInstagram,
//   FaYoutube,
// } from "react-icons/fa";
// import { BiMailSend } from "react-icons/bi";
// import "./Footer.css";

// const Footer = () => {
//   const [email, setEmail] = useState("");
//   const [feedback, setFeedback] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });
//   const [showFeedbackForm, setShowFeedbackForm] = useState(false);
//   const [showStayUpdatedForm, setShowStayUpdatedForm] = useState(false);
//   const [submitStatus, setSubmitStatus] = useState("");

//   // Handle feedback form changes
//   const handleFeedbackChange = (e) => {
//     setFeedback({
//       ...feedback,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // Handle feedback form submission
//   const handleFeedbackSubmit = async (e) => {
//     e.preventDefault();
//     if (feedback.name && feedback.email && feedback.message) {
//       try {
//         const response = await fetch("http://localhost:5000/submit-feedback", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(feedback),
//         });

//         const data = await response.json();
//         if (response.ok) {
//           setSubmitStatus("Thank you for your feedback!");
//           setFeedback({ name: "", email: "", message: "" });
//         } else {
//           setSubmitStatus(data.error || "Failed to submit feedback");
//         }
//       } catch (err) {
//         setSubmitStatus("Error connecting to server: " + err);
//       }
//     } else {
//       setSubmitStatus("Please fill in all fields.");
//     }
//   };

//   // Handle subscription form submission
//   const handleSubscribe = async (e) => {
//     e.preventDefault();
//     if (email) {
//       try {
//         const response = await fetch("http://localhost:5000/subscribe", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ email }),
//         });

//         const data = await response.json();
//         if (response.ok) {
//           alert(data.message || "Subscribed successfully!");
//           setEmail("");
//         } else {
//           alert(data.error || "Failed to subscribe.");
//         }
//       } catch (error) {
//         alert("Error connecting to server: " + error.message);
//       }
//     } else {
//       alert("Please enter a valid email.");
//     }
//   };

//   return (
//     <footer className="footer">
//       {/* Wave Effect */}
//       <div className="waveEffect"></div>

//       {/* Social Media Icons */}
//       <div className="socialIcons">
//         <a
//           href="https://facebook.com"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <FaFacebook />
//         </a>
//         <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
//           <FaTwitter />
//         </a>
//         <a
//           href="https://linkedin.com"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <FaLinkedin />
//         </a>
//         <a
//           href="https://instagram.com"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <FaInstagram />
//         </a>
//         <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
//           <FaYoutube />
//         </a>
//       </div>

//       {/* Links Section */}
//       <div className="links">
//         <a href="#about">About Us</a>
//         <a href="#services">Services</a>
//         <a href="#features">Features</a>
//         <a href="#testimonials">Testimonials</a>
//         <a href="#contact">Contact</a>
//         <Link to="/faq">FAQ</Link>
//         <Link to="/sun">SUN</Link>
//         <Link to="/NebulaNotes">Mars</Link>
//         <Link to="/privacy-policy">Privacy Policy</Link>
//       </div>

//       {/* Feedback Section */}
//       <div className="formToggleSection">
//         <button
//           className="formToggleButton"
//           onClick={() => setShowFeedbackForm(!showFeedbackForm)}
//         >
//           {showFeedbackForm ? "Close Feedback" : "Give Feedback"}
//         </button>
//         {showFeedbackForm && (
//           <div className="feedback">
//             <h3>Feedback</h3>
//             {submitStatus && (
//               <div className="statusMessage">{submitStatus}</div>
//             )}
//             <form onSubmit={handleFeedbackSubmit}>
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Your Name"
//                 value={feedback.name}
//                 onChange={handleFeedbackChange}
//                 required
//               />
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Your Email"
//                 value={feedback.email}
//                 onChange={handleFeedbackChange}
//                 required
//               />
//               <textarea
//                 name="message"
//                 placeholder="Your Feedback"
//                 rows="4"
//                 value={feedback.message}
//                 onChange={handleFeedbackChange}
//                 required
//               ></textarea>
//               <button type="submit">Submit</button>
//             </form>
//           </div>
//         )}
//       </div>

//       {/* Stay Updated Section */}
//       <div className="formToggleSection">
//         <button
//           className="formToggleButton"
//           onClick={() => setShowStayUpdatedForm(!showStayUpdatedForm)}
//         >
//           {showStayUpdatedForm ? "Close Stay Updated" : "Stay Updated"}
//         </button>
//         {showStayUpdatedForm && (
//           <div className="stayUpdated">
//             <h3>Stay Updated</h3>
//             <form onSubmit={handleSubscribe}>
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//               <button type="submit">
//                 <BiMailSend /> Subscribe
//               </button>
//             </form>
//           </div>
//         )}
//       </div>

//       {/* Copyright Section */}
//       <div className="copyright">
//         &copy; {new Date().getFullYear()} CosmicX. All rights reserved.
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import React, { useState } from "react";
import emailjs from "emailjs-com";
import { BiMailSend } from "react-icons/bi";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [showStayUpdatedForm, setShowStayUpdatedForm] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  // Handle feedback form changes
  const handleFeedbackChange = (e) => {
    setFeedback({
      ...feedback,
      [e.target.name]: e.target.value,
    });
  };

  // Handle feedback form submission
  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();

    if (feedback.name && feedback.email && feedback.message) {
      try {
        const serviceID = "service_qjx673s"; // Replace with your EmailJS Service ID
        const templateID = "template_8hpskxt"; // Replace with your EmailJS Template ID for feedback
        const userID = "LPAO3CIktOTvL1ETW"; // Replace with your EmailJS Public Key

        // Feedback email parameters
        const params = {
          name: feedback.name,
          email: feedback.email,
          message: feedback.message,
        };

        const response = await emailjs.send(
          serviceID,
          templateID,
          params,
          userID
        );

        if (response.status === 200) {
          setSubmitStatus("Thank you for your feedback!");
          setFeedback({ name: "", email: "", message: "" });
        } else {
          console.error("EmailJS Response Error:", response);
          setSubmitStatus("Failed to submit feedback. Try again later.");
        }
      } catch (err) {
        console.error("EmailJS Error:", err);
        setSubmitStatus("Error connecting to EmailJS. Please try again.");
      }
    } else {
      setSubmitStatus("Please fill in all fields.");
    }
  };

  // Handle subscription form submission
  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (email) {
      try {
        const serviceID = "service_qjx673s"; // Replace with your EmailJS Service ID
        const templateID = "template_tmrcewf"; // Replace with your EmailJS Template ID for subscription
        const userID = "LPAO3CIktOTvL1ETW"; // Replace with your EmailJS Public Key

        // Subscription email parameters
        const params = { email };

        const response = await emailjs.send(
          serviceID,
          templateID,
          params,
          userID
        );

        if (response.status === 200) {
          alert("Subscribed successfully!");
          setEmail("");
        } else {
          console.error("EmailJS Response Error:", response);
          alert("Failed to subscribe. Please try again.");
        }
      } catch (error) {
        console.error("EmailJS Error:", error);
        alert("Error connecting to EmailJS. Please try again.");
      }
    } else {
      alert("Please enter a valid email.");
    }
  };

  return (
    <footer className="footer">
      <div className="waveEffect"></div>

      {/* Social Media Icons */}

      {/* Links Section */}
      <div className="links">
        <Link to="/about">The Code Crew</Link>
        <Link to="/feature">Features</Link>
        <Link to="/faq">FAQ</Link>
        <Link to="/privacy-policy">Privacy Policy</Link>
      </div>
      <div className="formToggleSection">
        <button
          className="formToggleButton"
          onClick={() => setShowFeedbackForm(!showFeedbackForm)}
        >
          {showFeedbackForm ? "Close Feedback" : "Give Feedback"}
        </button>
        {showFeedbackForm && (
          <div className="feedback">
            <h3>Feedback</h3>
            {submitStatus && (
              <div className="statusMessage">{submitStatus}</div>
            )}
            <form onSubmit={handleFeedbackSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={feedback.name}
                onChange={handleFeedbackChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={feedback.email}
                onChange={handleFeedbackChange}
                required
              />
              <textarea
                name="message"
                placeholder="Your Feedback"
                rows="4"
                value={feedback.message}
                onChange={handleFeedbackChange}
                required
              ></textarea>
              <button type="submit">Submit</button>
            </form>
          </div>
        )}
      </div>

      <div className="formToggleSection">
        <button
          className="formToggleButton"
          onClick={() => setShowStayUpdatedForm(!showStayUpdatedForm)}
        >
          {showStayUpdatedForm ? "Close Stay Updated" : "Stay Updated"}
        </button>
        {showStayUpdatedForm && (
          <div className="stayUpdated">
            <h3>Stay Updated</h3>
            <form onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit">
                <BiMailSend /> Subscribe
              </button>
            </form>
          </div>
        )}
      </div>

      <div className="copyright">
        &copy; {new Date().getFullYear()} CosmicX. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
