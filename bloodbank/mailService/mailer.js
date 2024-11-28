require('dotenv').config(); // To load environment variables
const nodemailer = require('nodemailer');

// Configure the transporter using your email provider (e.g., Gmail)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS  // Your email password (use app password for Gmail)
    }
});

// Function to send approval or denial email
const sendEmail = (recipientEmail, subject, htmlContent) => {
    const mailOptions = {
        from: process.env.EMAIL_USER, // sender's email address
        to: recipientEmail,           // receiver's email address
        subject: subject,             // Subject line
        html: htmlContent             // HTML body content
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Error sending email: ", error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

module.exports = sendEmail;
