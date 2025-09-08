import React, { useState } from "react";
import axios from "axios";
function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const changePassword = () => {
    axios
      .put(
        "http://localhost:3005/auth/changepassword",
        {
          oldPassword: oldPassword,
          newPassword: newPassword,
        },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      )
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        }
      });
  };
  return (
    <div className="changePasswordPage container">
      <h1 className="title-xl">Change Your Password</h1>

      <div className="card grid">
        <div className="cp-field">
          <input
            className="input"
            type="password"
            placeholder="Current Password..."
            onChange={(e) => {
              setOldPassword(e.target.value);
            }}
          />
        </div>

        <div className="cp-field">
          <input
            className="input"
            type="password"
            placeholder="New Password..."
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
          />
        </div>

        <div className="space">
          <button className="btn btn-primary" onClick={changePassword}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
