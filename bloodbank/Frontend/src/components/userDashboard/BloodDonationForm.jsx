import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

const BloodDonationForm = () => {
  const formRef = useRef(null); // Reference for GSAP animation

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle donation form submission
    console.log("Donation scheduled!"); // You can replace this with actual submission logic
  };

  useEffect(() => {
    // GSAP animation on mount
    gsap.from(formRef.current, { 
      opacity: 0, 
      y: -20, 
      duration: 0.5 
    });
  }, []);

  return (
    <motion.div 
      ref={formRef}
      className="bg-gradient-to-r from-blue-100 to-white p-8 rounded-lg shadow-lg border border-gray-300 max-w-md mx-auto mt-10"
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold text-center text-blue-700 mb-6">Schedule Blood Donation</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block mb-2">
          <span className="text-gray-700 font-medium">Date:</span>
          <input 
            type="date" 
            className="block w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring focus:ring-blue-500 transition duration-200"
            required 
          />
        </label>
        
        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Schedule Donation
        </button>
      </form>
    </motion.div>
  );
};

export default BloodDonationForm;
