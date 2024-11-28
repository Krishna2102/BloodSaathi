import image1 from '../images/one.jpg';
import image2 from '../images/two.jpg';
import image3 from '../images/three.png';
import image4 from '../images/four.jpg';
import React, { useState, useEffect } from "react";

// Dummy content and image list
const slides = [
  {
    image: image1,
    text: "This is the first content corresponding to image 1. It contains some description related to image 1. The full description will be shown after clicking the Read More button.",
  },
  {
    image: image2,
    text: "This is the second content corresponding to image 2. It contains another description related to image 2. Lorem ipsum dolor sit amet consectetur, adipisicing elit...",
  },
  {
    image: image3,
    text: "This is the third content corresponding to image 3. It contains a different description related to image 3.",
  },
  {
    image: image4,
    text: "This is the fourth content corresponding to image 4. It contains another different description related to image 4.",
  },
];

const Sliding = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showFullContent, setShowFullContent] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentSlide((prevSlide) =>
          prevSlide === slides.length - 1 ? 0 : prevSlide + 1
        );
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isPaused]);

  const toggleContent = () => {
    setShowFullContent(!showFullContent);
    setIsPaused(!isPaused);
  };

  const truncatedContent = slides[currentSlide].text.slice(0, 250);

  return (
    <div className="flex justify-center items-center bg-gray-100">
      {/* Full-width container with 16px margin on left and right */}
      <div className="flex flex-col md:flex-row justify-between items-center w-full h-auto md:h-96 bg-white shadow-lg p-4 mx-7 overflow-hidden">
        {/* Left side: Content */}
        <div className="w-full md:w-1/2 p-4 h-48 md:h-full overflow-auto">
          <h2 className="text-xl font-bold">Content Section</h2>
          <p className="mt-4">
            {showFullContent ? slides[currentSlide].text : `${truncatedContent}...`}
          </p>
          <button
            onClick={toggleContent}
            className="mt-4 text-blue-500 underline"
          >
            {showFullContent ? "Read Less" : "Read More"}
          </button>
        </div>

        {/* Right side: Image */}
        <div className="w-full md:w-1/2 h-48 md:h-full p-4 flex justify-center items-center">
          <img
            src={slides[currentSlide].image}
            alt="Slide"
            className="w-full h-auto md:h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Sliding;
