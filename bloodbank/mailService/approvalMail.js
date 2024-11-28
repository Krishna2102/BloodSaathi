const sendEmail = require("./mailer");

// Utility function to generate the email body
const generateApprovalEmail = (hospitalEmail, password) => {
    return `
        <h3>Your hospital registration has been approved</h3>
        <p><strong>Login Email:</strong> ${hospitalEmail}</p>
        <p><strong>Password:</strong> ${password}</p>
        <p>You can now login using the credentials above. Please change your password after logging in for the first time.</p>
    `;
};

const approveHospital = async (hospitalEmail, generatedPassword) => {
    console.log("Sending approval email...");
    try {
        // Create the email content
        const emailSubject = "Hospital Registration Approved";
        const emailBody = generateApprovalEmail(hospitalEmail, generatedPassword);

        // Send the approval email to the hospital
        await sendEmail(hospitalEmail, emailSubject, emailBody);

        console.log("Approval email sent successfully");

    } catch (err) {
        console.error("Error sending approval email: ", err);
        throw new Error("Email sending failed");
    }
};

module.exports = approveHospital;
