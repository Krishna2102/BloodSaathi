const sendEmail = require('./mailer'); // Import the mailer function

const denyHospital = async (req, res) => {
    try {
        const hospital = await Hospital.findById(req.params.id);

        if (!hospital) {
            return res.status(404).json({ error: "Hospital not found" });
        }

        // Extract the reason for denial from the request
        const { denialReason } = req.body;

        if (!denialReason) {
            return res.status(400).json({ error: "Denial reason is required" });
        }

        // Deny the hospital
        hospital.isApproved = false;
        await hospital.save();

        // Email content for denial
        const emailSubject = "Hospital Registration Denied";
        const emailBody = `
            <h3>Your hospital registration has been denied</h3>
            <p>Unfortunately, we were unable to approve your hospital's registration for the following reason(s):</p>
            <p><strong>Reason:</strong> ${denialReason}</p>
            <p>Please review the issue and try to register again.</p>
        `;

        // Send the denial email to the hospital's email address
        sendEmail(hospital.email, emailSubject, emailBody);

        res.status(200).json({ message: "Hospital denied and email sent" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = denyHospital;