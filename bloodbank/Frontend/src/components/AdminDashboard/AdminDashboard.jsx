// AdminDashboard.js
import React, { useState } from 'react';
import Navbar from '../shared/Navbar'; // Make sure to have this component
import AdminSidebar from './AdminSidebar'; // The sidebar you created earlier
import ManageUsers from './ManageUsers'; // Create these components accordingly
import ManageHospitals from './ManageHospitals';
import Reports from './Reports';
import ManageRegistrations from './ManageRegistrations';
import BloodRequestManager from './BloodRequestManager';
import InventoryManagement from './InventoryManagement';



const AdminDashboard = () => {
    const [selectedSection, setSelectedSection] = useState('manageUsers');

    const renderSection = () => {
      switch (selectedSection) {
        case 'manageUsers':
          return <ManageUsers />;
        case 'manageHospitals':
          return <ManageHospitals />;
        case 'registrationRequests':
          return <ManageRegistrations />;
        case 'reports':
          return <Reports />;
        case 'bloodrequest':
          return <BloodRequestManager />;
          case 'Inventory':
            return <InventoryManagement />;
        default:
          return <ManageUsers />;
      }
    };
  
    return (
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex flex-1 mt-16">
          <AdminSidebar onSelect={setSelectedSection} />
          <div className="flex-1 p-4 overflow-auto">
            {renderSection()}
          </div>
        </div>
      </div>
  );
};

export default AdminDashboard;
