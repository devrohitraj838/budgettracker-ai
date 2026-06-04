import { useState } from "react";
function ExpenseForm({expenses,setExpenses}){
    const[expenseName,setName] = useState("");
    const[expenseAmount,setAmount] = useState("");
    function handleAddExpense(){
        const newExpense = {
            name : expenseName,
            amount : expenseAmount
        };
        setExpenses([...expenses,newExpense]);
        setName("");
        setAmount("");
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
            <br>
            </br>
            <button onClick={handleAddExpense}>Add Expense</button>
            <h3>Expenses</h3>
            {
                expenses.map((expense,index) =>
                <div key={index}>
                    <p>{expense.name} - {expense.amount}</p>
                </div>
                )
            }
        </div>
    );
}
export default ExpenseForm;