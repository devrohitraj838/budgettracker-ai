const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("BudgetTracker Backend Running");
});

app.get("/expenses/:id", (req, res) => {
  const expenses = [
    { id: 1, title: "Pizza", amount: 300 },
    { id: 2, title: "Movie", amount: 500 },
  ];

  const expenseId = Number(req.params.id);

  const expense = expenses.find(
    item => item.id === expenseId
  );

  res.json(expense);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});