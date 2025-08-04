import { useState } from "react";
import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./Pages/Home";

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
            <h1 className="text-xl font-bold text-white">
              SQL Query Generator
            </h1>
            <div className="flex space-x-4">
              <button className="text-white hover:text-white">Login</button>
              <button className="text-white hover:text-white">Register</button>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </main>
  );
}
