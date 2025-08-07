import { useState } from "react";
import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

export default function App() {
  // const [userPrompt, setUserPrompt] = useState("");
  // const [sqlQuery, setSqlQuery] = useState("");
  // const [listOfQueries, setListOfQueries] = useState([]);

  // useEffect(() => {

  // }, []);

  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      {/* NAVBAR ADDITION - Full width above the content */}
      <Router>
        <nav className="w-full bg-blue-600 shadow-sm p-4 border-b border-gray-200">
          <div className="mx-auto flex justify-between items-center w-full">
            <h1 className="text-xl font-bold text-white hover:text-gray-200">
              <Link to="/">𝕾𝕼𝕷 𝕼𝖚𝖊𝖗𝖞 𝕲𝖊𝖓𝖊𝖗𝖆𝖙𝖔𝖗</Link>
            </h1>
            <div className="flex space-x-4">
              <button className="text-white hover:text-gray-200">
                <Link to="/login">Login</Link>
              </button>
              <button className="text-white hover:text-gray-200">
                <Link to="/register">Register</Link>
              </button>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </main>
  );
}
