import { motion } from "framer-motion";

export default function FormContainer({ children, onSubmit }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex justify-center items-center min-h-screen mt-32"
    >
      <motion.form
        onSubmit={onSubmit}
        className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {children}
      </motion.form>
    </motion.div>
  );
}
