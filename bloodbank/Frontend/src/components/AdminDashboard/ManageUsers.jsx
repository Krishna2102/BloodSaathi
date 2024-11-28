import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    country: '',
    state: '',
    district: '',
    pincode: '',
    gender: '',
    dob: '',
    bloodGroup: '',
    image: ''
  });
  
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [nameSearchQuery, setNameSearchQuery] = useState('');
  const [bloodGroupSearchQuery, setbloodGroupSearchQuery] = useState('');

  const user = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/admin/user', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    user();
   
  }, []);

  const handleDelete = (id) => {
    console.log(id);
    // Delete user from backend
      axios.delete(`http://localhost:3000/api/admin/user/${id}`,{
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      })
      .then(() => {
        // Update frontend state
        setUsers(users.filter((user) => user.id !== id));
        user();
      })
      .catch((error) => console.error("Error deleting user:", error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    
    // Set the formData with current user data for editing
    setFormData({ 
      name: user.name, 
      email: user.email, 
      bloodGroup: user.bloodGroup, 
      address: user.address 
    });
  
    setIsEditModalOpen(true);
  };
 
  const handleSaveEdit = async () => {
    try {
      const updatedData = {};
  
      // Compare formData with selectedUser and add only changed fields to updatedData
      Object.keys(formData).forEach(key => {
        if (formData[key] !== selectedUser[key]) {
          updatedData[key] = formData[key];
        }
      });
  
      // Backend update if there are any changes
      if (Object.keys(updatedData).length > 0) {
        await axios.put(`http://localhost:3000/api/admin/user/update/${selectedUser._id}`, updatedData, {
          headers: { 'Authorization':`Bearer ${localStorage.getItem('token')}` }
        });
      }
  
      // Update users list locally
      setUsers(users.map(user => 
        user._id === selectedUser._id ? { ...user, ...updatedData } : user
      ));
  
      // Close the modal and reset form data
      setIsEditModalOpen(false);
      setSelectedUser(null);
      setFormData({ name: '', email: '', bloodGroup: '', address: '' });
      
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };
  
 
  const handleAddUser = () => {
    const newUser = { id: users.length + 1, ...formData };
    setUsers([...users, newUser]);
    
    try{
        axios.post('http://localhost:3000/api/admin/user/create', formData, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });

    }
    catch(err){
      console.log(err);
    };

    setIsAddModalOpen(false);
    setFormData({
      name: '', email: '', password: '', phoneNumber: '', country: '', state: '',
      district: '', pincode: '', gender: '', dob: '', bloodGroup: '', image: ''
    });
  };

  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setIsViewModalOpen(true);
  };

  const isFormValid = () => {
    return Object.values(formData).every(value => value.trim() !== '');
  };

  const filteredUsers = users.filter(user =>
    user.name?.toLowerCase().includes(nameSearchQuery.toLowerCase()) &&
    user.bloodGroup?.toLowerCase().includes(bloodGroupSearchQuery.toLowerCase())
  );
  

  return (
    <div className="p-6 bg-gradient-to-r from-red-500 to-red-300 mt-12 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center">Manage Users</h2>

      <div className="flex flex-col sm:flex-row justify-between mb-6 gap-4">
        <input
          type="text"
          placeholder="Search by name"
          value={nameSearchQuery}
          onChange={(e) => setNameSearchQuery(e.target.value)}
          className="block w-full sm:w-1/2 border border-gray-300 rounded-lg shadow-md py-2 px-4 focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          placeholder="Search by bloodGroup"
          value={bloodGroupSearchQuery}
          onChange={(e) => setbloodGroupSearchQuery(e.target.value)}
          className="block w-full sm:w-1/2 border border-gray-300 rounded-lg shadow-md py-2 px-4 focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map(user => (
          
          <motion.div 
            key={user._id} 
            className="hospital-card bg-gradient-to-r from-red-100 to-red-200 rounded-lg p-4 shadow-md"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <h3 className="text-xl font-semibold mb-2">{user.name}</h3>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>bloodGroup:</strong> {user.bloodGroup}</p>
            <div className="mt-4">
              <button onClick={() => handleViewDetails(user)} className="bg-blue-500 text-white py-1 px-4 rounded-md mr-2 hover:bg-blue-600 transition">View</button>
              <button  onClick={() => handleEditClick(user)} className="bg-yellow-500 text-white py-1 px-4 rounded-md mr-2 hover:bg-yellow-600 transition">Edit</button>
              <button onClick={() => handleDelete(user._id)} className="bg-red-500 text-white py-1 px-4 rounded-md hover:bg-red-600 transition">Delete</button>
            </div>
          </motion.div>
        ))}
      </div>

      <button
        onClick={() => setIsAddModalOpen(true)}
        className="mt-6 bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition block mx-auto"
      >
        Add New User
      </button>

      {/* Add User Modal */}
      {isAddModalOpen && (
       <div className="fixed mt-12 inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
         <h3 className="text-lg font-bold mb-6 text-center">Add New User</h3>
     
         {/* Form Fields */}
         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
           <div className="col-span-2 sm:col-span-1">
             <label className="block text-sm font-medium text-gray-700">Name</label>
             <input
               type="text"
               name="name"
               value={formData.name}
               onChange={handleInputChange}
               required
               className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
             />
           </div>
     
           <div className="col-span-2 sm:col-span-1">
             <label className="block text-sm font-medium text-gray-700">Email</label>
             <input
               type="email"
               name="email"
               value={formData.email}
               onChange={handleInputChange}
               required
               className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
             />
           </div>
     
           <div className="col-span-2 sm:col-span-1">
             <label className="block text-sm font-medium text-gray-700">Password</label>
             <input
               type="password"
               name="password"
               value={formData.password}
               onChange={handleInputChange}
               required
               className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
             />
           </div>
     
           <div className="col-span-2 sm:col-span-1">
             <label className="block text-sm font-medium text-gray-700">Phone Number</label>
             <input
               type="text"
               name="phoneNumber"
               value={formData.phoneNumber}
               onChange={handleInputChange}
               required
               className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
             />
           </div>
     
           <div className="col-span-2">
             <label className="block text-sm font-medium text-gray-700">Address</label>
             <input
               type="text"
               name="address"
               value={formData.address}
               onChange={handleInputChange}
               required
               className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
             />
           </div>
     
           <div className="col-span-2 sm:col-span-1">
             <label className="block text-sm font-medium text-gray-700">Country</label>
             <input
               type="text"
               name="country"
               value={formData.country}
               onChange={handleInputChange}
               required
               className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
             />
           </div>
     
           <div className="col-span-2 sm:col-span-1">
             <label className="block text-sm font-medium text-gray-700">State</label>
             <input
               type="text"
               name="state"
               value={formData.state}
               onChange={handleInputChange}
               required
               className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
             />
           </div>
     
           <div className="col-span-2 sm:col-span-1">
             <label className="block text-sm font-medium text-gray-700">District</label>
             <input
               type="text"
               name="district"
               value={formData.district}
               onChange={handleInputChange}
               required
               className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
             />
           </div>
     
           <div className="col-span-2 sm:col-span-1">
             <label className="block text-sm font-medium text-gray-700">Pincode</label>
             <input
               type="text"
               name="pincode"
               value={formData.pincode}
               onChange={handleInputChange}
               required
               className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
             />
           </div>
     
           <div className="col-span-2 sm:col-span-1">
             <label className="block text-sm font-medium text-gray-700">Gender</label>
             <input
               type="text"
               name="gender"
               value={formData.gender}
               onChange={handleInputChange}
               required
               className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
             />
           </div>
     
           <div className="col-span-2 sm:col-span-1">
             <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
             <input
               type="date"
               name="dob"
               value={formData.dob}
               onChange={handleInputChange}
               required
               className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
             />
           </div>
     
           <div className="col-span-2 sm:col-span-1">
             <label className="block text-sm font-medium text-gray-700">Blood Group</label>
             <input
               type="text"
               name="bloodGroup"
               value={formData.bloodGroup}
               onChange={handleInputChange}
               required
               className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
             />
           </div>
     
           <div className="col-span-2 sm:col-span-1">
             <label className="block text-sm font-medium text-gray-700">Image URL (Optional)</label>
             <input
               type="text"
               name="image"
               value={formData.image}
               onChange={handleInputChange}
               className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
             />
           </div>
         </div>
     
         {/* Buttons */}
         <div className="flex justify-end mt-6">
           <button
             onClick={handleAddUser}
             disabled={!isFormValid()}
             className={`bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200 ${!isFormValid() && 'opacity-50 cursor-not-allowed'}`}
           >
             Add User
           </button>
           <button
             onClick={() => setIsAddModalOpen(false)}
             className="ml-4 bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400 transition"
           >
             Cancel
           </button>
         </div>
       </div>
     </div>
      )} 
      {/* Edit User Modal */}
      {isEditModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Edit User</h3>
            {/* Form Fields */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">bloodGroup</label>
              <input
                type="text"
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleSaveEdit}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="ml-4 bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {/* view model */}
      {isViewModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">User Details</h3>
            <p><strong>Name:</strong> {selectedUser.name}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>bloodGroup:</strong> {selectedUser.bloodGroup}</p>
            <p><strong>Age:</strong> {(() => {
  const dob = new Date(selectedUser.dob);
  const now = new Date();
  let age = now.getFullYear() - dob.getFullYear();
  const monthDiff = now.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < dob.getDate())) {
    age--;
  }
  return age;
})()}</p>
            <p><strong>Address:</strong> {selectedUser.address}</p>

            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
