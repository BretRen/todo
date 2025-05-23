import DeleteIcon from '@mui/icons-material/Delete';

export default function TodoItem({ todo, onToggle, onDelete, onUpdate }) {
  return (
    <li className={todo.done ? "done-item" : ""}>
      <input
        className="todo-input"
        value={todo.name}
        onChange={(e) => onUpdate(e, todo.id)}
      />
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
      />
      <button
        className="del-btn"
        onClick={() => onDelete(todo.id)}
        title="Delete"
      >
        <DeleteIcon />
      </button>
    </li>
  );
}
