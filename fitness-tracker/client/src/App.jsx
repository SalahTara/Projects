import Signup from "./pages/Signup.jsx";
import Splash from "./pages/Splash.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import { CssBaseline, Box, ThemeProvider, Button } from "@mui/material";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import theme from "../theme.js";
import { AuthContext } from "../helpers/AuthContext.js";
import { useState } from "react";

function App() {
  const [userInfo, setUserInfo] = useState({
    name: "",
    picture: "",
    email: "",
  });
  return (
    <AuthContext.Provider value={{ userInfo, setUserInfo }}>
      <ThemeProvider theme={theme}>
        <Router>
          <CssBaseline /> {/* Resets any default CSS values */}
          {/* Navigation Bar */}
          <Box
            className="Navbar"
            sx={{
              backgroundColor: "#F9FAFB",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 1,
            }}
          >
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              <Box
                className="left-navbar"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Box
                  component="img"
                  src="placeholder-logo.png"
                  alt="Company Logo"
                  sx={{ maxBlockSize: 30 }}
                />
                <Box sx={{ fontSize: 28, ml: 1 }}>Pulse</Box>
              </Box>
            </Link>

            <Box className="right-navbar">
              <Link to="/login">
                <Button
                  className="login"
                  variant="text"
                  disableRipple
                  sx={{ textTransform: "none", mr: 1 }}
                >
                  Log in
                </Button>
              </Link>

              <Link to="/signup">
                <Button
                  className="sign-up"
                  variant="contained"
                  disableRipple
                  sx={{ textTransform: "none" }}
                >
                  Sign up
                </Button>
              </Link>
            </Box>
          </Box>
          {/* ---------- */}
          <Routes>
            <Route path="/" element={<Splash />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/home" element={<Home />} />
            <Route path="reset-password" element={<ResetPassword />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthContext.Provider>
  );
}

export default App;
