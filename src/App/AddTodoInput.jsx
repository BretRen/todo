export default function AddTodoInput({ onAdd }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      onAdd(e.target.value.trim());
      e.target.value = "";
    }
  };

  return (
    <div className="add-todo">
      <input
        type="text"
        placeholder="Add a new todo and press Enter"
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
