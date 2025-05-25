import Button from "@mui/material/Button";

export default function FilterButtons({
  filterType,
  setFilterType,
  showDelTodos,
  setShowDelTodos,
  workspace,
}) {
  return (
    <div className="flex space-x-2">
      <Button
        variant={
          filterType === "all" && !showDelTodos ? "contained" : "outlined"
        }
        color="primary"
        disabled={showDelTodos}
        onClick={() => setFilterType("all")}
      >
        All
      </Button>

      <Button
        variant={
          filterType === "done" && !showDelTodos ? "contained" : "outlined"
        }
        color="primary"
        disabled={showDelTodos}
        onClick={() => setFilterType("done")}
      >
        Done
      </Button>

      <Button
        variant={
          filterType === "not_done" && !showDelTodos ? "contained" : "outlined"
        }
        color="primary"
        disabled={showDelTodos}
        onClick={() => setFilterType("not_done")}
      >
        Not Done
      </Button>

      <Button
        variant={showDelTodos ? "contained" : "outlined"}
        color={showDelTodos ? "error" : "inherit"}
        disabled={workspace === "official"}
        onClick={() => setShowDelTodos(!showDelTodos)}
      >
        {showDelTodos ? "Close Deleted Todos" : "Show Deleted Todos"}
      </Button>
    </div>
  );
}
