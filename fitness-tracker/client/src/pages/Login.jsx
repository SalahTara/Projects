import React from "react";
import theme from "../../theme";
import { Box, Button, TextField, ThemeProvider } from "@mui/material";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../helpers/AuthContext";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUserInfo } = useContext(AuthContext);
  const emailLogin = async (e) => {
    e.preventDefault();

    try {
      const create_account = await axios.post(
        "http://localhost:3000/auth/login",
        {
          email: email,
          password: password,
        }
      );
      navigate("/home");
      setUserInfo;
      console.log(create_account);
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
    }
    const create_account = await axios.post(
      "http://localhost:3000/auth/login",
      {
        email: email,
        password: password,
      }
    );
    setUserInfo({});
    navigate("/home");
    console.log(create_account);
  };
  const googleLogin = useGoogleLogin({
    onSuccess: async ({ code }) => {
      const tokens = await axios.post("http://localhost:3000/auth/google", {
        code,
      });

      console.log(tokens);
    },
    flow: "auth-code",
  });
  return (
    <ThemeProvider theme={theme}>
      <Box
        className="main-container"
        sx={{
          height: "95vh",
          display: "flex",
          flexDirection: "row",
          flex: 1,
        }}
      >
        <Box
          className="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "50%",
          }}
        >
          <Box sx={{ fontSize: 42 }}>Log in</Box>
          <Button
            onClick={() => googleLogin()}
            variant="contained"
            disableElevation
            sx={{
              display: "flex",
              justifyContent: "start",
              mt: 2,
              width: 400,
              backgroundColor: "#efeeeeff",
              borderRadius: 3,
            }}
          >
            <Box component="img" src="../google.png" sx={{ height: 20 }} />
            <Box
              sx={{
                textTransform: "none",
                color: "#1A1A1A",
                ml: 11,
                pt: 0.5,
                pb: 0.5,
                fontSize: 16,
              }}
            >
              Log in with Google
            </Box>
          </Button>
          <Box sx={{ marginY: 2, color: "gray", fontSize: 12 }}>
            or log in with email
          </Box>
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
            label="Password"
            variant="outlined"
            sx={{ marginY: 2, width: 400 }}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <form onSubmit={emailLogin}>
            <Button
              component="button"
              variant="contained"
              sx={{ marginY: 2, width: 400, textTransform: "none", mb: 15 }}
              type="submit"
            >
              Log in
            </Button>
          </form>
        </Box>

        <Box
          component="img"
          src="https://placehold.co/800x910"
          sx={{
            width: "50%",
            height: "100%",
            objectFit: "cover",
            borderTopLeftRadius: "50%",
            borderBottomLeftRadius: "50%",
          }}
        />
      </Box>
    </ThemeProvider>
  );
}

export default Login;
