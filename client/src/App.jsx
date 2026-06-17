import "./App.css";
import { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import ExpenseForm from "./components/ExpenseForm";

function App() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/expenses")
      .then((res) => res.json())
      .then((data) => setExpenses(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <Navbar />
      <Dashboard expenses={expenses} />
      <ExpenseForm
        expenses={expenses}
        setExpenses={setExpenses}
      />
    </>
  );
}

export default App;