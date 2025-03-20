const express = require("express");
const Message = require("./messageModel"); // Ensure model is correct
const router = express.Router();

// ✅ Fetch all messages
router.get("/messages", async (req, res) => {
    try {
        const messages = await Message.find().sort({ timestamp: 1 });
        res.json(messages);
    } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// ✅ Post a message & get bot response
router.post("/messages", async (req, res) => {
    try {
        const { sender, receiver, text } = req.body;
        if (!sender || !receiver || !text) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const userMessage = new Message({ sender, receiver, text });
        await userMessage.save();

        res.json([userMessage]);
    } catch (error) {
        console.error("Error saving messages:", error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
