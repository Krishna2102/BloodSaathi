import React, { useEffect, useState } from 'react';
import { FaHospital, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import axios from 'axios';

const HospitalDetails = () => {
  // State for hospital details and modal visibility
  const [hospitalDetails, setHospitalDetails] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedDetails, setUpdatedDetails] = useState(hospitalDetails);
  const [loading, setLoading] = useState(true);

  // Function to open and close modal
  const openModal = () => {
    setUpdatedDetails(hospitalDetails); // Set updated details when modal opens
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  // Function to fetch hospital details
  const getHospitalDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/api/hospital/profile', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setHospitalDetails(response.data);
      setUpdatedDetails(response.data); // Initialize updated details
      console.log("Hospital Details:", response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getHospitalDetails();
  }, []);

  // Handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission to update hospital details
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:3000/api/hospital/update', updatedDetails, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setHospitalDetails(updatedDetails); // Update with new details
      closeModal();
      console.log("Updated Hospital Details:", updatedDetails);
    } catch (error) {
      console.error("Error updating hospital details:", error);
      // Optionally handle error state for user feedback
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <div className="p-8 bg-gradient-to-r from-blue-100 to-white rounded-lg shadow-xl max-w-lg mx-auto mt-12">
      <h2 className="text-3xl font-semibold mb-6 text-blue-700 text-center">
        <FaHospital className="inline-block mr-2" /> Hospital Profile
      </h2>
      <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
        <div className="text-lg font-semibold text-gray-700 mb-2">
          <FaHospital className="inline-block mr-2 text-blue-500" /> {hospitalDetails.hospitalName}
        </div>
        <p className="mb-3 text-gray-600">
          <FaMapMarkerAlt className="inline-block mr-2 text-blue-500" />
          {`${hospitalDetails.address?.street}, ${hospitalDetails.address?.city}, ${hospitalDetails.address?.state} - ${hospitalDetails.address?.postalCode}`}
        </p>
        <p className="mb-3 text-gray-600">
          <FaEnvelope className="inline-block mr-2 text-blue-500" /> {hospitalDetails.email}
        </p>
        <p className="mb-3 text-gray-600">
          <strong>Status:</strong> {hospitalDetails.approvalStatus}
        </p>
        <p className="mb-3 text-gray-600">
          <FaPhone className="inline-block mr-2 text-blue-500" /> {hospitalDetails.contactNumber}
        </p>
        
        <button
          onClick={openModal}
          className="mt-6 w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-5 py-2 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition duration-200 font-semibold"
        >
          Update Profile
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-lg shadow-xl border border-gray-300 max-w-sm w-full mx-4">
            <h3 className="text-xl font-semibold mb-4 text-blue-700">Update Profile</h3>
            <form onSubmit={handleUpdateSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Hospital Name</label>
                <input 
                  type="text" 
                  name="hospitalName" 
                  value={updatedDetails.hospitalName} 
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Street</label>
                <input 
                  type="text" 
                  name="street" 
                  value={updatedDetails.address?.street} 
                  onChange={(e) => handleInputChange({ target: { name: 'address', value: { ...updatedDetails.address, street: e.target.value } } })}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">City</label>
                <input 
                  type="text" 
                  name="city" 
                  value={updatedDetails.address?.city} 
                  onChange={(e) => handleInputChange({ target: { name: 'address', value: { ...updatedDetails.address, city: e.target.value } } })}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">State</label>
                <input 
                  type="text" 
                  name="state" 
                  value={updatedDetails.address?.state} 
                  onChange={(e) => handleInputChange({ target: { name: 'address', value: { ...updatedDetails.address, state: e.target.value } } })}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Postal Code</label>
                <input 
                  type="text" 
                  name="postalCode" 
                  value={updatedDetails.address?.postalCode} 
                  onChange={(e) => handleInputChange({ target: { name: 'address', value: { ...updatedDetails.address, postalCode: e.target.value } } })}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Email</label>
                <input 
                  type="email" 
                  name="email" 
                  value={updatedDetails.email} 
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Contact Number</label>
                <input 
                  type="text" 
                  name="contactNumber" 
                  value={updatedDetails.contactNumber} 
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <button 
                type="submit" 
                className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200 font-semibold"
              >
                Save Changes
              </button>
              <button 
                type="button" 
                onClick={closeModal} 
                className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200 font-semibold mt-2"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HospitalDetails;
