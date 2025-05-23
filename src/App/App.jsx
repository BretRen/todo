import { useState, useEffect } from "react";
import FilterButtons from "./FilterButtons";
import AddTodoInput from "./AddTodoInput";
import TodoList from "./TodoList";
import DeletedList from "./DeletedList";
import Tooltip from '@mui/material/Tooltip';

import "./App.css";

export default function App() {
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
    setTodos(todos.map(todo => todo.id === id ? { ...todo, done: !todo.done } : todo));

  const addTodo = (name) =>
    setTodos([...todos, { name, id: Date.now() + Math.random() * 1000, done: false }]);

  const delTodo = (id) => {
    const deleted = todos.find(todo => todo.id === id);
    if (deleted) {
      setDelTodos([...delTodos, deleted]);
      setTodos(todos.filter(todo => todo.id !== id));
    }
  };

  const backDelTodo = (target) => {
    setDelTodos(delTodos.filter(todo => todo.id !== target.id));
    setTodos([...todos, target]);
  };

  const updateTodo = (e, id) => {
    const newName = e.target.value;
    setTodos(todos.map(todo => todo.id === id ? { ...todo, name: newName } : todo));
  };

  const filteredTodos = todos.filter(todo =>
    filterType === "all" ? true :
      filterType === "done" ? todo.done :
        !todo.done
  );

  return (
    <div className="container">
      <h1>Todo List</h1>
      {showDelTodos ? (
        <Tooltip title="You are viewing deleted todos">
          <div>
            <FilterButtons
              filterType={filterType}
              setFilterType={setFilterType}
              showDelTodos={showDelTodos}
              setShowDelTodos={setShowDelTodos}
            />
          </div>
        </Tooltip>
      ) : (
        <FilterButtons
          filterType={filterType}
          setFilterType={setFilterType}
          showDelTodos={showDelTodos}
          setShowDelTodos={setShowDelTodos}
        />
      )}


      {showDelTodos ? (
        <DeletedList delTodos={delTodos} onRestore={backDelTodo} />
      ) : (
        <>
          <AddTodoInput onAdd={addTodo} />
          <TodoList
            todos={filteredTodos}
            onToggle={toggleDone}
            onDelete={delTodo}
            onUpdate={updateTodo}
          />
        </>
      )}
    </div>
  );
}
