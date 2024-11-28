import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import FormContainer from "./FormContainer";
import InputField from "./InputField";
import SubmitButton from "./SubmitButton";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

export default function Signup() {
  const [userType, setUserType] = useState("hospital"); // Default to hospital
  const [hospitalData, setHospitalData] = useState({
    hospitalName: "",
    address: { street: "", city: "", state: "", postalCode: "" },
    email: "",
    approvalStatus: "Pending",
    isApproved: false,
    contactNumber: "",
  });

  const [userData, setUserData] = useState({
    name: "",
    address: "",
    country: "",
    state: "",
    district: "",
    pincode: "",
    phoneNumber: "",
    email: "",
    gender: "",
    dob: "",
    bloodGroup: "",
    image: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  const handleHospitalChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      const fieldName = name.split(".")[1];
      setHospitalData((prevData) => ({
        ...prevData,
        address: { ...prevData.address, [fieldName]: value },
      }));
    } else {
      setHospitalData({ ...hospitalData, [name]: value });
    }
  };

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSubmit = userType === "hospital" ? hospitalData : userData;
    const endpoint = userType === "hospital" ? '/hospital/register' : '/user/register';

    try {
      const response = await axios.post(`http://localhost:3000/api${endpoint}`, dataToSubmit, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      // Check if the response is successful before redirecting
      if (response.status === 200) {
        // alert(response.data.message); // Show success message
        navigate('/signin'); // Redirect to /signin
      }
    } catch (error) {
      // Handle errors accordingly
      if (error.response) {
        // The request was made and the server responded with a status code
        alert("Signup failed: " + (error.response.data.message || "Please try again."));
      } else if (error.request) {
        // The request was made but no response was received
        alert("No response from server. Please try again.");
      } else {
        // Something happened in setting up the request
        alert("Something went wrong. Please try again.");
      }
    }
  };




  return (
    <div>
      <Navbar />
      <FormContainer onSubmit={handleSubmit}>
        {/* User type selection */}
        <div className="flex mb-4">
          <label>
            <input
              type="radio"
              value="hospital"
              checked={userType === "hospital"}
              onChange={handleUserTypeChange}
            />
            Hospital
          </label>
          <label className="ml-4">
            <input
              type="radio"
              value="user"
              checked={userType === "user"}
              onChange={handleUserTypeChange}
            />
            User
          </label>
        </div>

        {/* Conditional Rendering based on userType */}
        {userType === "hospital" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <InputField label="Hospital Name" name="hospitalName" value={hospitalData.hospitalName} handleChange={handleHospitalChange} />
            <InputField label="Street" name="address.street" value={hospitalData.address.street} handleChange={handleHospitalChange} />
            <InputField label="City" name="address.city" value={hospitalData.address.city} handleChange={handleHospitalChange} />
            <InputField label="State" name="address.state" value={hospitalData.address.state} handleChange={handleHospitalChange} />
            <InputField label="Postal Code" name="address.postalCode" value={hospitalData.address.postalCode} handleChange={handleHospitalChange} />
            <InputField label="Email" name="email" type="email" value={hospitalData.email} handleChange={handleHospitalChange} />
            <InputField label="Contact Number" name="contactNumber" type="tel" value={hospitalData.contactNumber} handleChange={handleHospitalChange} />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <InputField label="Name" name="name" value={userData.name} handleChange={handleUserChange} />
          <InputField label="Address" name="address" value={userData.address} handleChange={handleUserChange} />
          <InputField label="Country" name="country" value={userData.country} handleChange={handleUserChange} />
          <InputField label="State" name="state" value={userData.state} handleChange={handleUserChange} />
          <InputField label="District" name="district" value={userData.district} handleChange={handleUserChange} />
          <InputField label="Pincode" name="pincode" value={userData.pincode} handleChange={handleUserChange} />
          <InputField label="Phone Number" name="phoneNumber" type="tel" value={userData.phoneNumber} handleChange={handleUserChange} />
          <InputField label="Email" name="email" type="email" value={userData.email} handleChange={handleUserChange} />
          <InputField label="Gender" name="gender" value={userData.gender} handleChange={handleUserChange} />
          <InputField label="Date of Birth" name="dob" type="date" value={userData.dob} handleChange={handleUserChange} />
          <InputField label="Blood Group" name="bloodGroup" value={userData.bloodGroup} handleChange={handleUserChange} />
          <InputField label="Image" name="image" handleChange={handleUserChange} /> {/* Updated label */}
          <InputField label="Password" name="password" type="password" value={userData.password} handleChange={handleUserChange} />
        </div>
        )}
        
        <SubmitButton label="Sign Up" />
        <div className="mt-4 text-center">
          Already have an account? <Link to="/login" className="text-blue-500">Log in</Link>
        </div>
      </FormContainer>
      <Footer />
    </div>
  );
}
