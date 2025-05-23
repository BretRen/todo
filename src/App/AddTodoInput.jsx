import React, { useState } from "react";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

export default function AddTodoInput({ onAdd }) {
  const [dateTime, setDateTime] = useState(dayjs()); // 选中的时间

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      onAdd(e.target.value.trim());
      e.target.value = "";
    }
  };

  return (
    <div className="add-todo" style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <input
        type="text"
        placeholder="Add a new todo and press Enter"
        onKeyDown={handleKeyDown}
      />
    <br />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          label="Select due date/time"
          value={dateTime}
          onChange={(newValue) => setDateTime(newValue)}
          renderInput={(params) => <input {...params} style={{ padding: 8, fontSize: 14 }} />}
        />
      </LocalizationProvider>
    </div>
  );
}
