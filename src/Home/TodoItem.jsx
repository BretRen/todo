import DeleteIcon from "@mui/icons-material/Delete";
import dayjs from "dayjs";
import Info from "./info";

export default function TodoItem({
  todo,
  onToggle,
  onDelete,
  onUpdate,
  onUpdateInfo,
  disabled,
}) {
  const now = dayjs();
  const dueDate = todo.date ? dayjs(todo.date) : null;

  let diffText = "";
  let isOverdue = false;

  if (dueDate && !todo.done) {
    const diffMinutes = dueDate.diff(now, "minute");

    if (diffMinutes < 0) {
      isOverdue = true;
      const days = Math.abs(dueDate.diff(now, "day"));
      const hours = Math.abs(dueDate.diff(now, "hour") % 24);
      const minutes = Math.abs(diffMinutes % 60);
      diffText = `Overdue by ${days > 0 ? days + " day(s) " : ""}${
        hours > 0 ? hours + " hour(s) " : ""
      }${minutes} minute(s)`;
    } else {
      const days = dueDate.diff(now, "day");
      const hours = dueDate.diff(now, "hour") % 24;
      const minutes = diffMinutes % 60;
      diffText = `Due in ${days > 0 ? days + " day(s) " : ""}${
        hours > 0 ? hours + " hour(s) " : ""
      }${minutes} minute(s)`;
    }
  }

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
          disabled={disabled}
        />
        {/* Info component for additional todo information */}
        <Info
          info={todo.info}
          onUpdate={(e) => onUpdateInfo(e.target.value, todo.id)}
          disabled={disabled}
        />
        {/* 只有未完成任务且有截止日期时才显示 */}
        {dueDate && !todo.done && (
          <div
            className={`text-sm ${
              isOverdue ? "text-red-600 font-bold" : "text-gray-500"
            }`}
          >
            Due: {dueDate.format("YYYY-MM-DD HH:mm")} ({diffText})
          </div>
        )}
      </div>
      <div className="flex items-center gap-2 ml-2">
        <input
          type="checkbox"
          className="w-5 h-5 cursor-pointer"
          checked={todo.done}
          onChange={() => onToggle(todo.id)}
          disabled={disabled}
        />
        <button
          onClick={() => onDelete(todo.id)}
          title="Delete"
          className="text-red-500 hover:text-red-700 transition"
          disabled={disabled}
        >
          <DeleteIcon />
        </button>
      </div>
    </li>
  );
}
