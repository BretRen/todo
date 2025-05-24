import DeleteIcon from "@mui/icons-material/Delete";
import dayjs from "dayjs";
import Info from "./info";
export default function TodoItem({
  todo,
  onToggle,
  onDelete,
  onUpdate,
  onUpdateInfo,
}) {
  return (
    <li
      className={`flex items-center justify-between p-3 rounded ${
        todo.done ? "bg-green-100 line-through text-gray-500" : "bg-white"
      }`}
    >
      <div className="flex flex-col flex-grow">
        <input
          type="text"
          className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-1"
          value={todo.name}
          onChange={(e) => onUpdate(e, todo.id)}
        />
        {todo.date && (
          <span className="text-sm text-gray-500">
            Due: {dayjs(todo.date).format("YYYY-MM-DD HH:mm")}
          </span>
        )}
        <Info
          info={todo.info}
          onUpdate={(e) => onUpdateInfo(e.target.value, todo.id)}
        />
      </div>
      <div className="flex items-center gap-2 ml-2">
        <input
          type="checkbox"
          className="w-5 h-5 cursor-pointer"
          checked={todo.done}
          onChange={() => onToggle(todo.id)}
        />
        <button
          onClick={() => onDelete(todo.id)}
          title="Delete"
          className="text-red-500 hover:text-red-700 transition"
        >
          <DeleteIcon />
        </button>
      </div>
    </li>
  );
}
