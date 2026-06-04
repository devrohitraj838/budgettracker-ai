import { useState } from "react";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import ExpenseForm from "./components/ExpenseForm";
function App(){
  const [expenses,setExpenses] = useState([]);
  return(
    <>
    <Navbar />
    <Dashboard 
    expenses={expenses}
    />
    <ExpenseForm 
    expenses={expenses}
    setExpenses={setExpenses}
    />
    </>
  );
}
export default App;