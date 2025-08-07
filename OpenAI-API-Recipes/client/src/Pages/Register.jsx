import "../index.css";
import React from "react";

function Register() {
  return (
    <div className="bg-red-200">
      <input type="text" placeholder="Username..."></input>
      <input type="text" placeholder="Password..."></input>
      <button className="hover:cursor-pointer">Register</button>
    </div>
  );
}

export default Register;
