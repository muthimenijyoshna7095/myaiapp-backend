const cors = require("cors");
const express = require("express");

const app = express();

// ✅ CORS settings
app.use(cors({
    origin: "*", // Allow all origins (Change to "http://localhost:3000" for security)
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

// ✅ Root route to check if backend is running
app.get("/", (req, res) => {
    res.send("Backend is running! 🚀");
});

// ✅ Import and use routes
const routes = require("./routes");
app.use("/api", routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
