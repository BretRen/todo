// App.jsx
import { Routes, Route, Link } from "react-router-dom";
import Home from "./App/Home";
import Changelog from "./pages/Changelog";
import Footer from "./layout/footer.jsx"
export default function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/changelog" element={<Changelog />} />
      <Route path="/changelog/:v" element={<Changelog />} />
    </Routes>
    <Footer />
    </>
  );
}
