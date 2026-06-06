import { useState } from "react";
function ExpenseForm({expenses,setExpenses}){
    const[expenseName,setName] = useState("");
    const[expenseAmount,setAmount] = useState("");
    const[category,setCategory] = useState("Food");
    function handleAddExpense(){
        const newExpense = {
            name : expenseName,
            amount : expenseAmount,
            category:category
        };
        setExpenses([...expenses,newExpense]);
        setName("");
        setAmount("");
    }
    function handleDeleteExpense(deleteIndex){
        const upadtedExpenses = expenses.filter((expense,index) => 
        index !=deleteIndex
        );
        setExpenses(upadtedExpenses);
    }
    return(
        <div>
            <h3>Add Expenses</h3>
            <input type="text"
            placeholder="Enter expense name"
            value={expenseName}
            
            onChange={(e) => setName(e.target.value)}
            >
            </input>
            <br>
            </br>
            <input type="number"
            placeholder="Enter amount"
            value={expenseAmount}
            onChange={(e) => setAmount(e.target.value)}>
            </input>
            <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            >
                <option value="Food">Food</option>
                <option value="Shopping">Shopping</option>
                <option value="Travel">Travel</option>
                <option value="Bills">Bills</option>

            </select>
            <br>
            </br>
            <button onClick={handleAddExpense}>Add Expense</button>
            <h3>Expenses</h3>
            {
                expenses.map((expense,index) =>
                <div key={index}>
                    <p>{expense.name} - {expense.amount} - {expense.category}</p>
                    <button onClick={() =>handleDeleteExpense(index)}>Delete</button>
                </div>
                )
            }
            
        </div>
    );
}
export default ExpenseForm;