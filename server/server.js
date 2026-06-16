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


app.get("/expenses", async (req, res) => {
  const expenses = await Expense.find();

  res.json(expenses);
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
app.get("/expenses/:id", async (req, res) => {
  const expense = await Expense.findById(req.params.id);

  res.json(expense);
});



app.put("/expenses/:id", async (req, res) => {
  const { title, amount } = req.body;

  if (!title || !amount) {
    return res.status(400).json({
      message: "Enter all required values",
    });
  }

  const expense = await Expense.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(expense);
});
app.delete("/expenses/:id", async (req, res) => {
  const expense = await Expense.findByIdAndDelete(req.params.id);

  res.json(expense);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});