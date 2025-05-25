import { useState, useEffect } from "react";
import FilterButtons from "../Home/FilterButtons";
import AddTodoInput from "../Home/AddTodoInput";
import TodoList from "../Home/TodoList";
import Button from "@mui/material/Button";
import DeletedList from "../Home/DeletedList";
import Tooltip from "@mui/material/Tooltip";
import Setting from "../layout/setting";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Link from "@mui/material/Link";
import { useParams, useNavigate } from "react-router-dom";
import "../index.css";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [filterType, setFilterType] = useState("all");
  const [delTodos, setDelTodos] = useState([]);
  const [showDelTodos, setShowDelTodos] = useState(false);
  const [didInit, setDidInit] = useState(false);
  const [workspace, setWorkspace] = useState(
    localStorage.getItem("workspace") || "main"
  );
  const { cworkspace } = useParams(); // 获取 URL 参数
  const navigate = useNavigate(); // 用于跳转

  const [open, setOpen] = useState(false);
  useEffect(() => {
    const officialTodos = [
      {
        name: "Cloud Storage",
        date: "N/A",
        done: false,
        id: 0,
      },
    ];
    // 存到 localStorage 对应 workspace 的 key 中
    localStorage.setItem("official-todos", JSON.stringify(officialTodos));
  }, []);

  const handleClickOpen = (event) => {
    event.preventDefault();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // 根据 URL 参数 v 自动打开弹窗
  useEffect(() => {
    if (cworkspace) {
      localStorage.setItem("workspace", cworkspace);
    }
    navigate("/");
  }, [cworkspace, navigate]);

  useEffect(() => {
    const saved = localStorage.getItem(workspace + "-todos");

    if (saved) setTodos(JSON.parse(saved));
    setDidInit(true);
  }, [workspace]);

  useEffect(() => {
    if (didInit)
      localStorage.setItem(workspace + "-todos", JSON.stringify(todos));
  }, [todos, didInit, workspace]);

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
      <Setting workspace={workspace} setWorkspace={setWorkspace} />
      <div className="m-24 max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Todo List
        </h1>
        <h2 className="text-1xl font-bold mb-6 text-center text-gray-400">
          Current Workspace: {workspace}
        </h2>

        {workspace === "official" && (
          <Stack sx={{ width: "100%", mb: 2 }} spacing={2}>
            <Alert severity="warning">
              This is the official Todos{" "}
              <Link href="" onClick={(e) => handleClickOpen(e)}>
                Learn more
              </Link>
            </Alert>
          </Stack>
        )}

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"About the official Todo."}
          </DialogTitle>
          <DialogContent className="text-gray-500">
            <p>
              Official Todos is a Todos that is directly embedded in this
              website.
            </p>
            <br />
            <p>
              It is used to let everyone know how far we have developed.
            </p>{" "}
            <br />
            <p>
              How to exit: You just need to change to another workspace in
              Settings - Set Workspace.
            </p>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              Ok, I Know.
            </Button>
          </DialogActions>
        </Dialog>

        {showDelTodos ? (
          <Tooltip title="You need to click Close Deleted Todos.">
            <div className="mb-5">
              <FilterButtons
                filterType={filterType}
                setFilterType={setFilterType}
                showDelTodos={showDelTodos}
                setShowDelTodos={setShowDelTodos}
                workspace={workspace}
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
              workspace={workspace}
            />
          </div>
        )}

        {showDelTodos ? (
          <DeletedList delTodos={delTodos} onRestore={backDelTodo} />
        ) : (
          <>
            <div className="mb-6">
              <AddTodoInput onAdd={addTodo} workspace={workspace} />
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
