import "./App.css";
import { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseChart from "./components/ExpenseChart";
import AIInsights from "./components/AIInsights";

function App() {
  const [expenses, setExpenses] = useState([]);
    const [budget, setBudget] = useState(0);
    const [analysis, setAnalysis] = useState("");
const [loading, setLoading] = useState(false);

 useEffect(() => {
  fetch("http://localhost:5000/expenses")
    .then((res) => res.json())
    .then((data) => setExpenses(data));

  fetch("http://localhost:5000/budget")
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        setBudget(data.amount);
      }
    });
}, []);

  async function updateBudget() {
  try {
    const response = await fetch(
      "http://localhost:5000/budget",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: budget,
        }),
      }
    );

    const data = await response.json();

    setBudget(data.amount);

    alert("Budget updated successfully!");
  } catch (error) {
    console.log(error);
  }
}
async function analyzeExpenses() {
  try {
    setLoading(true);

    const response = await fetch(
      "http://localhost:5000/analyze",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          expenses,
          budget,
        }),
      }
    );

    const data = await response.json();

    setAnalysis(data.analysis);
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
}


  return (
    <>
      <Navbar />
      <Dashboard
  expenses={expenses}
  budget={budget}
  setBudget={setBudget}
  updateBudget={updateBudget}
/>


<ExpenseChart expenses={expenses} />
<AIInsights
  analysis={analysis}
  loading={loading}
  analyzeExpenses={analyzeExpenses}
/>

      <ExpenseForm
        expenses={expenses}
        setExpenses={setExpenses}
      />

    </>
  );
}

export default App;