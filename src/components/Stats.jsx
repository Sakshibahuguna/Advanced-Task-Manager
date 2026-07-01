function Stats({
  totalTasks,
  completedTasks,
  pendingTasks,
}) {
  const progress =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="stats">
      <h3>Total Tasks: {totalTasks}</h3>
      <h3>Completed: {completedTasks}</h3>
      <h3>Pending: {pendingTasks}</h3>

      <div className="progress-section">
        <h3>Progress</h3>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <p>
          {completedTasks} of {totalTasks} Tasks Completed ({progress}%)
        </p>
      </div>
    </div>
  );
}

export default Stats;