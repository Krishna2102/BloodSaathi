const bcrypt = require('bcryptjs');

const password = 'test@123'; // Your original password

const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10); // Generate salt
        const hashedPassword = await bcrypt.hash(password, salt); // Hash the password
        console.log("Hashed Password:", hashedPassword); // Print the hashed password
    } catch (error) {
        console.error("Error hashing password:", error);
    }
};

// Call the function
hashPassword(password);
