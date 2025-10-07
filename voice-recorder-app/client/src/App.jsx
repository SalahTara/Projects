import MicIcon from "../src/assets/microphone.png";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  return (
    <main className="Main bg-gray-300 min-h-screen">
      <div className="NavbarContainer bg-gradient-to-r from-gray-800 to-gray-600 text-white px-6 py-4 shadow-lg flex justify-between items-center">
        {/* Left Side */}
        <button className="hover:cursor-pointer">
          <div
            onClick={() => {
              navigate("/");
            }}
            className="homeContainer flex justify-center items-center"
          >
            <img className="w-auto h-9" src={MicIcon}></img>
            <div className="pl-2 font-mono">Voicely</div>
          </div>
        </button>
        {/* Right Side */}
        <div className="loginContainer font-mono">
          <button
            onClick={() => {
              navigate("/login");
            }}
            className="hover:cursor-pointer"
          >
            Login
          </button>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </main>
  );
}

export default App;
