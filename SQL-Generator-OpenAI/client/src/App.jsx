import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ChangePassword from "./Pages/ChangePassword";
import axios from "axios";
import { AuthContext } from "./helpers/AuthContext.js";

export default function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  const logOut = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false });
    window.location.href = "/";
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    axios
      .get("http://localhost:3005/users/", {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      })
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      });
  }, []);

  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      {/* NAVBAR ADDITION - Full width above the content */}
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <nav className="w-full bg-blue-600 shadow-sm p-4 border-b border-gray-200">
            <div className="mx-auto flex justify-between items-center w-full">
              <h1 className="text-xl font-bold text-white hover:text-gray-200">
                <Link to="/">𝕾𝕼𝕷 𝕼𝖚𝖊𝖗𝖞 𝕲𝖊𝖓𝖊𝖗𝖆𝖙𝖔𝖗</Link>
              </h1>
              <div className="flex space-x-4">
                {authState.status ? (
                  <div className="flex flex-row ">
                    <div className="mr-5 text-white">{authState.username}</div>
                    <button
                      className="text-white hover:text-gray-200 hover:cursor-pointer"
                      onClick={logOut}
                    >
                      Log out
                    </button>
                  </div>
                ) : (
                  <Link
                    className="text-white hover:text-gray-200 hover:cursor-pointer"
                    to="/login"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/changepassword" element={<ChangePassword />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </main>
  );
}
