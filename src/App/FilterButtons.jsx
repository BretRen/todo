export default function FilterButtons({ filterType, setFilterType, showDelTodos, setShowDelTodos }) {
  return (
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
  );
}
