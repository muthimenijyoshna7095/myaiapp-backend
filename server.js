const express = require("express");
const connectDB = require("./db");
const routes = require("./routes");
const cors = require("cors");
require("dotenv").config();

// ✅ Initialize Express
const app = express();

// ✅ Middleware for JSON & CORS
app.use(express.json());
app.use(cors({
    origin: "*", // Allow all origins (or specify your frontend URL)
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
}));

// ✅ Root Route (Fix "Cannot GET /" Issue)
app.get("/", (req, res) => {
    res.send("Backend is running! 🚀");
});

// ✅ Use Routes
app.use("/api", routes);

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
