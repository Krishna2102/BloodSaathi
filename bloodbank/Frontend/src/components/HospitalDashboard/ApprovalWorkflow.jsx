import React, { useState,useEffect } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa'; // Importing icons from react-icons
import axios from 'axios';
const ApprovalWorkflow = () => {
  // Dummy data for blood requests with new schema fields
  // const [requests, setRequests] = useState([
  //   { id: 1, bloodGroup: 'A+', quantity: 2, status: 'Pending' },
  //   { id: 2, bloodGroup: 'B-', quantity: 1, status: 'Pending' },
  //   { id: 3, bloodGroup: 'O+', quantity: 3, status: 'Pending' },
  // ]);
  const [requests, setRequests] = useState([]);
  const fetchRequests = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://localhost:3000/api/hospital/pending', {
        headers: {
          'Authorization': `Bearer ${token}`
        }

      });
      setRequests(response.data);
    } catch (error) {
      console.error(error);
    }

  };
  useEffect(() => {
    fetchRequests();
  }
  , []);
  // Function to handle approval
  const handleApproval = async (id, decision) => {
    console.log(id, decision);
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        'http://localhost:3000/api/hospital/reception',
        { requestId: id, decision },
        
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      console.log('Approval response:', response);
      // Only update state if the request is successful
      if (response.status === 200) {
        setRequests((prevRequests) =>
          prevRequests.map((request) =>
            request._id === id ? { ...request, status: decision === 'Completed' ? 'Completed' : 'Rejected' } : request
          )
        );
      }
    } catch (error) {
      console.error("Error updating request status:", error);
      // Optionally, display an error message to the user
    }
  };
  

  return (
    <div className="p-6 bg-gradient-to-r from-blue-50 to-white rounded-lg shadow-md max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">Pending Blood Requests</h2>
      <table className="min-w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr className="bg-blue-100">
            <th className="py-2 px-4 border">Blood Group</th>
            <th className="py-2 px-4 border">Quantity</th>
            <th className="py-2 px-4 border">Status</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request._id} className={request.status === 'Completed' ? 'bg-green-100' : request.status === 'Rejected' ? 'bg-red-100' : ''}>
              <td className="py-2 px-4 border text-center">{request.bloodGroup}</td>
              <td className="py-2 px-4 border text-center">{request.quantity}</td>
              <td className="py-2 px-4 border text-center">{request.status}</td>
              <td className="py-2 px-4 border text-center">
                <button
                  onClick={() => handleApproval(request._id, 'Completed')}
                  className="bg-green-500 text-white px-3 py-1 rounded mr-2 transition duration-200 hover:bg-green-600"
                  disabled={request.status !== 'Pending'}
                  aria-label="Approve Request"
                >
                  <FaCheck />
                </button>
                <button
                  onClick={() => handleApproval(request._id, 'Rejected')}
                  className="bg-red-500 text-white px-3 py-1 rounded transition duration-200 hover:bg-red-600"
                  disabled={request.status !== 'Pending'}
                  aria-label="Reject Request"
                >
                  <FaTimes />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApprovalWorkflow;
