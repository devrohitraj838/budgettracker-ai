import Card from "./Card";
function Dashboard({
  expenses,
  budget,
  setBudget,
  updateBudget,
}){

    const totalExpense = expenses.reduce((curr,sum) => curr+Number(sum.amount),0);
    const saving = budget - totalExpense;
    return(
        <div className="dashboard-container">
            <Card title="Budget" amount={budget} isMoney={true} />
<div className="budget-controls">
  <input
    type="number"
    value={budget || ""}
    onChange={(e) =>
      setBudget(Number(e.target.value))
    }
  />

  <button onClick={updateBudget}>
    Update Budget
  </button>
</div>
<Card title="Total Expenses" amount={totalExpense} isMoney={true} />
<Card title="Savings" amount={saving} isMoney={true} />
<Card title="Transactions" amount={expenses.length} isMoney={false} />
        </div>
    );
}
export default Dashboard;