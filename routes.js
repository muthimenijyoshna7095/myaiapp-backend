const express = require("express");
const router = express.Router();

router.post("/send", async (req, res) => {
    try {
        const { sender, text } = req.body;

        // 🧠 AI Response Logic
        let botResponse = "I don't understand!";
        const lowerText = text.toLowerCase();

        if (lowerText.includes("hi") || lowerText.includes("hello")) {
            botResponse = "How are you? 😊";
        } else if (lowerText.includes("bye")) {
            botResponse = "Goodbye! Have a great day! 👋";
        } else if (lowerText.includes("joke")) {
            const jokes = [
                "Why don't skeletons fight each other? They don’t have the guts! 😂",
                "I told my wife she should embrace her mistakes. She gave me a hug. 🤣",
                "Why do cows wear bells? Because their horns don’t work! 🐄🤣"
            ];
            botResponse = jokes[Math.floor(Math.random() * jokes.length)];
        } else {
            botResponse = "Hmm, I'm not sure how to respond to that. 🤔";
        }

        res.json([{ sender: "Bot", text: botResponse }]); // ✅ Return bot's message
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Something went wrong" });
    }
});

module.exports = router;
