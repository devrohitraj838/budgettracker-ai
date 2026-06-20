import "./App.css";
import { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseChart from "./components/ExpenseChart";
import AIInsights from "./components/AIInsights";
const API_URL =
  "https://budgettracker-ai-backend.onrender.com";

function App() {
  const [expenses, setExpenses] = useState([]);
    const [budget, setBudget] = useState(0);
    const [analysis, setAnalysis] = useState("");
const [loading, setLoading] = useState(false);

 useEffect(() => {
  fetch(`${API_URL}/expenses`)
  .then((res) => res.json())
  .then((data) => setExpenses(data.reverse()));
  fetch(`${API_URL}/budget`)
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
      `${API_URL}/budget`,
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

    
  } catch (error) {
    console.log(error);
  }
}
async function analyzeExpenses() {
  try {
    setLoading(true);

    const response = await fetch(
  `${API_URL}/analyze`,
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

console.log("Response:", response);

const data = await response.json();

console.log("Data:", data);

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





      <ExpenseForm
        expenses={expenses}
        setExpenses={setExpenses}
      />
      <ExpenseChart expenses={expenses} />
      <AIInsights
  analysis={analysis}
  loading={loading}
  analyzeExpenses={analyzeExpenses}
/>

    </>
  );
}

export default App;