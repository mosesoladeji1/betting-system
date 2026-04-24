const express = require("express");

const app = express();
const PORT = 5000;

// Allow JSON
app.use(express.json());

// CORS (allow frontend)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

// Root route
app.get("/", (req, res) => {
  res.send("Backend running in Docker 🚀");
});

// Sample data
let tips = [
  {
    type: "Double",
    games: [
      { match: "Arsenal vs Chelsea", tip: "GG", odds: 1.85 },
      { match: "Madrid vs Barca", tip: "Over 2.5", odds: 1.72 }
    ],
    totalOdds: 3.18,
    result: "WIN"
  },
  {
    type: "Single",
    games: [
      { match: "Man City vs Liverpool", tip: "Over 3.5", odds: 2.1 }
    ],
    totalOdds: 2.1,
    result: "LOSS"
  }
];

// GET tips
app.get("/tips", (req, res) => {
  res.json(tips);
});

// POST new tip
app.post("/tips", (req, res) => {
  tips.push(req.body);
  res.json({ message: "Tip added successfully" });
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

