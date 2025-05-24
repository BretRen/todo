import React, { useState } from "react";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Button from "@mui/material/Button";
import dayjs from "dayjs";

export default function AddTodoInput({ onAdd }) {
  const [dateTime, setDateTime] = useState(dayjs()); // 选中的时间
  const [inputV, setInputV] = useState(""); // 选中的时间
  const [textarea, setTextarea] = useState("");

  const finish = () => {
    onAdd(inputV, dateTime, textarea);
    setInputV("");
    setTextarea("");
  };

  return (
    <div className="space-y-3">
      {" "}
      {/* 改为垂直布局 */}
      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Add a new todo and press Enter"
          value={inputV}
          onChange={(e) => setInputV(e.target.value)}
          className="flex-grow px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            label="Select due date/time"
            value={dateTime}
            onChange={(newValue) => setDateTime(newValue)}
            renderInput={(params) => (
              <input
                {...params}
                className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            )}
          />
        </LocalizationProvider>
        <Button variant="contained" color="success" onClick={finish}>
          Finish
        </Button>
      </div>
      {/* 让 textarea 独占一行 */}
      <div>
        <textarea
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-y"
          rows={2}
          placeholder="More Information"
          value={textarea}
          onChange={(e) => setTextarea(e.target.value)}
        />
      </div>
    </div>
  );
}
