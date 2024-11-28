import React, { useState, useEffect } from "react";
import { FaCalendarPlus } from "react-icons/fa";

const Stats = () => {
  const statsData = [
    { title: "Connected Hospitals", value: 120 },
    { title: "Total Blood Donations", value: 5000 },
    { title: "Blood Availability (Liters)", value: 1500 },
  ];

  const [displayedValues, setDisplayedValues] = useState(statsData.map(() => 0)); // Initialize with zeros

  useEffect(() => {
    const startAnimation = async () => {
      // Start counting for each stat
      await Promise.all(statsData.map((stat, index) => animateCount(stat.value, index)));
      // Wait for all animations to complete
      await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds
      startAnimation(); // Restart the animation
    };

    startAnimation(); // Start the animation on mount
  }, []);

  const animateCount = (endValue, index) => {
    return new Promise((resolve) => {
      let count = 1; // Start from 1
      const duration = 5000; // Total duration for counting
      const incrementTime = duration / endValue; // Time between increments

      const interval = setInterval(() => {
        if (count <= endValue) {
          setDisplayedValues((prevValues) => {
            const newValues = [...prevValues];
            newValues[index] = count; // Update the specific stat being animated
            return newValues;
          });
          count++;
        } else {
          clearInterval(interval);
          resolve(); // Resolve the promise when counting is done
        }
      }, incrementTime);
    });
  };

  return (
    <div className="bg-gray-100 py-8">
      <h2 className="text-2xl text-center font-bold mb-6">Our Impact</h2>
      <div className="flex flex-col md:flex-row justify-around max-w-6xl mx-auto p-4">
        {statsData.map((stat, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-6 m-2 flex-1 flex flex-col items-center">
            <h3 className="text-xl font-semibold">{stat.title}</h3>
            <p className="text-3xl font-bold text-blue-600">{displayedValues[index]}</p>
            <span className="text-blue-600 text-2xl"><FaCalendarPlus /></span> {/* Added + icon */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stats;
