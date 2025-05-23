import UndoIcon from '@mui/icons-material/Undo';

export default function DeletedList({ delTodos, onRestore }) {
  return (
    <>
      <p className="error">
        Currently showing deleted tasks.
        <br />
        Click "Close Deleted Todos" to go back.
        <br />
        This list is temporary and will clear on page refresh.
      </p>
      <ul className="todo-list deleted-list">
        {delTodos.map((todo) => (
          <li key={todo.id}>
            <span>{todo.name}</span>
            <button
              className="restore-btn"
              onClick={() => onRestore(todo)}
              title="Restore"
            >
              <UndoIcon />
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
