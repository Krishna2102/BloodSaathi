import React from 'react';
import { FaHeartbeat, FaCalendarAlt, FaTint } from 'react-icons/fa';

const Statistics = () => {
  const totalDonations = 5; // Fetch this from the database
  const lastDonationDate = '2024-08-15'; // Fetch this from the database
  const bloodType = 'O+'; // Fetch this from the database

  return (
    <div className="p-6 bg-gradient-to-r from-pink-100 to-yellow-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center text-red-700">Donor Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center p-4 bg-white rounded-lg shadow-md">
          <FaHeartbeat className="text-red-600 text-3xl mr-3" />
          <div>
            <h3 className="text-lg font-medium">Total Donations</h3>
            <p className="text-xl font-bold">{totalDonations}</p>
          </div>
        </div>
        <div className="flex items-center p-4 bg-white rounded-lg shadow-md">
          <FaCalendarAlt className="text-blue-600 text-3xl mr-3" />
          <div>
            <h3 className="text-lg font-medium">Last Donation Date</h3>
            <p className="text-xl font-bold">{lastDonationDate}</p>
          </div>
        </div>
        <div className="flex items-center p-4 bg-white rounded-lg shadow-md">
          <FaTint className="text-green-600 text-3xl mr-3" />
          <div>
            <h3 className="text-lg font-medium">Blood Type</h3>
            <p className="text-xl font-bold">{bloodType}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
