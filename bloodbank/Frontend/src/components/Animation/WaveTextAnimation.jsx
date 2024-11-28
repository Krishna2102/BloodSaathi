// // WaveTextAnimation.jsx

// import React, { useEffect } from "react";
// import { gsap } from "gsap";

// const WaveTextAnimation = ({ text }) => {
//   useEffect(() => {
//     // Split text into individual letters
//     const letters = document.querySelectorAll(".letter");
//     letters.forEach((letter, index) => {
//       // Apply a GSAP animation to each letter
//       gsap.to(letter, {
//         y: -10,
//         repeat: -1,
//         yoyo: true,
//         ease: "sine.inOut",
//         duration: 0.5,
//         delay: index * 0.1, // Stagger the animation for each letter
//       });
//     });
//   }, [text]);

//   return (
//     <div className="relative flex justify-center items-center h-screen bg-white">
//       <h1 className="text-6xl font-bold">
//         {/* Split the text into letters */}
//         {text.split("").map((letter, index) => (
//           <span key={index} className="letter inline-block">
//             {letter}
//           </span>
//         ))}
//       </h1>
//     </div>
//   );
// };

// export default WaveTextAnimation;

// WaveTextAnimation.jsx

import React, { useEffect } from "react";
import { gsap } from "gsap";
import './styles.css'; // Make sure to import your CSS file

const WaveTextAnimation = ({ text }) => {
  useEffect(() => {
    // Split text into individual letters
    const letters = document.querySelectorAll(".letter");
    letters.forEach((letter, index) => {
      // Apply a GSAP animation to each letter
      gsap.to(letter, {
        y: -10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        duration: 0.5,
        delay: index * 0.1, // Stagger the animation for each letter
      });
    });
  }, [text]);

  return (
    <div className="relative flex justify-center items-center  ">
      <h1 className="text-6xl font-bold text-[#EF342D]">
        {/* Split the text into letters */}
        {text.split("").map((letter, index) => (
          <span key={index} className="letter inline-block">
            {letter}
          </span>
        ))}
      </h1>
    </div>
  );
};

export default WaveTextAnimation;

WaveTextAnimation.jsx

