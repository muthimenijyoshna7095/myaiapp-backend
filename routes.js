const express = require("express");
const Message = require("./messageModel");

const router = express.Router();

// ✅ Improved bot responses
function getBotResponse(userMessage) {
    if (!userMessage) return "I'm here to chat! Ask me anything.";

    const message = userMessage.toLowerCase();  // ✅ Convert input to lowercase
    
    if (message.includes("hello") || message.includes("hi")) return "Hello! How are you?";
    if (message.includes("fine")) return "Let's rock the day, bro! 🎉";  // ✅ Fixed
    if (message.includes("how are you")) return "I'm just a bot, but I'm doing great! What about you?";
    if (message.includes("joke")) return "Why don’t skeletons fight each other? Because they don’t have the guts! 😂";
    if (message.includes("your name")) return "I'm ChatBot, your AI assistant! 🤖";
    if (message.includes("thanks")) return "It's okay! If you have any doubts, ask me! 👍";  // ✅ Fixed
    if (message.includes("bye")) return "Goodbye! Have a great day! 👋";

    return "I'm still learning! Can you ask me something else?";
}


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

        // ✅ Log the received data to verify if it's reaching the backend
        console.log("Received Message:", { sender, receiver, text });

        if (!sender || !receiver || !text) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // ✅ Save user message to MongoDB
        const userMessage = new Message({ sender, receiver, text });
        await userMessage.save();
        console.log("✅ User message saved to DB:", userMessage);

        // ✅ Generate bot response and save to MongoDB
        const botResponseText = getBotResponse(text);
        const botMessage = new Message({
            sender: "Bot",
            receiver: sender,
            text: botResponseText,
        });
        await botMessage.save();
        console.log("✅ Bot message saved to DB:", botMessage);

        res.json([userMessage, botMessage]);
    } catch (error) {
        console.error("❌ Error saving messages:", error);
        res.status(500).json({ error: "Server error" });
    }
});


module.exports = router;
