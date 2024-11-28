import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const ManageHospitals = () => {
  // const [hospitals, setHospitals] = useState([
  //   { id: 1, name: 'City Hospital', location: 'Downtown', contact: '1234567890', established: '2005', services: 'Emergency, Surgery, Pediatrics' },
  //   { id: 2, name: 'General Hospital', location: 'Uptown', contact: '0987654321', established: '2010', services: 'General Medicine, Cardiology, Neurology' },
  // ]);
  const [hospitals, setHospitals] = useState([]);

  const [selectedHospital, setSelectedHospital] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    hospitalName: "",
    address: {
        street: "",
        city: "",
        state: "",
        postalCode: ""
    },
    email: "",
    approvalStatus: "Pending", // Default value
    isApproved: false,          // Default value
    contactNumber: "",
    password: "",               // Optional field
    token: "",                  // Optional field
    role: "Hospital"           // Default value
});
  const [searchQuery, setSearchQuery] = useState('');
  
  const Hospital = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/admin/hospital', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
     
      setHospitals(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    Hospital();
   
  }, []);
  const handleDelete = (id) => {
    setHospitals(hospitals.filter(hospital => hospital.id !== id));
  };

  const handleEditClick = (hospital) => {
    setSelectedHospital(hospital);
    setFormData({ name: hospital.name, location: hospital.location, contact: hospital.contact });
    setIsEditModalOpen(true);
  };

  const handleViewDetailsClick = (hospital) => {
    
    setSelectedHospital(hospital);
    setIsDetailsModalOpen(true);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Check if the input is for an address field
    if (name.startsWith('address.')) {
        const addressField = name.split('.')[1]; // Extract the specific address field (street, city, state, postalCode)
        setFormData((prev) => ({
            ...prev,
            address: {
                ...prev.address,
                [addressField]: value // Update the specific address field
            }
        }));
    } else {
        // For all other fields
        setFormData((prev) => ({ ...prev, [name]: value }));
    }
};
  const handleSave = () => {
    setHospitals(hospitals.map(hospital => 
      hospital.id === selectedHospital.id ? { ...hospital, ...formData } : hospital
    ));
    setIsEditModalOpen(false);
    setSelectedHospital(null);
  };

  const handleAddHospital = () => {
    const newHospital = {
      id: hospitals.length + 1,
      ...formData,
      established: '2024',
      services: 'General Services',
    };
    setHospitals([...hospitals, newHospital]);
    
      try {
        axios.post('http://localhost:3000/api/admin/hospital/create', formData, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
      }
        catch(err){
          console.log(err);
        }
    
    setIsAddModalOpen(false);
    setFormData({
      hospitalName: "",
      address: {
          street: "",
          city: "",
          state: "",
          postalCode: ""
      },
      email: "",
      approvalStatus: "Pending",
      isApproved: false,
      contactNumber: "",
      password: "",
      token: "",
      role: "Hospital"
      
    });
  };

  const isFormValid = formData.hospitalName && formData.address.street && formData.address.city && formData.address.state && formData.address.postalCode && formData.email && formData.contactNumber;
  const isFormEditValid = formData.hospitalName  && formData.contactNumber && formData.address.street  && formData.address.city && formData.address.state && formData.address.postalCode && formData.email;

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('address.')) {
        const field = name.split('.')[1];
        setFormData(prevData => ({
            ...prevData,
            address: {
                ...prevData.address,
                [field]: value,
            },
        }));
    } else {
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    }
};


  const filteredHospitals = hospitals.filter(hospital =>
    hospital.hospitalName?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  console.log(filteredHospitals);


  return (
    <div className="p-6 mt-16 bg-gradient-to-r from-red-500 to-red-300 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Manage Hospitals</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Hospital Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 p-2 w-full"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredHospitals.map(hospital => (
          <motion.div 
          key={hospital.id} 
          className="hospital-card bg-gradient-to-r from-red-100 to-red-200 rounded-lg p-4 shadow-md"
          whileHover={{ scale: 1.05 }} // Scale on hover
          transition={{ type: 'spring', stiffness: 300 }}
        >
            <h3 className="text-lg font-semibold">{hospital.hospitalName}</h3>
            <p><strong>Location:</strong> {hospital.address.city}</p>
            <p><strong>Contact:</strong> {hospital.email}</p>
            <div className="mt-4">
              <button 
                onClick={() => handleViewDetailsClick(hospital)} 
                className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition duration-200 mr-2"
              >
                View Details
              </button>
              <button 
                onClick={() => handleEditClick(hospital)} 
                className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 transition duration-200 mr-2"
              >
                Edit
              </button>
              <button 
                onClick={() => handleDelete(hospital.id)} 
                className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition duration-200"
              >
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <button 
        onClick={() => setIsAddModalOpen(true)} 
        className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200"
      >
        Add New Hospital
      </button>

      {/* Add Hospital Modal */}
      {isAddModalOpen && (
  <motion.div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center" 
    initial={{ opacity: 0 }} 
    animate={{ opacity: 1 }} 
    exit={{ opacity: 0 }}>
    
    <motion.div className="bg-white p-6 rounded-lg shadow-lg w-96" 
      initial={{ scale: 0 }} 
      animate={{ scale: 1 }} 
      exit={{ scale: 0 }}>
      
      <h3 className="text-lg font-bold mb-4">Add New Hospital</h3>
      
      {/* Hospital Name */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Hospital Name</label>
        <input
          type="text"
          name="hospitalName"
          value={formData.hospitalName}
          onChange={handleInputChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          required
        />
      </div>
      
      {/* Address */}
      <h4 className="text-md font-semibold mb-2">Address</h4>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Street</label>
        <input
          type="text"
          name="address.street"
          value={formData.address.street}
          onChange={handleInputChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">City</label>
        <input
          type="text"
          name="address.city"
          value={formData.address.city}
          onChange={handleInputChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">State</label>
        <input
          type="text"
          name="address.state"
          value={formData.address.state}
          onChange={handleInputChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Postal Code</label>
        <input
          type="text"
          name="address.postalCode"
          value={formData.address.postalCode}
          onChange={handleInputChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          required
        />
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          required
        />
      </div>

      {/* Contact Number */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Contact Number</label>
        <input
          type="text"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleInputChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
        />
      </div>
      {/* Buttons */}
      <div className="flex justify-end">
        <button 
          onClick={handleAddHospital} 
          className={`py-1 px-3 rounded ${isFormValid ? 'bg-green-500 text-white hover:bg-green-600 transition duration-200' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`}
          disabled={!isFormValid}
        >
          Add
        </button>
        <button 
          onClick={() => setIsAddModalOpen(false)} 
          className="bg-gray-300 text-black py-1 px-3 rounded hover:bg-gray-400 transition duration-200 ml-2"
        >
          Cancel
        </button>
      </div>
    </motion.div>
  </motion.div>
)}

      {/* Edit Modal */}
    {isEditModalOpen && (
    <motion.div
        className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
    >
        <motion.div
            className="bg-white p-6 rounded-lg shadow-lg w-96"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
        >
            <h3 className="text-lg font-bold mb-4">Edit Hospital Details</h3>
            
            {/* Name Input */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                    type="text"
                    name="hospitalName" // Change this if needed
                    value={formData.hospitalName}
                    onChange={ handleEditChange }
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                />
            </div>

            {/* Street Input */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Street</label>
                <input
                    type="text"
                    name="address.street"
                    value={formData.address.street}
                    onChange={ handleEditChange }
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                    required
                />
            </div>

            {/* City Input */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">City</label>
                <input
                    type="text"
                    name="address.city"
                    value={formData.address.city}
                    onChange={ handleEditChange }
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                    required
                />
            </div>

            {/* State Input */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">State</label>
                <input
                    type="text"
                    name="address.state"
                    value={formData.address.state}
                    onChange={ handleEditChange }
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                    required
                />
            </div>

            {/* Postal Code Input */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Postal Code</label>
                <input
                    type="text"
                    name="address.postalCode"
                    value={formData.address.postalCode}
                    onChange={ handleEditChange }
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                    required
                />
            </div>

            {/* Contact Number Input */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Contact Number</label>
                <input
                    type="text"
                    name="contactNumber" // Change this if needed
                    value={formData.contactNumber}
                    onChange={ handleEditChange }
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                />
            </div>

            {/* Email Input */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    type="email"
                    name="email" // Change this if needed
                    value={formData.email}
                    onChange={ handleEditChange }
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                    required
                />
            </div>

            {/* Buttons */}
            <div className="flex justify-end">
                <button
                    onClick={handleSave}
                    className={`py-1 px-3 rounded ${
                        isFormEditValid
                            ? "bg-green-500 text-white hover:bg-green-600 transition duration-200"
                            : "bg-gray-300 text-gray-600 cursor-not-allowed"
                    }`}
                    disabled={!isFormEditValid}
                >
                    Save
                </button>
                <button
                    onClick={() => setIsEditModalOpen(false)}
                    className="bg-gray-300 text-black py-1 px-3 rounded hover:bg-gray-400 transition duration-200 ml-2"
                >
                    Cancel
                </button>
            </div>
        </motion.div>
    </motion.div>
)}

      {/* Details Modal */}
      {isDetailsModalOpen && selectedHospital && (
        <motion.div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div className="bg-white p-6 rounded-lg shadow-lg w-96" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
            <h3 className="text-lg font-bold mb-4">Hospital Details</h3>
            <p><strong>Name:</strong> {selectedHospital.hospitalName}</p>
            <p><strong>Location:</strong> {selectedHospital.address.city}</p>
            <p><strong>Contact:</strong> {selectedHospital.contactNumber}</p>
            <p><strong>Email:</strong> {selectedHospital.email}</p>
            
            <div className="flex justify-end mt-4">
              <button 
                onClick={() => setIsDetailsModalOpen(false)} 
                className="bg-gray-300 text-black py-1 px-3 rounded hover:bg-gray-400 transition duration-200"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default ManageHospitals;
