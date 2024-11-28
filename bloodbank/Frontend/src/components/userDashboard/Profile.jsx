import React, { useState,useEffect } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaUpload } from 'react-icons/fa';
import { GiBlood } from 'react-icons/gi';
import axios from 'axios';
const Profile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [image, setImage] = useState(null);

  const fetchProfile = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/user/profile',{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },

      });
      
      const { name, email, phoneNumber, bloodGroup } = response.data;
      setName(name);
      setEmail(email);
      setContact(phoneNumber);
      setBloodGroup(bloodGroup);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchProfile();
  }, []);
  
 

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    setImage(null);
  };

  const handleUpdateProfile =async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('http://localhost:3000/api/user/update',{
        name:name,
        email:email,
        phoneNumber:contact,
        bloodGroup:bloodGroup
      },{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
    console.log('Profile updated:', { name, email, contact, bloodGroup });
    setIsModalOpen(false);
  
  };

  return (
    <div className="flex flex-col items-center">
      {/* Container with image and profile info sections side by side */}
      <div className="flex max-w-4xl mt-10 p-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg shadow-lg border border-gray-200">
        
        {/* Image Section */}
        <div className="flex flex-col items-center p-4  rounded-lg  mr-8">
          <div className="w-32 h-32 rounded-full border-4 border-blue-500 flex items-center justify-center overflow-hidden">
            {image ? (
              <img src={image} alt="Uploaded" className="w-full h-full object-cover" />
            ) : (
              <span className="text-gray-400">No Image</span>
            )}
          </div>
          <label htmlFor="imageUpload" className="mt-4">
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <button
              onClick={() => document.getElementById('imageUpload').click()}
              className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
            >
              <FaUpload className="mr-2" />
              {image ? 'Change Profile Picture' : 'Upload Image'}
            </button>
          </label>
          {image && (
            <button
              onClick={handleImageRemove}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
            >
              Remove Profile Picture
            </button>
          )}
        </div>

        {/* Profile Information Section */}
        <div className="w-full">
          <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">Profile Information</h2>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <FaUser className="h-6 w-6 text-blue-600 mr-2" />
              <p className="text-gray-700 font-semibold">{name}</p>
            </div>
            <div className="flex items-center">
              <FaEnvelope className="h-6 w-6 text-blue-600 mr-2" />
              <p className="text-gray-700 font-semibold">{email}</p>
            </div>
            <div className="flex items-center">
              <FaPhone className="h-6 w-6 text-blue-600 mr-2" />
              <p className="text-gray-700 font-semibold">{contact}</p>
            </div>
            <div className="flex items-center">
              <GiBlood className="h-6 w-6 text-blue-600 mr-2" />
              <p className="text-gray-700 font-semibold">{bloodGroup}</p>
            </div>
          </div>

          {/* Button to open modal */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full mt-6 bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 shadow-md hover:shadow-lg"
          >
            Update Profile
          </button>
        </div>
      </div>

      {/* Modal for updating profile */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 max-w-md">
            <h3 className="text-2xl font-bold mb-4 text-center text-blue-800">Edit Profile</h3>
            <form onSubmit={handleUpdateProfile} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border border-gray-300 rounded-lg w-full py-2 px-4 focus:outline-none focus:ring focus:ring-blue-300 transition duration-200"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border border-gray-300 rounded-lg w-full py-2 px-4 focus:outline-none focus:ring focus:ring-blue-300 transition duration-200"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Contact Number</label>
                <input
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="border border-gray-300 rounded-lg w-full py-2 px-4 focus:outline-none focus:ring focus:ring-blue-300 transition duration-200"
                  required
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;