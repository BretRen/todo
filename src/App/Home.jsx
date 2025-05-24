import { useState, useEffect } from "react";
import FilterButtons from "./FilterButtons";
import AddTodoInput from "./AddTodoInput";
import TodoList from "./TodoList";
import DeletedList from "./DeletedList";
import Tooltip from "@mui/material/Tooltip";
import Setting from "../layout/setting";

import "../index.css";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [filterType, setFilterType] = useState("all");
  const [delTodos, setDelTodos] = useState([]);
  const [showDelTodos, setShowDelTodos] = useState(false);
  const [didInit, setDidInit] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("todos");
    if (saved) setTodos(JSON.parse(saved));
    setDidInit(true);
  }, []);

  useEffect(() => {
    if (didInit) localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos, didInit]);

  const toggleDone = (id) =>
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );

  const addTodo = (name, date, info) =>
    setTodos([
      ...todos,
      {
        name,
        id: Date.now() + Math.random() * 1000,
        done: false,
        info: info,
        date: date,
      },
    ]);

  const delTodo = (id) => {
    const deleted = todos.find((todo) => todo.id === id);
    if (deleted) {
      setDelTodos([...delTodos, deleted]);
      setTodos(todos.filter((todo) => todo.id !== id));
    }
  };

  const backDelTodo = (target) => {
    setDelTodos(delTodos.filter((todo) => todo.id !== target.id));
    setTodos([...todos, target]);
  };

  const updateTodo = (e, id) => {
    const newName = e.target.value;
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, name: newName } : todo))
    );
  };

  const updateTodoInfo = (info, id) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, info: info } : todo))
    );
  };

  const filteredTodos = todos.filter((todo) =>
    filterType === "all" ? true : filterType === "done" ? todo.done : !todo.done
  );

  return (
    <>
      <Setting />
      <div className="m-24 max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Todo List
        </h1>

        {showDelTodos ? (
          <Tooltip title="You need to click Close Deleted Todos.">
            <div className="mb-5">
              <FilterButtons
                filterType={filterType}
                setFilterType={setFilterType}
                showDelTodos={showDelTodos}
                setShowDelTodos={setShowDelTodos}
              />
            </div>
          </Tooltip>
        ) : (
          <div className="mb-5">
            <FilterButtons
              filterType={filterType}
              setFilterType={setFilterType}
              showDelTodos={showDelTodos}
              setShowDelTodos={setShowDelTodos}
            />
          </div>
        )}

        {showDelTodos ? (
          <DeletedList delTodos={delTodos} onRestore={backDelTodo} />
        ) : (
          <>
            <div className="mb-6">
              <AddTodoInput onAdd={addTodo} />
            </div>
            <TodoList
              todos={filteredTodos}
              onToggle={toggleDone}
              onDelete={delTodo}
              onUpdate={updateTodo}
              onUpdateInfo={updateTodoInfo}
            />
          </>
        )}
      </div>
    </>
  );
}
