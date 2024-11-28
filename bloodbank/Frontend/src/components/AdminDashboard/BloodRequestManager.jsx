import React, { useEffect, useState } from 'react';
import { useSpring, animated, useTransition } from '@react-spring/web';

const BloodRequestManager = () => {
  const [bloodRequests, setBloodRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Fetch all blood requests (dummy data with person and hospital)
  const viewBloodRequests = () => {
    const dummyData = [
      { id: 1, requester: 'John Doe', type: 'Person', bloodType: 'A+', status: 'Pending', additionalInfo: 'Need urgently' },
      { id: 2, requester: 'City Hospital', type: 'Hospital', bloodType: 'O-', status: 'Approved', additionalInfo: 'Scheduled for tomorrow' },
      { id: 3, requester: 'Jane Smith', type: 'Person', bloodType: 'B+', status: 'Rejected', additionalInfo: 'Not enough stock' },
      { id: 4, requester: 'Greenfield Clinic', type: 'Hospital', bloodType: 'AB+', status: 'Pending', additionalInfo: 'Type O needed' },
      { id: 5, requester: 'Emily Johnson', type: 'Person', bloodType: 'A-', status: 'Approved', additionalInfo: 'Emergency case' },
      { id: 6, requester: 'Red Cross Hospital', type: 'Hospital', bloodType: 'O+', status: 'Pending', additionalInfo: 'Critical case' },
    ];
    setBloodRequests(dummyData);
  };

  // Approve blood request
  const approveBloodRequest = (requestId) => {
    setBloodRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === requestId ? { ...request, status: 'Approved' } : request
      )
    );
  };

  // Reject blood request (with removal)
  const rejectBloodRequest = (requestId) => {
    setBloodRequests((prevRequests) => prevRequests.filter((request) => request.id !== requestId));
  };

  // Get blood request details
  const getBloodRequestDetails = (request) => {
    setSelectedRequest(request);
  };

  useEffect(() => {
    viewBloodRequests(); // Fetch blood requests on component mount
  }, []);

  // Animations for rows using react-spring's useTransition
  const transitions = useTransition(bloodRequests, {
    keys: (request) => request.id,
    from: { opacity: 0, transform: 'translateY(-20px)' },
    enter: { opacity: 1, transform: 'translateY(0)' },
    leave: { opacity: 0, transform: 'translateY(20px)' },
    config: { tension: 200, friction: 15, clamp: true },
  });

  return (
    <div className="p-6 bg-gradient-to-r from-red-300 to-red-500 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center text-white mb-6">Blood Requests</h2>
      <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md border-collapse">
        <thead className="bg-red-600 text-white">
          <tr>
            <th className="py-3 px-4 border-b text-left">ID</th>
            <th className="py-3 px-4 border-b text-left">Requester</th>
            <th className="py-3 px-4 border-b text-left">Type</th>
            <th className="py-3 px-4 border-b text-left">Blood Type</th>
            <th className="py-3 px-4 border-b text-left">Status</th>
            <th className="py-3 px-4 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transitions((style, request) => (
            <animated.tr
              key={request.id}
              style={style}
              className="hover:bg-gray-100 transition duration-300"
            >
              <td className="py-2 px-4 border-b text-center">{request.id}</td>
              <td className="py-2 px-4 border-b text-center">{request.requester}</td>
              <td className="py-2 px-4 border-b text-center">{request.type}</td>
              <td className="py-2 px-4 border-b text-center">{request.bloodType}</td>
              <td className="py-2 px-4 border-b text-center">
                <span className={`font-semibold ${request.status === 'Approved' ? 'text-green-500' : request.status === 'Rejected' ? 'text-red-500' : 'text-yellow-500'}`}>
                  {request.status}
                </span>
              </td>
              <td className="py-2 px-4 border-b text-center">
                <button
                  className="bg-green-500 text-white py-1 px-3 rounded mr-2 hover:bg-green-600 transition duration-300"
                  onClick={() => approveBloodRequest(request.id)}
                >
                  Approve
                </button>
                <button
                  className="bg-red-500 text-white py-1 px-3 rounded mr-2 hover:bg-red-600 transition duration-300"
                  onClick={() => rejectBloodRequest(request.id)}
                >
                  Reject
                </button>
                <button
                  className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition duration-300"
                  onClick={() => getBloodRequestDetails(request)}
                >
                  View Details
                </button>
              </td>
            </animated.tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Request Details */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-80 shadow-lg">
            <h3 className="text-lg font-bold mb-2">Request Details</h3>
            <p><strong>ID:</strong> {selectedRequest.id}</p>
            <p><strong>Requester:</strong> {selectedRequest.requester}</p>
            <p><strong>Type:</strong> {selectedRequest.type}</p>
            <p><strong>Blood Type:</strong> {selectedRequest.bloodType}</p>
            <p><strong>Status:</strong> {selectedRequest.status}</p>
            <p><strong>Additional Info:</strong> {selectedRequest.additionalInfo}</p>
            <button
              className="mt-4 bg-gray-300 text-black py-1 px-3 rounded hover:bg-gray-400"
              onClick={() => setSelectedRequest(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BloodRequestManager;
