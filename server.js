const cors = require("cors");
const express = require("express");

const app = express();

// ✅ Update CORS settings
app.use(cors({
    origin: "*", // Allow all origins (or use specific one like "http://localhost:3000")
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

// ✅ Test route to check if CORS works
app.get("/", (req, res) => {
    res.send("Backend is running! 🚀");
});

// ✅ Ensure correct routes are used
const routes = require("./routes");
app.use("/api", routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
