const Expense = require("./models/Expense");
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
console.log("Trying to connect to MongoDB...");
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");
  })
  .catch((error) => {
    console.log(error);
  });

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("BudgetTracker Backend Running");
});
app.post("/expenses", async (req, res) => {
  const { title, amount } = req.body;

  if (!title || !amount) {
    return res.status(400).json({
      message: "Title and amount are required",
    });
  }

  const expense = await Expense.create(req.body);

  res.status(201).json(expense);
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
app.put("/expenses/:id", (req, res) => {
  const expenseId = Number(req.params.id);

  const { title, amount } = req.body;

  if (!title || !amount) {
    return res.status(400).json({
      message: "Enter all required values",
    });
  }

  res.json({
    id: expenseId,
    title,
    amount,
  });
});
app.delete("/expenses/:id", (req, res) => {
  const expenseId = Number(req.params.id);

  res.json({
    message: `Expense ${expenseId} deleted`,
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});