import React, { use } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useContext } from "react";
import { useState } from "react";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { AuthContext } from "../helpers/AuthContext";

function ProfilePage() {
  let { id } = useParams();
  const [username, setUsername] = useState("");
  const [listOfPosts, setListOfPosts] = useState([]);
  const { authState } = useContext(AuthContext);
  let navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3005/auth/basicinfo/${id}`).then((response) => {
      setUsername(response.data.username);
    });
    axios.get(`http://localhost:3005/posts/byUserId/${id}`).then((response) => {
      setListOfPosts(response.data);
    });
  }, []);

  return (
    <div
      className="profilePageContainer container grid"
      style={{ gap: "1.5rem" }}
    >
      {/* Basic Info */}
      <div className="card space basicInfo">
        <h1 className="title-lg">Username: {username}</h1>
        {authState.username === username && (
          <button
            className="btn btn-primary"
            onClick={() => {
              navigate("/changepassword");
            }}
          >
            Reset Password
          </button>
        )}
      </div>

      {/* Posts */}
      <div className="profile-posts grid">
        {listOfPosts.map((value, key) => (
          <div className="card grid" key={key} style={{ gap: ".6rem" }}>
            <div className="title-lg">{value.title}</div>

            <div
              className="body-text"
              onClick={() => {
                navigate(`/post/${value.id}`);
              }}
              style={{ cursor: "pointer" }}
            >
              {value.postText}
            </div>

            <div className="space muted">
              <span className="link">{value.username}</span>
              <div className="row">
                <ThumbUpAltIcon />
                <label className="profile-like-count">
                  {value.Likes.length}
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfilePage;
