require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Path to db.json
const dbFilePath = path.join(__dirname, "db.json");

// Load database
let data = {};
try {
  data = JSON.parse(fs.readFileSync(dbFilePath, "utf-8"));
} catch (error) {
  console.error("Error reading db.json:", error);
  data = { items: [], favorities: [], playlist: [] }; // Default empty values
}

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the "public" folder
app.use("/public", express.static(path.join(__dirname, "../public")));

// ✅ Get all songs
app.get("/items", (req, res) => {
  res.json(data.items);
});

// ✅ Get favorites
app.get("/favorities", (req, res) => {
  res.json(data.favorities);
});

// ✅ Get playlist
app.get("/playlist", (req, res) => {
  res.json(data.playlist);
});

// ✅ Add to favorites
app.post("/favorities", (req, res) => {
  data.favorities.push(req.body);
  fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2));
  console.log("Added to favorites:", req.body);
  res.json({ message: "Added to favorites!" });
});

// ✅ Remove from favorites
app.delete("/favorities/:id", (req, res) => {
  data.favorities = data.favorities.filter(item => item.id !== parseInt(req.params.id));
  fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2));
  console.log("Removed from favorites:", req.params.id);
  res.json({ message: "Removed from favorites!" });
});

// ✅ Add to playlist
app.post("/playlist", (req, res) => {
  data.playlist.push(req.body);
  fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2));
  console.log("Added to playlist:", req.body);
  res.json({ message: "Added to playlist!" });
});

// ✅ Remove from playlist
app.delete("/playlist/:id", (req, res) => {
  data.playlist = data.playlist.filter(item => item.id !== parseInt(req.params.id));
  fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2));
  console.log("Removed from playlist:", req.params.id);
  res.json({ message: "Removed from playlist!" });
});

// ✅ Serve Songs & Images Correctly
app.get("/Songs/:filename", (req, res) => {
  const filePath = path.join(__dirname, "../public/Songs", req.params.filename);
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({ message: "Song not found!" });
  }
});

app.get("/picture/:filename", (req, res) => {
  const filePath = path.join(__dirname, "../public/picture", req.params.filename);
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({ message: "Image not found!" });
  }
});

// ✅ Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
