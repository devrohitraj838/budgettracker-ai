const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("BudgetTracker Backend Running");
});

app.get("/expenses", (req, res) => {
  const expenses = [
    { id: 1, title: "Pizza", amount: 300 },
    { id: 2, title: "Movie", amount: 500 },
  ];

  res.json(expenses);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});