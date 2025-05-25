import UndoIcon from '@mui/icons-material/Undo';

export default function DeletedList({ delTodos, onRestore }) {
  return (
    <div>
      <p className="mb-4 text-sm text-center text-red-600 font-semibold">
        Currently showing deleted tasks.<br />
        Click <span className="font-bold underline">"Close Deleted Todos"</span> to go back.<br />
        This list is temporary and will clear on page refresh.
      </p>
      <ul className="space-y-3">
        {delTodos.map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between items-center p-3 bg-red-50 border border-red-200 rounded shadow-sm hover:bg-red-100 transition"
          >
            <span className="truncate text-red-700 font-medium">{todo.name}</span>
            <button
              className="text-red-600 hover:text-red-800 transition"
              onClick={() => onRestore(todo)}
              title="Restore"
              aria-label={`Restore todo ${todo.name}`}
            >
              <UndoIcon fontSize="small" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
