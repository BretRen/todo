import TodoItem from "./TodoItem";

export default function TodoList({ todos, onToggle, onDelete, onUpdate }) {
  return (
    <ul className="space-y-2 max-h-96 overflow-y-auto">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate}
          date={todo.date}
          info={todo.info}
        />
        
      ))}
      
    </ul>
  );
}
