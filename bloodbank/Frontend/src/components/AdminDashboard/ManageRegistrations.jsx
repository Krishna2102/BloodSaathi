import React, { useState, useEffect } from 'react'; 
import { useSpring, animated } from '@react-spring/web';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import axios from 'axios';
import HospitalDetailsModal from './HospitalDetailsModal';

const ManageRegistrations = () => {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState(null); // State to hold the selected hospital

  const pendingRequest = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/admin/pending-requests', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Fix the template literal syntax
        },
      });
      setPendingUsers(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  
  useEffect(() => {
    pendingRequest();
  },[])

  const handleApproval = async (id, approved) => {
    try {
      // Update the approval status in your backend (API call)
      await axios.put(`http://localhost:3000/api/admin/approve/${id}`, { approved });

      // Update state locally
      setPendingUsers(prevUsers =>
        prevUsers.map(user =>
          user.id === id ? { ...user, status: approved ? 'Approved' : 'Rejected' } : user
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  const openModal = (hospital) => {
    setSelectedHospital(hospital); // Set the selected hospital for the modal
    setModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setModalOpen(false); // Close the modal
    setSelectedHospital(null); // Clear the selected hospital
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-100 to-blue-100 min-h-screen rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Pending Hospital Registrations</h2>
      <table className="min-w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <thead className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <tr>
            <th className="py-4 px-6 text-left">Hospital</th>
            <th className="py-4 px-6 text-left">Hospital Email</th>
            <th className="py-4 px-6 text-left">View Request</th>
          </tr>
        </thead>
        <tbody>
          {pendingUsers.map((user, index) => (
            <TableRow key={user.id} user={user} handleApproval={handleApproval} index={index} openModal={openModal} />
          ))}
        </tbody>
      </table>

      {selectedHospital && (
        <HospitalDetailsModal
          hospital={selectedHospital} // Pass the selected hospital
          isOpen={modalOpen} // Control modal visibility
          onClose={closeModal} // Close modal
          pendingUsers={pendingUsers} // Pass pending users
          setPendingUsers={setPendingUsers} // Update pending users
          // handleApproval={handleApproval} // Pass approval function
        />
      )}
    </div>
  );
};

// TableRow component with improved content UI
const TableRow = ({ user, handleApproval, index, openModal }) => {
  const props = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    delay: index * 200,
  });

  return (
    <animated.tr
      style={props}
      className="bg-gradient-to-r from-green-400 to-blue-500 hover:bg-gradient-to-r hover:from-green-300 hover:to-blue-400 transition duration-300"
    >
      <td className="py-4 px-6 flex items-center text-gray-800">
        {user.status === 'Approved' && <FaCheckCircle className="text-green-500 mr-2" />}
        {user.hospitalName} {/* Assuming user.hospitalName contains the hospital name */}
      </td>
      <td className="py-4 px-6 text-gray-600">{user.email}</td> {/* Assuming user.email contains the hospital email */}
      <td className="py-4 px-6 text-gray-600">
        <button
          onClick={() => openModal(user)} // Open modal with the user data
          className="bg-blue-500 text-white py-1 px-4 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 flex items-center"
        >
          View Request
        </button>
      </td>
    </animated.tr>
  );
};

export default ManageRegistrations;