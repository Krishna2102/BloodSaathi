import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Navbar from "./shared/Navbar";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("User");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // State to manage loading

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
  
    try {
      const response = await axios.post("http://localhost:3000/api/user/login", {
        email,
        password,
        role: userType,
      }, { withCredentials: true }); // Ensure you are sending credentials if needed
  
      console.log("Full response:", response); // Log the full response
  
      // Check if the token is available
      if (response.data && response.data.user && response.data.user.token) {
        localStorage.setItem("token", response.data.user.token);
        localStorage.setItem("role", userType);
        console.log("Token stored:", response.data.user.token); // Log the stored token
        window.location.href = "/"; // Redirect to home page
        setError(""); // Clear error state
      } else {
        setError("Token not received. Please try again.");
      }
    } catch (err) {
      // Handle error responses
      if (err.response) {
        console.error("Error response:", err.response.data); // Log error response
        setError(err.response.data.error || "An error occurred. Please try again.");
      } else {
        console.error("Network error:", err); // Log network error
        setError("Network error. Please check your connection.");
      }
    } finally {
      setLoading(false); // End loading state
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Navbar />
      <motion.div
        className="bg-white shadow-lg rounded-lg p-8 w-96"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl font-bold text-center mb-4">Sign In</h2>
        {error && (
          <motion.p
            className="text-red-500 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {error}
          </motion.p>
        )}
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <label className="block mb-1 text-sm font-semibold" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full border border-gray-300 rounded p-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </motion.div>

          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <label
              className="block mb-1 text-sm font-semibold"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full border border-gray-300 rounded p-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </motion.div>

          <motion.div
            className="flex justify-between mt-2"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <label>
              <input
                type="radio"
                name="userType"
                value="User"
                checked={userType === "User"}
                onChange={() => setUserType("User")}
              />{" "}
              User
            </label>
            <label>
              <input
                type="radio"
                name="userType"
                value="Hospital"
                checked={userType === "Hospital"}
                onChange={() => setUserType("Hospital")}
              />{" "}
              Hospital
            </label>
            <label>
              <input
                type="radio"
                name="userType"
                value="Admin"
                checked={userType === "Admin"}
                onChange={() => setUserType("Admin")}
              />{" "}
              Admin
            </label>
          </motion.div>

          <motion.button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading} // Disable button while loading
          >
            {loading ? 'Signing In...' : 'Sign In'} {/* Change button text based on loading state */}
          </motion.button>
        </motion.form>

        <motion.p
          className="text-center mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-500">
            Sign Up
          </a>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default SignIn;
