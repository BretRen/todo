import SettingsIcon from "@mui/icons-material/Settings";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { useState } from "react";
import { Link } from "react-router-dom";
import SetKeyInput from "../Setting/setKeyInput";

import saveJSON from "../tool/export";

export default function Setting({ workspace, setWorkspace }) {
  const [open, setOpen] = useState(false);

  const exportData = () => {
    const raw = localStorage.getItem(workspace + "-todos");
    if (!raw) {
      alert("没有找到 todos 数据");
      return;
    }

    try {
      const data = JSON.parse(raw);
      const json = JSON.stringify(data, null, 2);
      saveJSON(json, "todos.json"); // ✅ 注意：传入的是 json 字符串
    } catch (err) {
      alert("导出失败：JSON 解析错误");
    }
  };

  const click = () => {
    setOpen(true);
  };

  const toggleDrawer = (bool) => {
    setOpen(bool);
  };

  return (
    <div className="m-4 top-0 right-0 fixed">
      <SettingsIcon onClick={click} />
      <Drawer anchor="right" open={open} onClose={() => toggleDrawer(false)}>
        <div className="p-4">
          <Button onClick={exportData} variant="text">
            Export
          </Button>
        </div>
        <div className="p-4">
          <Button variant="text">
            <Link to="/changelog">Changelog</Link>
          </Button>
        </div>
        <div className="p-4">
          <SetKeyInput setWorkspace={setWorkspace} />
        </div>
      </Drawer>
    </div>
  );
}
