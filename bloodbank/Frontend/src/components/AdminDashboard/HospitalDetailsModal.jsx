import React, { useEffect, useState } from 'react';
import axios from 'axios';
const HospitalDetailsModal = ({ hospital, isOpen, onClose,pendingUsers,setPendingUsers }) => {
  if (!isOpen) return null; // Don't render if the modal is not open
  
  // const pendingRequest = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:3000/api/admin/pending-requests', {
  //       headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  //     });
  //     setPendingUsers(response.data);
  //   }
  //   catch (err) {
  //     console.log(err);
  //   }
  // };
  // useEffect(() => {
  //   console.log('HospitalDetailsModal mounted');
  //   pendingRequest();
  // }, []);
  const handleApproval = async (id, approved) => {
    
    try {
      // Update the approval status in your backend (API call)
      await axios.put(`http://localhost:3000/api/admin/pending-requests/${id}`, {"decision": approved },{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      // Update state locally
      
        const filteredPendingUsers = pendingUsers.filter(user => user.status === 'Pending');
        setPendingUsers(filteredPendingUsers);
        
       
    } catch (err) {
      console.log(err);
    }
    onClose(); // Close
    

  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">{hospital.hospitalName}</h2>
        <p><strong>Address:</strong> {`${hospital.address.street}, ${hospital.address.city}, ${hospital.address.state} ${hospital.address.postalCode}`}</p>
        <p><strong>Email:</strong> {hospital.email}</p>
        <p><strong>Contact Number:</strong> {hospital.contactNumber || 'N/A'}</p>
        <p><strong>Approval Status:</strong> {hospital.approvalStatus}</p>

        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={() => handleApproval(hospital._id, "Approve")}
             // Pass hospital ID and approval status
            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300 ease-in-out"
          >
            Approve
          </button>
          <button
            onClick={() => handleApproval(hospital._id, "Deny")} // Pass hospital ID and rejection status
            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300 ease-in-out"
          >
            Reject
          </button>
          <button
            onClick={onClose} // Close the modal
            className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400 transition duration-300 ease-in-out"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default HospitalDetailsModal;