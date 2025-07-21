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
    axios
      .post(
        "https://full-stack-api-posts-app-8d7221af6ca5.herokuapp.com/auth/login",
        data
      )
      .then((response) => {
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
    <div className="loginContainer">
      <input
        placeholder="Username"
        type="text"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <input
        placeholder="Password"
        type="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />

      <button
        onClick={login}
        type="submit"
        onSubmit={() => {
          navigate("/");
        }}
      >
        Login
      </button>
    </div>
  );
}

export default Login;
