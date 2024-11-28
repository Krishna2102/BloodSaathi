import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import axios from 'axios';

const BloodReceivingHistory = () => {
  const [receivingHistory, setReceivingHistory] = useState([]);
  const tableRef = useRef(null);

  useEffect(() => {
    // Fetch the blood receiving history data from the server
    const fetchReceivingHistory = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/user/receiving-history', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        // Log the response data to confirm structure
        console.log("Receiving History Response:", response.data);

        // Assuming the response is structured as { receivingHistory: [...] }
        const history = response.data.receivingHistory || []; // Provide default empty array if undefined
        setReceivingHistory(Array.isArray(history) ? history : []); // Ensure it’s an array
      } catch (error) {
        console.error("Error fetching receiving history:", error);
      }
    };

    fetchReceivingHistory();

    gsap.from(tableRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.5,
      ease: "power2.out",
    });
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-100 to-green-100 p-6 rounded-lg shadow-lg border border-gray-300">
      <h2 className="text-3xl font-semibold mb-6 text-center text-green-600">Blood Receiving History</h2>
      <motion.table
        ref={tableRef}
        className="min-w-full divide-y divide-gray-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <thead>
          <tr className="bg-green-600 text-white">
            <th className="py-3 px-4 text-left">Date</th>
            <th className="py-3 px-4 text-left">Quantity (L)</th>
            <th className="py-3 px-4 text-left">Blood Type</th>
            <th className="py-3 px-4 text-left">Hospital</th>
          </tr>
        </thead>
        <tbody>
          {receivingHistory.map((receiving, index) => (
            <motion.tr
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="hover:bg-green-50 transition duration-200"
            >
              <td className="py-3 px-4 border-b border-gray-200">{new Date(receiving.date).toLocaleDateString()}</td>
              <td className="py-3 px-4 border-b border-gray-200">{receiving.quantity}</td>
              <td className="py-3 px-4 border-b border-gray-200">{receiving.bloodGroup}</td>
              <td className="py-3 px-4 border-b border-gray-200">{receiving.hospitalId?.hospitalName || "Unknown"}</td>
            </motion.tr>
          ))}
        </tbody>
      </motion.table>
    </div>
  );
};

export default BloodReceivingHistory;
