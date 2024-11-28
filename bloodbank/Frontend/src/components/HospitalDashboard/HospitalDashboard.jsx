import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import Sidebar from './Sidebar';
import RequestBlood from './UpdateProfile';
import OrganizeCamp from './OrganizeCamp';
import Logs from './ViewLogs';
import Notifications from './Notifications';
import ViewLogs from './ViewLogs';
import InventoryManagement from './InventoryManagement';
import Analytics from './Analytics';
import ApprovalWorkflow from './ApprovalWorkflow';
import History from './History';
import UpdateProfile from './UpdateProfile';

const HospitalDashboard = () => {
    const [selectedSection, setSelectedSection] = useState('requestBlood');

    const renderSection = () => {
      switch (selectedSection) {
        case 'updateProfile':
          return <UpdateProfile/>;
        case 'organizeCamp':
          return <OrganizeCamp />;
        case 'logs':
          return <ViewLogs />;
        case 'notifications':
          return <Notifications />;
        case 'inventory':
          return <InventoryManagement />;
        case 'analytics':
          return <Analytics />;
        // case 'history':
        //     return <History />;
        case 'approval':
          return <ApprovalWorkflow />;
        default:
          return <UpdateProfile/>;
      }
    };
  
    return (
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex flex-1 mt-16">
          <Sidebar onSelect={setSelectedSection} />
          <div className="flex-1 p-4 overflow-auto">
            {renderSection()}
          </div>
        </div>
      </div>
  );
};

export default HospitalDashboard;
