import { useState } from "react";
function ExpenseForm({expenses,setExpenses}){
    const[expenseName,setName] = useState("");
    const[expenseAmount,setAmount] = useState("");
    const[category,setCategory] = useState("Food");
    const[editIndex,setEditIndex] = useState(null);
    function handleAddExpense(){
        if(
            expenseName.trim() === "" ||
            expenseAmount === ""
        ){
            alert("Please fill all required field");
            return;
        }
        
        const newExpense = {
            name : expenseName,
            amount : expenseAmount,
            category:category
        };
        if (editIndex === null){

            setExpenses([...expenses,newExpense]);
        }
        else{
            const upadedExpense = expenses.map((expense,index) =>{
                if(index === editIndex){
                    return newExpense;
                }
    
                    return expense
            });
            setExpenses(upadedExpense);
            setEditIndex(null);
        }
        
        setName("");
        setAmount("");
    }
    function handleEditExpense(index){
        
        const expense= expenses[index];
        setName(expense.name);
        setAmount(expense.amount);
        setCategory(expense.category);
        setEditIndex(index);

    }
    function handleDeleteExpense(deleteIndex){
        const upadtedExpenses = expenses.filter((expense,index) => 
        index !==deleteIndex
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
            <button onClick={handleAddExpense}>{editIndex===null?"Add Expense":"Update Expense"}</button>
            <h3>Expenses</h3>
            {
                expenses.length ===0 ?(
                    <p>No expenses added yet</p>
                ):(
                expenses.map((expense,index) =>
                <div key={index}>
                    <p>{expense.name} - {expense.amount} - {expense.category}</p>
                    <button onClick={() => handleEditExpense(index)}>Edit</button>
                    <button onClick={() =>handleDeleteExpense(index)}>Delete</button>
                </div>
                ))
            }
            
        </div>
    );
}
export default ExpenseForm;