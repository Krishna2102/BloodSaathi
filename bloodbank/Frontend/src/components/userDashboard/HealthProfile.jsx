import React from 'react';
import { motion } from 'framer-motion';
import { FaHeartbeat, FaCheckCircle } from 'react-icons/fa';

const HealthProfile = () => {
  const handleEligibilityCheck = () => {
    // Logic for eligibility check
    alert("Eligibility check functionality not implemented yet.");
  };

  return (
    <div className="bg-gradient-to-r from-blue-100 to-green-100 p-6 rounded-lg shadow-lg border border-gray-300">
      <motion.h2
        className="text-2xl font-semibold mb-4 text-center text-blue-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <FaHeartbeat className="inline-block mr-2 text-red-600" />
        Health Profile
      </motion.h2>
      <motion.form
        className="space-y-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <label className="block mb-4">
          Medical Conditions:
          <input
            type="text"
            className="block w-full border rounded-md p-2 mt-1 focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter your medical conditions"
          />
        </label>
        <label className="block mb-4">
          Allergies:
          <input
            type="text"
            className="block w-full border rounded-md p-2 mt-1 focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter any allergies"
          />
        </label>
        <label className="block mb-4">
          Medications:
          <input
            type="text"
            className="block w-full border rounded-md p-2 mt-1 focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter your medications"
          />
        </label>
        <motion.button
          type="button"
          onClick={handleEligibilityCheck}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300 flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaCheckCircle className="mr-2" />
          Check Eligibility
        </motion.button>
      </motion.form>
    </div>
  );
};

export default HealthProfile;
