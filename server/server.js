// ----------------------
// Load Environment Variables FIRST
// ----------------------
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// ----------------------
// Fetch Setup (Node <18 support)
// ----------------------
let fetch;
try {
  fetch = global.fetch || require("node-fetch");
} catch (err) {
  console.error("Install node-fetch for Node <18: npm install node-fetch@2");
  process.exit(1);
}

// ----------------------
// Import Routes
// ----------------------
const authRoutes = require("./routes/auth");
const contactRoutes = require("./routes/contact");

// ----------------------
// App Config
// ----------------------
const app = express();
const PORT = process.env.PORT || 5000;

// ----------------------
// Middleware
// ----------------------
app.use(
  cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
    credentials: true,
  })
);

app.use(express.json());

// ----------------------
// Routes
// ----------------------
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);

// ----------------------
// Chat Route (Gemini)
// ----------------------
app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  if (!process.env.GOOGLE_API_KEY) {
    return res.status(500).json({ error: "GOOGLE_API_KEY not set" });
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${process.env.GOOGLE_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: message }],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(500).json({
        error: "Gemini API failed",
        details: errorText,
      });
    }

    const data = await response.json();

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response from Gemini";

    res.json({ reply });
  } catch (error) {
    console.error("Chat API Error:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

// ----------------------
// MongoDB Connection
// ----------------------
const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI not found in .env");
    }

    console.log("Connecting to MongoDB...");
    console.log("Using URI:", process.env.MONGO_URI); // Debug line

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected successfully ✅");
  } catch (error) {
    console.error("MongoDB connection error ❌:", error.message);
    process.exit(1);
  }
};

connectDB();

// ----------------------
// Global Error Handler
// ----------------------
app.use((err, req, res, next) => {
  console.error("Global error:", err);
  res.status(500).json({
    error: "Something went wrong",
    details: err.message,
  });
});

// ----------------------
// Start Server
// ----------------------
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});