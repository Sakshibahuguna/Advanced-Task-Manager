function TaskCard({
  item,
  togglePin,
  toggleComplete,
  editTask,
  deleteTask,
}) {
  return (
    <div className="task-card">
      <p
        className={item.completed ? "completed" : ""}
        style={{
          textDecoration: item.completed
            ? "line-through"
            : "none",
        }}
      >
        {item.pinned && "⭐ "}
        {item.text}
      </p>

      <p>
        <strong>Priority:</strong> {item.priority}
      </p>

      <p>
        <strong>Category:</strong> {item.category}
      </p>

      <p>
        📅 {item.dueDate || "No Due Date"}
      </p>

      <div className="button-group">
        <button
          className="pin-btn"
          onClick={() => togglePin(item.id)}
        >
          {item.pinned ? "⭐ Unpin" : "📌 Pin"}
        </button>

        <button
          className="done-btn"
          onClick={() => toggleComplete(item.id)}
        >
          {item.completed ? "Undo" : "Done"}
        </button>

        <button
          className="edit-btn"
          onClick={() => editTask(item.id)}
        >
          ✏️ Edit
        </button>

        <button
          className="delete-btn"
          onClick={() => deleteTask(item.id)}
        >
          🗑 Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;