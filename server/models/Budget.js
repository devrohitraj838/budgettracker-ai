const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
});

const Budget = mongoose.model(
  "Budget",
  budgetSchema
);

module.exports = Budget;