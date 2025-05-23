import { useState, useEffect } from "react";
import "./App.css";
export default function App() {
  const [todos, setTodos] = useState([]);

  const [filterType, setFilterType] = useState("all"); // all, done, not_done

  const [delTodos, setDelTodos] = useState([]); // 初始空数组

  const [showDelTodos, setShowDelTodos] = useState(false);

  const [didInit, setDidInit] = useState(false);

  // 初始化：只读一次
  useEffect(() => {
    const saved = localStorage.getItem("todos");
    if (saved) {
      setTodos(JSON.parse(saved));
    }
    setDidInit(true); // 初始化完成
  }, []);

  // 只有初始化完成后，才允许写入 localStorage
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
      name: name,
      id: todos.length + 1,
      done: false,
    };
    setTodos([...todos, newTodo]);
  };

  const addTodo = (event) => {
    if (event.key === "Enter") {
      if (!event.target.value) return;
      addTodoA(event.target.value);
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
    if (filterType === "done") return todo.done === true;
    if (filterType === "not_done") return todo.done === false;
  });

  const backDelTodo = (target) => {
    setDelTodos(delTodos.filter((todo) => todo.id !== target.id));
    addTodoA(target.name);
  };

  return (
    <>
      <h1>Todo List</h1>
      <button
        className={filterType == "all" && !showDelTodos ? "here" : null}
        disabled={showDelTodos ? true : false}
        onClick={() => setFilterType("all")}
      >
        All
      </button>
      <button
        className={filterType == "done" && !showDelTodos ? "here" : null}
        disabled={showDelTodos ? true : false}
        onClick={() => setFilterType("done")}
      >
        Done
      </button>
      <button
        className={filterType == "not_done" && !showDelTodos ? "here" : null}
        disabled={showDelTodos ? true : false}
        onClick={() => setFilterType("not_done")}
      >
        Not Done
      </button>
      <button
        className={showDelTodos ? "here" : null}
        onClick={() => setShowDelTodos(!showDelTodos)}
      >
        {!showDelTodos ? "Show Del Todos" : "Close Del Todos"}
      </button>
      <br />
      {/* 如果显示已经删除的任务就提示 */}
      {showDelTodos ? (
        <>
          <p className="error">
            Currently in the list of deleted tasks. <br />
            Click the button again to close. <br />
            This data will disappear after refreshing the page!
          </p>
          <ul>
            {delTodos.map((todo) => (
              <li key={todo.id}>
                {todo.name}
                <button onClick={() => backDelTodo(todo)}>back</button>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          Add: <input type="text" onKeyDown={addTodo} />
        </>
      )}

      <ul>
        {showDelTodos
          ? null
          : filteredTodos.map((todo) => (
              <li key={todo.id}>
                <span className={todo.done ? "done" : null}>{todo.name}</span>
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => toggleDone(todo.id)}
                />
                <span className="del" onClick={() => delTodo(todo.id)}>
                  del
                </span>
              </li>
            ))}
      </ul>
    </>
  );
}
