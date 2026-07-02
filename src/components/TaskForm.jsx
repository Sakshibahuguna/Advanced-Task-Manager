function TaskForm({
  task,
  setTask,
  dueDate,
  setDueDate,
  priority,
  setPriority,
  addTask,
  editingId,
}) {
  return (
    <div className="input-container">
      <input
        type="text"
        placeholder="Enter task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="High">🔴 High</option>
        <option value="Medium">🟡 Medium</option>
        <option value="Low">🟢 Low</option>
      </select>

      <button onClick={addTask}>
        {editingId ? "Update Task" : "Add Task"}
      </button>
    </div>
  );
}

export default TaskForm;
