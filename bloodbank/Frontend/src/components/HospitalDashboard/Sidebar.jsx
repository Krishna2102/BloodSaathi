import React from 'react';
import { FaBell, FaHistory, FaCampground, FaClipboardList, FaClipboardCheck, FaBoxOpen, FaChartLine, FaTint } from 'react-icons/fa';

const Sidebar = ({ onSelect }) => {
  return (
    <div style={{ backgroundColor: '#1f2937' }} className="text-white w-64 p-6 h-screen">
      <h2 className="text-xl font-bold mb-6 flex items-center">
        <FaTint className="text-red-500 mr-3" /> Menu
      </h2>
      <ul>
        <li onClick={() => onSelect('updateProfile')} className="flex items-center cursor-pointer p-3 hover:bg-gray-700 rounded-lg mb-3">
          <FaTint className="mr-3" />Update Profile
        </li>
        <li onClick={() => onSelect('organizeCamp')} className="flex items-center cursor-pointer p-3 hover:bg-gray-700 rounded-lg mb-3">
          <FaCampground className="mr-3" /> Organize Camp
        </li>
        <li onClick={() => onSelect('logs')} className="flex items-center cursor-pointer p-3 hover:bg-gray-700 rounded-lg mb-3">
          <FaClipboardList className="mr-3" /> View Logs
        </li>
        {/* <li onClick={() => onSelect('history')} className="flex items-center cursor-pointer p-3 hover:bg-gray-700 rounded-lg mb-3">
          <FaHistory className="mr-3" /> History
        </li> */}
        <li onClick={() => onSelect('notifications')} className="flex items-center cursor-pointer p-3 hover:bg-gray-700 rounded-lg mb-3">
          <FaBell className="mr-3" /> Notifications
        </li>
        <li onClick={() => onSelect('inventory')} className="flex items-center cursor-pointer p-3 hover:bg-gray-700 rounded-lg mb-3">
          <FaBoxOpen className="mr-3" /> Inventory Management
        </li>
        <li onClick={() => onSelect('analytics')} className="flex items-center cursor-pointer p-3 hover:bg-gray-700 rounded-lg mb-3">
          <FaChartLine className="mr-3" /> Analytics
        </li>
        <li onClick={() => onSelect('approval')} className="flex items-center cursor-pointer p-3 hover:bg-gray-700 rounded-lg mb-3">
          <FaClipboardCheck className="mr-3" /> Approval Workflow
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
