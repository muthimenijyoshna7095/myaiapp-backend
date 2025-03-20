const express = require("express");
const router = express.Router();

// ✅ Predefined bot responses
const botResponses = {
    "hi": "How are you?",
    "hello": "Hello! How can I assist you?",
    "how are you": "I'm just a bot, but I'm doing great!",
    "joke": "Why don't skeletons fight each other? Because they don't have the guts!",
    "bye": "Goodbye! Have a nice day!",
};

// ✅ Handle user messages
router.post("/send", (req, res) => {
    const userMessage = req.body.text.toLowerCase(); // Convert to lowercase for consistency

    // Check for predefined responses, otherwise echo back
    const botReply = botResponses[userMessage] || `You said: ${userMessage}`;

    res.json([
        { sender: "User", text: userMessage },
        { sender: "Bot", text: botReply }
    ]);
});

module.exports = router;
