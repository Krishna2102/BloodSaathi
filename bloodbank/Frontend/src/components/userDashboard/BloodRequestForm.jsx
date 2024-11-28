import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BloodRequestForm = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [hospitals, setHospitals] = useState([]);
  const [filteredHospitals, setFilteredHospitals] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [request, setRequest] = useState({
    bloodType: '',
    quantity: '',
    reason: '',
  });

  const fetchHospitals = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/user/fetch-hospitals`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setHospitals(response.data.hospitals);
      setFilteredHospitals(response.data.hospitals);
    } catch (error) {
      console.error('Error fetching hospitals:', error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchHospitals();
  }, []);

  const filterHospitals = () => {
    const results = hospitals.filter((hospital) => {
      const fullLocation = `${hospital.address.city}, ${hospital.address.state}, ${hospital.address.street}`.toLowerCase();
      return (
        (!searchQuery || fullLocation.includes(searchQuery.toLowerCase())) &&
        (!bloodType || hospital.bloodTypes?.includes(bloodType))
      );
    });
    setFilteredHospitals(results);
  };

  const handleRequestChange = (e) => {
    const { name, value } = e.target;
    setRequest({ ...request, [name]: value });
  };

  const handleRequestSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/user/request-blood', {
        hospitalId: selectedHospital._id,
        bloodType: request.bloodType,
        quantity: request.quantity,
        reason: request.reason,
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log('Blood request successful:', response.data);
      setShowModal(false);
    } catch (error) {
      console.error('Error requesting blood:', error.response?.data || error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">Search and Request Blood</h2>

      {/* Search Filters */}
      <div className="space-y-4 p-4 bg-blue-100 rounded-lg shadow-md mb-6">
        <input
          type="text"
          placeholder="Search by city, state, or street"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="block w-full border border-gray-300 rounded-md p-3"
        />
        <select
          name="bloodType"
          value={bloodType}
          onChange={(e) => setBloodType(e.target.value)}
          className="block w-full border border-gray-300 rounded-md p-3"
        >
          <option value="">Select Blood Type</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>
        <button
          onClick={filterHospitals}
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md mt-2 hover:bg-blue-700 transition duration-200"
        >
          Search Hospitals
        </button>
      </div>

      {/* Hospital List */}
      <div className="bg-gray-100 rounded-lg shadow-lg p-4">
        <div className="grid grid-cols-4 font-semibold p-2 bg-blue-200 rounded-md text-gray-700">
          <span>Hospital Name</span>
          <span>City</span>
          <span>State, Street</span>
          <span>Action</span>
        </div>

        {filteredHospitals.length > 0 ? (
          filteredHospitals.map((hospital) => (
            <div
              key={hospital._id}
              className="grid grid-cols-4 items-center bg-white p-2 border-b last:border-b-0 text-gray-700 hover:bg-blue-50"
            >
              <span className="font-medium">{hospital.hospitalName}</span>
              <span>{hospital.address.city}</span>
              <span>{hospital.address.state}, {hospital.address.street}</span>
              <button
                onClick={() => { setSelectedHospital(hospital); setShowModal(true); }}
                className="bg-green-600 text-white font-semibold py-1 px-2 rounded-md hover:bg-green-700 transition duration-200"
              >
                View & Request
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 mt-4">No hospitals found.</p>
        )}
      </div>

      {/* Request Modal */}
      {showModal && selectedHospital && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-bold text-center mb-4">Request Blood at {selectedHospital.hospitalName}</h3>
            <form onSubmit={handleRequestSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Blood Type:</label>
                <select
                  name="bloodType"
                  value={request.bloodType}
                  onChange={handleRequestChange}
                  className="block w-full border border-gray-300 rounded-md p-2"
                  required
                >
                  <option value="">Select Blood Type</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Quantity (in units):</label>
                <input
                  type="number"
                  name="quantity"
                  value={request.quantity}
                  onChange={handleRequestChange}
                  className="block w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Reason for Request:</label>
                <textarea
                  name="reason"
                  value={request.reason}
                  onChange={handleRequestChange}
                  className="block w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white font-semibold py-3 rounded-md hover:bg-green-700 transition duration-200"
              >
                Submit Request
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="w-full bg-gray-500 text-white font-semibold py-3 rounded-md mt-2 hover:bg-gray-600 transition duration-200"
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

export default BloodRequestForm;
