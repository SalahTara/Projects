import "./App.css";
import ProfilePage from "./pages/ProfilePage";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";
import PageNotFound from "./pages/PageNotFound";
import ChangePassword from "./pages/ChangePassword";

function App() {
  const [loading, setLoading] = useState(true);
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false });
  };

  useEffect(() => {
    axios
      .get(
        `https://full-stack-api-posts-app-8d7221af6ca5.herokuapp.com/auth/auth`,
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      )
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className="navbar">
            <div className="links">
              {authState.status ? (
                <>
                  <Link to="/createpost">Create A Post</Link>
                  <Link to="/">Home Page</Link>
                </>
              ) : (
                ""
              )}
              {!authState.status ? (
                <>
                  <Link to="/login">Login</Link>
                  <Link to="/registration">Registration</Link>
                </>
              ) : (
                ""
              )}
            </div>
            <div className="loggedInContainer">
              <h1>{authState.username}</h1>
              {authState.status && <button onClick={logout}>Log Out</button>}
            </div>
          </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/createpost" element={<CreatePost />} />
            <Route path="post/:id" element={<Post />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/profile/:id" element={<ProfilePage />} />
            <Route path="/changepassword" element={<ChangePassword />} />
            <Route path="*" exact element={<PageNotFound />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
