// server.js
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Contact form route
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: "All fields are required" });
  }

  // Later: Save to DB or send email here
  console.log("📩 New Contact Form Submission:", { name, email, message });

  res.json({ success: true, message: "Message received! We'll get back to you soon." });
});

// Resolve directory
const __dirnameResolved = path.resolve();

// Serve frontend static files
app.use(express.static(path.join(__dirnameResolved, "frontend", "dist")));

// Catch-all handler for SPA (no * or weird : issues)
app.use((req, res) => {
  res.sendFile(path.join(__dirnameResolved, "frontend", "dist", "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
