// App.jsx
import { Routes, Route, Link } from "react-router-dom";
import Home from "./App/Home";
import Changelog from "./pages/Changelog";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/changelog" element={<Changelog />} />
      <Route path="/changelog/:v" element={<Changelog />} />
    </Routes>
  );
}
