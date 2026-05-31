import Card from "./Card";
function Dashboard(){
    return(
        <div>
            <Card title ="Expense" amount = "1000"/>
            <Card title ="Budget" amount = "5000"/>
            <Card title ="Saving" amount = "4000"/>
        </div>
    );
}
export default Dashboard;