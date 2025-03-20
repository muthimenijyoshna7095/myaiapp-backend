const express = require("express");
const router = express.Router();

router.post("/send", (req, res) => {
    const { sender, text } = req.body;

    if (!text) {
        return res.status(400).json({ error: "Message text is required" });
    }

    console.log("Received message:", req.body);

    // AI Response Simulation
    const botResponse = {
        sender: "Bot",
        receiver: sender,
        text: `You said: ${text}`, // Simple response
    };

    res.json([botResponse]);
});

module.exports = router;
