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
    axios
      .get(
        `https://full-stack-api-posts-app-8d7221af6ca5.herokuapp.com/auth/basicinfo/${id}`
      )
      .then((response) => {
        setUsername(response.data.username);
      });
    axios
      .get(
        `https://full-stack-api-posts-app-8d7221af6ca5.herokuapp.com/posts/byUserId/${id}`
      )
      .then((response) => {
        setListOfPosts(response.data);
      });
  }, []);

  return (
    <div className="profilePageContainer">
      <div className="basicInfo">
        <h1>Username: {username}</h1>
        {authState.username === username && (
          <button
            onClick={() => {
              navigate("/changepassword");
            }}
          >
            Reset Password
          </button>
        )}
      </div>
      <div className="listOfPosts">
        {listOfPosts.map((value, key) => {
          return (
            <div className="post">
              <div className="title">{value.title}</div>
              <div
                className="body"
                onClick={() => {
                  navigate(`/post/${value.id}`);
                }}
              >
                {value.postText}
              </div>
              <div className="footer">
                <div className="username">{value.username}</div>
                <div className="buttons">
                  <ThumbUpAltIcon />

                  <label>{value.Likes.length}</label>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProfilePage;
