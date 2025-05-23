export default function FilterButtons({ filterType, setFilterType, showDelTodos, setShowDelTodos }) {
  return (
    <div className="flex space-x-2">
      
      <button
        className={`px-3 py-1 rounded border transition ${
          filterType === "all" && !showDelTodos
            ? "bg-blue-500 text-white border-blue-500"
            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
        } ${showDelTodos ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
        disabled={showDelTodos}
        onClick={() => setFilterType("all")}
      >
        All
      </button>

      <button
        className={`px-3 py-1 rounded border transition ${
          filterType === "done" && !showDelTodos
            ? "bg-blue-500 text-white border-blue-500"
            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
        } ${showDelTodos ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
        disabled={showDelTodos}
        onClick={() => setFilterType("done")}
      >
        Done
      </button>

      <button
        className={`px-3 py-1 rounded border transition ${
          filterType === "not_done" && !showDelTodos
            ? "bg-blue-500 text-white border-blue-500"
            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
        } ${showDelTodos ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
        disabled={showDelTodos}
        onClick={() => setFilterType("not_done")}
      >
        Not Done
      </button>

      <button
        className={`px-3 py-1 rounded border transition ${
          showDelTodos
            ? "bg-red-500 text-white border-red-500"
            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
        } cursor-pointer`}
        onClick={() => setShowDelTodos(!showDelTodos)}
      >
        {showDelTodos ? "Close Deleted Todos" : "Show Deleted Todos"}
      </button>
    </div>
  );
}
