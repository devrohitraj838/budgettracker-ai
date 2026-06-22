import {
  FaUtensils,
  FaPlane,
  FaShoppingBag,
  FaFileInvoiceDollar
} from "react-icons/fa";

import { useState } from "react";
const API_URL =
  "https://budgettracker-ai-backend.onrender.com";

function ExpenseForm({ expenses, setExpenses }) {
  const [expenseName, setName] = useState("");
  const [expenseAmount, setAmount] = useState("");
  const [receiptImage, setReceiptImage] =
  useState(null);
  const [category, setCategory] = useState("Food");
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  async function handleScanReceipt() {
  if (!receiptImage) {
    alert("Please upload a receipt first");
    return;
  }

  const formData = new FormData();

  formData.append(
    "receipt",
    receiptImage
  );

  const response = await fetch(
    `${API_URL}/scan-receipt`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();

  setName(data.title || "");
setAmount(data.amount || "");
setCategory(data.category || "Food");
alert("✅ Receipt scanned successfully");
}

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
          `${API_URL}/expenses`,
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

setExpenses([savedExpense, ...expenses]);
      } else {
        const response = await fetch(
  `${API_URL}/expenses/${editId}`,
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
      const updatedExpenses = expenses.filter(
  (expense) => expense._id !== id
);

setExpenses(updatedExpenses);

await fetch(`${API_URL}/expenses/${id}`, {
  method: "DELETE",
});
    } catch (error) {
      console.log(error);
    }
  }
  const filteredExpenses = expenses.filter((expense) =>
  expense.title
    .toLowerCase()
    .includes(searchTerm.toLowerCase())
);
function getCategoryBadge(category) {
  switch (category) {
    case "Food":
      return (
        <span className="badge food">
          <FaUtensils /> Food
        </span>
      );

    case "Travel":
      return (
        <span className="badge travel">
          <FaPlane /> Travel
        </span>
      );

    case "Shopping":
      return (
        <span className="badge shopping">
          <FaShoppingBag /> Shopping
        </span>
      );

    case "Bills":
      return (
        <span className="badge bills">
          <FaFileInvoiceDollar /> Bills
        </span>
      );

    default:
      return category;
  }
}

  return (
    <div className="form-card">
      <h3>Add Expenses</h3>
<label className="camera-btn">
   📷 Add Receipt Image

 <input
  type="file"
  accept="image/*"
  hidden
  onChange={(e) =>
    setReceiptImage(e.target.files[0])
  }
/>
</label>

<button
  className="scan-btn"
  onClick={handleScanReceipt}
>
  ✨ Analyze Receipt
</button>
{receiptImage && (
  <p className="file-name">
    📄 {receiptImage.name}
  </p>
)}



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

      <input
  type="text"
  placeholder="🔍 Search expenses..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>

      <h3>Expenses</h3>

      {expenses.length === 0 ? (
        <p>No expenses added yet</p>
      ) : (
        filteredExpenses.map((expense) => (
          <div key={expense._id} className="expense-card">
            <div>
  <h3>{expense.title}</h3>

  <p>₹{expense.amount}</p>

  {getCategoryBadge(expense.category)}

  {expense.date && (
    <p>
      {new Date(expense.date).toLocaleDateString()}
    </p>
  )}
</div>

            <button
  className="edit-btn"
  onClick={() => handleEditExpense(expense)}
>
  Edit
</button>

<button
  className="delete-btn"
  onClick={() => handleDeleteExpense(expense._id)}
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