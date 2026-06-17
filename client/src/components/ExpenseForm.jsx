import { useState } from "react";

function ExpenseForm({ expenses, setExpenses }) {
  const [expenseName, setName] = useState("");
  const [expenseAmount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [editId, setEditId] = useState(null);

  async function handleAddExpense() {
    if (
      expenseName.trim() === "" ||
      expenseAmount === ""
    ) {
      alert("Please fill all required fields");
      return;
    }

    try {
      if (editId === null) {
        const response = await fetch(
          "http://localhost:5000/expenses",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: expenseName,
              amount: Number(expenseAmount),
              category,
            }),
          }
        );

        const savedExpense = await response.json();

        setExpenses([...expenses, savedExpense]);
      } else {
        const response = await fetch(
          `http://localhost:5000/expenses/${editId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: expenseName,
              amount: Number(expenseAmount),
              category,
            }),
          }
        );

        const updatedExpense = await response.json();

        const updatedExpenses = expenses.map((expense) =>
          expense._id === editId
            ? updatedExpense
            : expense
        );

        setExpenses(updatedExpenses);
        setEditId(null);
      }

      setName("");
      setAmount("");
      setCategory("Food");
    } catch (error) {
      console.log(error);
    }
  }

  function handleEditExpense(expense) {
    setName(expense.title);
    setAmount(expense.amount);
    setCategory(expense.category);
    setEditId(expense._id);
  }

  async function handleDeleteExpense(id) {
    try {
      await fetch(
        `http://localhost:5000/expenses/${id}`,
        {
          method: "DELETE",
        }
      );

      const updatedExpenses = expenses.filter(
        (expense) => expense._id !== id
      );

      setExpenses(updatedExpenses);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h3>Add Expenses</h3>

      <input
        type="text"
        placeholder="Enter expense name"
        value={expenseName}
        onChange={(e) => setName(e.target.value)}
      />

      <br />

      <input
        type="number"
        placeholder="Enter amount"
        value={expenseAmount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="Food">Food</option>
        <option value="Shopping">Shopping</option>
        <option value="Travel">Travel</option>
        <option value="Bills">Bills</option>
      </select>

      <br />

      <button onClick={handleAddExpense}>
        {editId === null
          ? "Add Expense"
          : "Update Expense"}
      </button>

      <h3>Expenses</h3>

      {expenses.length === 0 ? (
        <p>No expenses added yet</p>
      ) : (
        expenses.map((expense) => (
          <div key={expense._id}>
            <p>
              {expense.title} - ₹{expense.amount} -{" "}
              {expense.category}
            </p>

            <button
              onClick={() =>
                handleEditExpense(expense)
              }
            >
              Edit
            </button>

            <button
              onClick={() =>
                handleDeleteExpense(expense._id)
              }
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default ExpenseForm;