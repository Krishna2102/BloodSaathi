import React, { useState } from 'react';

const Reports = () => {
  // Sample data for users and hospitals
  const [users] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', bloodType: 'A+' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', bloodType: 'B+' },
  ]);

  const [hospitals] = useState([
    { id: 1, name: 'City Hospital', location: 'Downtown', contact: '1234567890' },
    { id: 2, name: 'General Hospital', location: 'Uptown', contact: '0987654321' },
  ]);

  // Modal state and report content
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reportContent, setReportContent] = useState('');

  // Report generation functions
  const generateUserReport = () => {
    const report = users.map(user => `${user.name} (${user.bloodType})`).join(', ');
    setReportContent(`User Report:\n${report}`);
    setIsModalOpen(true);
  };

  const generateHospitalReport = () => {
    const report = hospitals.map(hospital => `${hospital.name} - ${hospital.location}`).join(', ');
    setReportContent(`Hospital Report:\n${report}`);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Interactive Reports</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* User Reports Section */}
        <div className="bg-gradient-to-r from-blue-400 to-blue-600 shadow-lg rounded-lg p-6">
          <h3 className="text-2xl font-semibold text-white mb-4">User Reports</h3>
          <p className="text-white mb-4">Click below to generate a detailed user report.</p>
          <button
            onClick={generateUserReport}
            className="bg-white text-blue-600 py-2 px-6 rounded-full hover:bg-gray-200 transition duration-200 transform hover:scale-105"
          >
            Generate User Report
          </button>
          <table className="min-w-full bg-white mt-6 border rounded-lg overflow-hidden shadow-md">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-3 px-4 text-left">ID</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Blood Type</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {users.map(user => (
                <tr key={user.id} className="hover:bg-gray-100 transition duration-200">
                  <td className="py-3 px-4 border-b">{user.id}</td>
                  <td className="py-3 px-4 border-b">{user.name}</td>
                  <td className="py-3 px-4 border-b">{user.email}</td>
                  <td className="py-3 px-4 border-b">{user.bloodType}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Hospital Reports Section */}
        <div className="bg-gradient-to-r from-green-400 to-green-600 shadow-lg rounded-lg p-6">
          <h3 className="text-2xl font-semibold text-white mb-4">Hospital Reports</h3>
          <p className="text-white mb-4">Click below to generate a detailed hospital report.</p>
          <button
            onClick={generateHospitalReport}
            className="bg-white text-green-600 py-2 px-6 rounded-full hover:bg-gray-200 transition duration-200 transform hover:scale-105"
          >
            Generate Hospital Report
          </button>
          <table className="min-w-full bg-white mt-6 border rounded-lg overflow-hidden shadow-md">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-3 px-4 text-left">ID</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Location</th>
                <th className="py-3 px-4 text-left">Contact</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {hospitals.map(hospital => (
                <tr key={hospital.id} className="hover:bg-gray-100 transition duration-200">
                  <td className="py-3 px-4 border-b">{hospital.id}</td>
                  <td className="py-3 px-4 border-b">{hospital.name}</td>
                  <td className="py-3 px-4 border-b">{hospital.location}</td>
                  <td className="py-3 px-4 border-b">{hospital.contact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for displaying reports */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full md:w-1/3 relative transition duration-300 transform scale-100 hover:scale-105">
            <h3 className="text-xl font-bold mb-4">Generated Report</h3>
            <pre className="whitespace-pre-wrap mb-6 text-gray-700">{reportContent}</pre>
            <button
              onClick={closeModal}
              className="absolute top-2 right-4 text-red-500 hover:text-red-600 text-2xl font-bold"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;
