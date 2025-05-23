import { useState, useEffect } from "react";
import DeleteIcon from '@mui/icons-material/Delete';

import "./App.css";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [filterType, setFilterType] = useState("all"); // all, done, not_done
  const [delTodos, setDelTodos] = useState([]);
  const [showDelTodos, setShowDelTodos] = useState(false);
  const [didInit, setDidInit] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("todos");
    if (saved) {
      setTodos(JSON.parse(saved));
    }
    setDidInit(true);
  }, []);

  useEffect(() => {
    if (didInit) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos, didInit]);

  const toggleDone = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const addTodoA = (name) => {
    const newTodo = {
      name,
      id: Date.now() + Math.floor(Math.random() * 1000),
      done: false,
    };
    setTodos([...todos, newTodo]);
  };

  const addTodo = (event) => {
    if (event.key === "Enter") {
      if (!event.target.value.trim()) return;
      addTodoA(event.target.value.trim());
      event.target.value = "";
    }
  };

  const delTodo = (id) => {
    const deleted = todos.find((todo) => todo.id === id);
    if (deleted) {
      setDelTodos((prev) => [...prev, deleted]);
      setTodos(todos.filter((todo) => todo.id !== id));
    }
  };

  const filteredTodos = todos.filter((todo) => {
    if (filterType === "all") return true;
    if (filterType === "done") return todo.done;
    if (filterType === "not_done") return !todo.done;
    return true;
  });

  const backDelTodo = (target) => {
    setDelTodos(delTodos.filter((todo) => todo.id !== target.id));
    setTodos((prev) => [...prev, target]);
  };

  const updateTodo = (e, id) => {
    const newName = e.target.value;
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, name: newName } : todo))
    );
  };

  return (
    <div className="container">
      <h1>Todo List</h1>

      <div className="filter-buttons">
        <button
          className={filterType === "all" && !showDelTodos ? "active" : ""}
          disabled={showDelTodos}
          onClick={() => setFilterType("all")}
        >
          All
        </button>
        <button
          className={filterType === "done" && !showDelTodos ? "active" : ""}
          disabled={showDelTodos}
          onClick={() => setFilterType("done")}
        >
          Done
        </button>
        <button
          className={filterType === "not_done" && !showDelTodos ? "active" : ""}
          disabled={showDelTodos}
          onClick={() => setFilterType("not_done")}
        >
          Not Done
        </button>
        <button
          className={showDelTodos ? "active" : ""}
          onClick={() => setShowDelTodos(!showDelTodos)}
        >
          {showDelTodos ? "Close Deleted Todos" : "Show Deleted Todos"}
        </button>
      </div>

      {showDelTodos ? (
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
                  onClick={() => backDelTodo(todo)}
                  title="Restore"
                >
                  ↩
                </button>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <div className="add-todo">
            <input
              type="text"
              placeholder="Add a new todo and press Enter"
              onKeyDown={addTodo}
            />
          </div>
          <ul className="todo-list">
            {filteredTodos.map((todo) => (
              <li key={todo.id} className={todo.done ? "done-item" : ""}>
                <input
                  className="todo-input"
                  value={todo.name}
                  onChange={(e) => updateTodo(e, todo.id)}
                />
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => toggleDone(todo.id)}
                />
                <button
                  className="del-btn"
                  onClick={() => delTodo(todo.id)}
                  title="Delete"
                >
                  <DeleteIcon />
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
