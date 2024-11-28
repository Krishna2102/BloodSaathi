import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import BloodDonationForm from './BloodDonationForm';
import BloodRequestForm from './BloodRequestForm';
import NotificationSystem from './NotificationSystem';
import BloodDonationHistory from './BloodDonationHistory';
import HealthProfile from './HealthProfile';
import Statistics from './Statistics';
import Profile from './Profile';


const UserDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [currentSection, setCurrentSection] = useState('donation');
 

  const renderSection = () => {
    switch (currentSection) {
      case 'donation':
        return <BloodDonationForm />;
      case 'request':
        return <BloodRequestForm />;
      case 'notifications':
        return <NotificationSystem />;
      case 'history':
        return <BloodDonationHistory />;
      case 'profile':
        return <HealthProfile />;
      case 'userprofile':
        return <Profile />;
      case 'statistics':
        return <Statistics />;
      default:
        return <BloodDonationForm />;
    }
  };

 

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-grow bg-gray-100">
        {isSidebarOpen && (
          <Sidebar currentSection={currentSection} setCurrentSection={setCurrentSection} />
        )}
        <div className={`flex-grow p-6 ${isSidebarOpen ? 'ml-64' : ''}`}>
          <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Blood Bank Dashboard</h1>

       
        

          {/* Render the current section */}
          <div className="bg-white p-6 rounded-lg shadow-md">{renderSection()}</div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;