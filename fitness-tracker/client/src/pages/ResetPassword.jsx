import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import KeyIcon from "@mui/icons-material/Key";
function ResetPassword() {
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const resetPassword = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:3000/auth/reset-password",
      {
        email: email,
        oldPassword: oldPassword,
        newPassword: newPassword,
      }
    );
    console.log(response);
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <KeyIcon sx={{ fontSize: 150, color: "GrayText" }} />
      <Box sx={{ fontSize: 50, mb: 10 }}>Reset Password</Box>
      <TextField
        id="outlined-basic"
        label="Email"
        variant="outlined"
        sx={{ width: 400 }}
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <TextField
        id="outlined-basic"
        label="Old Password"
        variant="outlined"
        sx={{ marginY: 2, width: 400 }}
        value={oldPassword}
        onChange={(e) => {
          setOldPassword(e.target.value);
        }}
      />
      <TextField
        id="outlined-basic"
        label="New Password"
        variant="outlined"
        sx={{ width: 400 }}
        value={newPassword}
        onChange={(e) => {
          setNewPassword(e.target.value);
        }}
      />
      <form onSubmit={resetPassword}>
        <Button
          variant="contained"
          sx={{ marginY: 2, width: 400, textTransform: "none", mb: 35 }}
          type="submit"
        >
          Change Password
        </Button>
      </form>
    </Box>
  );
}

export default ResetPassword;
