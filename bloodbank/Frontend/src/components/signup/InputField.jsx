import { motion } from "framer-motion";

export default function InputField({ label, name, type = "text", value, handleChange }) {
  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the first file
    handleChange({ target: { name, value: file } }); // Pass the file to the handleChange
  };

  return (
    <motion.div whileHover={{ scale: 1.05 }}>
      <label className="block text-sm font-medium mb-2" htmlFor={name}>
        {label}
      </label>
      {name === "gender" ? (
        <select
          name={name}
          value={value}
          onChange={handleChange}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Third">Third</option>
        </select>
      ) : name === "image" ? (
        <input
          type="file"
          name={name}
          onChange={handleFileChange}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      ) : name === "password" ? (
        <input
          type="password"
          name={name}
          value={value}
          onChange={handleChange}
          placeholder="Enter your password"
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      )
      : 
      (
        <input
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      )}
    </motion.div>
  );
}