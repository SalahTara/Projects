import React from "react";
import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);
  let navigate = useNavigate();

  const login = () => {
    const data = { username: username, password: password };
    axios.post("http://localhost:3005/auth/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        localStorage.setItem("accessToken", response.data.token);
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
        });
        navigate("/");
      }
    });
  };

  return (
    <div className="loginContainer container">
      <div className="card grid">
        <input
          className="input"
          placeholder="Username"
          type="text"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />

        <input
          className="input"
          placeholder="Password"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <button
          className="btn btn-primary"
          onClick={login}
          type="submit"
          onSubmit={() => {
            navigate("/");
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
