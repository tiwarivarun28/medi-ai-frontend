import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Upload from "../pages/Upload";
import About from "../pages/About";
import Chatbot from "../pages/ChatBot";
import { Login } from "../pages/Login";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/about" element={<About />} />
      <Route path="/chatbot" element={<Chatbot />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
