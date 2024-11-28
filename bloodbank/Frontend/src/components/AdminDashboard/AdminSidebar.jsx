import React from 'react';
import { FaUser, FaHospital, FaClipboardList, FaChartBar, FaBell, FaHistory, FaTint, FaBoxOpen } from 'react-icons/fa';

const AdminSidebar = ({ onSelect }) => {
  return (
    <div
      style={{ backgroundColor: '#111827', minHeight: '100vh' }}
      className="text-white w-64 p-6 shadow-lg flex flex-col"
    >
      <h2 className="text-2xl font-semibold mb-8">Admin Menu</h2>
      <ul className="space-y-4">
        <li
          onClick={() => onSelect('manageUsers')}
          className="cursor-pointer flex items-center p-3 hover:bg-gray-800 rounded-lg transition duration-200"
        >
          <FaUser className="mr-3" /> Manage Users
        </li>
        <li
          onClick={() => onSelect('manageHospitals')}
          className="cursor-pointer flex items-center p-3 hover:bg-gray-800 rounded-lg transition duration-200"
        >
          <FaHospital className="mr-3" /> Manage Hospitals
        </li>
        <li
          onClick={() => onSelect('registrationRequests')}
          className="cursor-pointer flex items-center p-3 hover:bg-gray-800 rounded-lg transition duration-200"
        >
          <FaClipboardList className="mr-3" /> Registration Requests
        </li>
        <li
          onClick={() => onSelect('reports')}
          className="cursor-pointer flex items-center p-3 hover:bg-gray-800 rounded-lg transition duration-200"
        >
          <FaChartBar className="mr-3" /> Reports
        </li>
        <li
          onClick={() => onSelect('notifications')}
          className="cursor-pointer flex items-center p-3 hover:bg-gray-800 rounded-lg transition duration-200"
        >
          <FaBell className="mr-3" /> Notifications
        </li>
        <li
          onClick={() => onSelect('history')}
          className="cursor-pointer flex items-center p-3 hover:bg-gray-800 rounded-lg transition duration-200"
        >
          <FaHistory className="mr-3" /> History
        </li>
        <li
          onClick={() => onSelect('bloodrequest')}
          className="cursor-pointer flex items-center p-3 hover:bg-gray-800 rounded-lg transition duration-200"
        >
          <FaTint className="mr-3" /> Blood Requests
        </li>
        <li
          onClick={() => onSelect('Inventory')}
          className="cursor-pointer flex items-center p-3 hover:bg-gray-800 rounded-lg transition duration-200"
        >
          <FaBoxOpen className="mr-3" /> Inventory
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
