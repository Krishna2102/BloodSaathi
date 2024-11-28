import React from 'react';
import { FaRegCalendarAlt, FaBell, FaHistory, FaHeartbeat, FaUserAlt, FaChartBar, FaTint } from 'react-icons/fa';

const Sidebar = ({ currentSection, setCurrentSection }) => {
  return (
    <div className="bg-gray-800 text-white w-64 mt-16 h-screen fixed inset-y-0 left-0 p-4 overflow-y-auto">
      <h2 className="text-3xl font-bold mb-8 flex items-center">
        <FaTint className="text-red-500 mr-2" /> Blood Bank
      </h2>
      <ul>
        <li 
          className={`mb-6 flex items-center cursor-pointer p-2 rounded-lg transition-colors duration-300 ${
            currentSection === 'donation' ? 'bg-gray-700 text-blue-300' : 'hover:bg-gray-700'
          }`}
          onClick={() => setCurrentSection('donation')}
        >
          <FaRegCalendarAlt className="mr-3" />
          Schedule Blood Donation
        </li>
        <li 
          className={`mb-6 flex items-center cursor-pointer p-2 rounded-lg transition-colors duration-300 ${
            currentSection === 'request' ? 'bg-gray-700 text-blue-300' : 'hover:bg-gray-700'
          }`}
          onClick={() => setCurrentSection('request')}
        >
          <FaHeartbeat className="mr-3" />
          Request Blood
        </li>
        <li 
          className={`mb-6 flex items-center cursor-pointer p-2 rounded-lg transition-colors duration-300 ${
            currentSection === 'notifications' ? 'bg-gray-700 text-blue-300' : 'hover:bg-gray-700'
          }`}
          onClick={() => setCurrentSection('notifications')}
        >
          <FaBell className="mr-3" />
          Notifications
        </li>
        <li 
          className={`mb-6 flex items-center cursor-pointer p-2 rounded-lg transition-colors duration-300 ${
            currentSection === 'history' ? 'bg-gray-700 text-blue-300' : 'hover:bg-gray-700'
          }`}
          onClick={() => setCurrentSection('history')}
        >
          <FaHistory className="mr-3" />
          Blood Donation History
        </li>
        <li 
          className={`mb-6 flex items-center cursor-pointer p-2 rounded-lg transition-colors duration-300 ${
            currentSection === 'profile' ? 'bg-gray-700 text-blue-300' : 'hover:bg-gray-700'
          }`}
          onClick={() => setCurrentSection('profile')}
        >
          <FaHeartbeat className="mr-3" />
          Health Profile
        </li>
        <li 
          className={`mb-6 flex items-center cursor-pointer p-2 rounded-lg transition-colors duration-300 ${
            currentSection === 'userprofile' ? 'bg-gray-700 text-blue-300' : 'hover:bg-gray-700'
          }`}
          onClick={() => setCurrentSection('userprofile')}
        >
          <FaUserAlt className="mr-3" />
          User Profile
        </li>
        <li 
          className={`mb-6 flex items-center cursor-pointer p-2 rounded-lg transition-colors duration-300 ${
            currentSection === 'statistics' ? 'bg-gray-700 text-blue-300' : 'hover:bg-gray-700'
          }`}
          onClick={() => setCurrentSection('statistics')}
        >
          <FaChartBar className="mr-3" />
          Statistics Profile
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
