function AIInsights({
  analysis,
  loading,
  analyzeExpenses,
}) {
  return (
    <div className="ai-card">
  <h2>🤖 AI Spending Insights</h2>

  <button onClick={analyzeExpenses}>
    Analyze Spending
  </button>

  {loading && (
    <div className="loader"></div>
  )}

  {!loading && analysis && (
    <div className="analysis-result">
      {analysis}
    </div>
  )}
</div>
  );
}

export default AIInsights;