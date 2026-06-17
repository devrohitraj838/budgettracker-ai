import Card from "./Card";
function Dashboard({expenses}){
    const budget = 5000;
    const totalExpense = expenses.reduce((curr,sum) => curr+Number(sum.amount),0);
    const saving = budget - totalExpense;
    return(
        <div className="dashboard-container">
            <Card title = "Budget" amount = {budget}></Card>
            <Card title = "Total Expenses" amount = {totalExpense}></Card> 
            <Card title = "Savings" amount = {saving}></Card> 
        </div>
    );
}
export default Dashboard;