import { motion } from "framer-motion";

export default function SubmitButton({ label }) {
  return (
    <motion.button
      type="submit"
      className="bg-blue-500 text-white p-2 rounded w-full mt-4 hover:bg-blue-600"
      whileHover={{ scale: 1.05 }}
    >
      {label}
    </motion.button>
  );
}
