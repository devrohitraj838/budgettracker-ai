import { useState } from "react";
function ExpenseForm(){
    const[expenseName,setName] = useState("");
    const[expenseAmount,setAmount] = useState("");
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
            <button>Add Expense</button>
        </div>
    );
}
export default ExpenseForm;