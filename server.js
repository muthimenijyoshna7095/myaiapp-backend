const express = require("express");
const connectDB = require("./db");
const routes = require("./routes");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ Fix CORS
app.use(cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

// ✅ Connect to MongoDB
connectDB();

// ✅ Default route to check if backend is live
app.get("/", (req, res) => {
    res.send("Backend is running! 🚀");
});

// ✅ Correct API route path
app.use("/api", routes);

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
