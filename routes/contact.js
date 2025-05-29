import express from "express";
import { sendEmail } from "../config/mailer.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { email, name, subject, message } = req.body;
        
        if (!email || !name || !subject || !message) {
            return res.status(400).json({ error: "All fields are required!" });
        }

        await sendEmail({ email, name, subject, message });

        res.status(200).json({ success: true, message: "Email sent successfully!" });
    } catch (error) {
        console.error("Email send error:", error);
        res.status(500).json({ error: "Failed to send email!" });
    }
});

export default router;
