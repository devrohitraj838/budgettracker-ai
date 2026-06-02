import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import Counter from "./components/Counter";
import ExpenseForm from "./components/ExpenseForm";
function App(){
  return(
    <>
    <Navbar />
    <Dashboard />
    <Counter />
    <ExpenseForm />
    </>
  );
}
export default App;