// import React, { useEffect, useState } from "react";
// import "./RocketCursor.css";

// const RocketCursor = () => {
//   const [position, setPosition] = useState({ x: 0, y: 0 });

//   useEffect(() => {
//     const handleMouseMove = (event) => {
//       setPosition({ x: event.clientX, y: event.clientY });
//     };

//     window.addEventListener("mousemove", handleMouseMove);

//     return () => {
//       window.removeEventListener("mousemove", handleMouseMove);
//     };
//   }, []);

//   return (
//     <div
//       className="rocket-cursor"
//       style={{
//         left: `${position.x}px`,
//         top: `${position.y}px`,
//       }}
//     ></div>
//   );
// };

// export default RocketCursor;
