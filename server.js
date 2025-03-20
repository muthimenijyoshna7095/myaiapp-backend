const express = require("express");
const connectDB = require("./db");
const routes = require("./routes"); // Import routes
const cors = require("cors");
require("dotenv").config();

// Initialize Express
const app = express();

// ✅ Middleware
app.use(express.json());
app.use(cors());

// ✅ Connect to Database
connectDB();

// ✅ Test Root Route
app.get("/", (req, res) => {
    res.send("Backend is running! 🚀");
});

// ✅ Use Routes (Ensure Correct Path)
app.use("/api", routes);

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
