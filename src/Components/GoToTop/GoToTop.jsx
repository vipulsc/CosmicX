// // import React, { useState } from "react";
// // import "./GoToTop.css";

// // const GoToTop = ({ scrollToTop, isVisible }) => {
// //   const [isLaunching, setIsLaunching] = useState(false);

// //   const handleClick = () => {
// //     setIsLaunching(true);
// //     // Start scrolling after a short delay to allow the animation to complete
// //     setTimeout(() => {
// //       scrollToTop();
// //       setIsLaunching(false); // Reset the animation state after scrolling
// //     }, 1000); // Delay for the animation to run
// //   };

// //   return (
// //     <button
// //       className={`upar ${isVisible ? "show" : "hide"} ${
// //         isLaunching ? "launching" : ""
// //       }`}
// //       onClick={handleClick}
// //       aria-label="Scroll to top"
// //     >
// //       <svg
// //         xmlns="http://www.w3.org/2000/svg"
// //         viewBox="0 0 24 24"
// //         width="50"
// //         height="50"
// //         fill="none"
// //         stroke="currentColor"
// //         strokeWidth="2"
// //         strokeLinecap="round"
// //         strokeLinejoin="round"
// //         className="rocket-icon"
// //       >
// //         <path d="M12 2L12 22M12 2L6 10M12 2L18 10M6 10L5 15C5 15.552 5.448 16 6 16H18C18.552 16 19 15.552 19 15L18 10"></path>
// //       </svg>
// //       {isLaunching && <div className="launch-text">Rocket Launch!</div>}
// //     </button>
// //   );
// // };

// // export default GoToTop;
// import React, { useState } from "react";
// import "./GoToTop.css";

// const GoToTop = ({ scrollToTop, isVisible }) => {
//   const [countdown, setCountdown] = useState(null);
//   const [scrolling, setScrolling] = useState(false);

//   const handleClick = () => {
//     // Start the countdown from 3 when the button is clicked
//     let count = 3;
//     setScrolling(true);

//     // Start countdown
//     const countdownInterval = setInterval(() => {
//       if (count === 0) {
//         clearInterval(countdownInterval);
//         scrollToTop(); // Trigger scroll after countdown finishes
//         setScrolling(false); // Reset scrolling state
//         setCountdown(3); // Reset countdown to 3 for the next click
//       } else {
//         setCountdown(count); // Update the countdown
//         count--;
//       }
//     },500); // 1 second delay for countdown
//   };

//   return (
//     <button
//       className={`upar ${isVisible ? "show" : "hide"}`}
//       onClick={handleClick}
//       aria-label="Scroll to top"
//     >
//       {scrolling ? (
//         <div className="countdown">{countdown}</div> // Display countdown
//       ) : (
//         <div className="rocket-icon">🚀</div> // Rocket icon for the button
//       )}
//     </button>
//   );
// };

// export default GoToTop;
import React, { useState, useEffect } from "react";
import "./GoToTop.css";

const GoToTop = ({ scrollToTop, isVisible }) => {
  const [countdown, setCountdown] = useState(null);
  const [scrolling, setScrolling] = useState(false);

  const handleClick = () => {
    // Start countdown only if not already scrolling
    if (!scrolling) {
      let count = 3;
      setScrolling(true);
      setCountdown(count);

      // Start countdown
      const countdownInterval = setInterval(() => {
        count -= 1;
        if (count === 0) {
          clearInterval(countdownInterval);
          scrollToTop(); // Trigger scroll after countdown finishes
          setScrolling(false); // Reset scrolling state
          setCountdown(null); // Reset countdown
        } else {
          setCountdown(count); // Update the countdown
        }
      }, 1000); // Set correct 1-second delay for countdown
    }
  };

  return (
    <button
      className={`upar ${isVisible ? "show" : "hide"}`}
      onClick={handleClick}
      aria-label="Scroll to top"
    >
      {scrolling && countdown !== null ? (
        <div className="countdown">{countdown}</div> // Display countdown
      ) : (
        <div className="rocket-icon">🚀</div> // Rocket icon for the button
      )}
    </button>
  );
};

export default GoToTop;
