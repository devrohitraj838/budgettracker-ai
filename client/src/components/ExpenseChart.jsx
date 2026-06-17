import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

function ExpenseChart({ expenses }) {
  const categoryData = [];

  expenses.forEach((expense) => {
    const existingCategory = categoryData.find(
      (item) => item.name === expense.category
    );

    if (existingCategory) {
      existingCategory.value += Number(expense.amount);
    } else {
      categoryData.push({
        name: expense.category,
        value: Number(expense.amount),
      });
    }
  });

  const COLORS = [
    "#22c55e",
    "#3b82f6",
    "#a855f7",
    "#ef4444",
  ];

  return (
    <div>
      <h2>Expense Breakdown</h2>

      <PieChart width={400} height={300}>
        <Pie
          data={categoryData}
          dataKey="value"
          nameKey="name"
          outerRadius={100}
          label
        >
          {categoryData.map((entry, index) => (
            <Cell
              key={index}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>

        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}

export default ExpenseChart;