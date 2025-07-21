import React, { useContext } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { AuthContext } from "../helpers/AuthContext";

function Home() {
  const [listOfPosts, setListOfPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const { authState } = useContext(AuthContext);
  let navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      if (!localStorage.getItem("accessToken")) {
        navigate("/login");
      } else {
        try {
          const response = await axios.get("https://full-stack-api-posts-app-8d7221af6ca5.herokuapp.com/posts", {
            headers: { accessToken: localStorage.getItem("accessToken") },
          });

          setListOfPosts(response.data.listOfPosts);
          setLikedPosts(response.data.likedPosts.map((like) => like.PostId));
        } catch (error) {
          console.error("Failed to fetch posts", error);
        }
      }
    };

    checkAuth();
  }, []);

  const likeAPost = (postId) => {
    axios
      .post(
        "https://full-stack-api-posts-app-8d7221af6ca5.herokuapp.com/likes",
        { PostId: postId },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      )
      .then((response) => {
        setListOfPosts(
          listOfPosts.map((post) => {
            if (post.id === postId) {
              if (response.data.liked === true) {
                return { ...post, Likes: [...post.Likes, 0] };
              } else {
                const likesArray = post.Likes;
                likesArray.pop();
                return { ...post, Likes: likesArray };
              }
            } else {
              return post;
            }
          })
        );
        if (likedPosts.includes(postId)) {
          setLikedPosts(
            likedPosts.filter((id) => {
              return id != postId;
            })
          );
        } else {
          setLikedPosts([...likedPosts, postId]);
        }
      });
  };

  return (
    <div className="App">
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
              <div
              // className="username"
              // onClick={() => {
              //   navigate(`/profile/${value.UserId}`);
              // }}
              >
                <Link to={`/profile/${value.UserId}`}>{value.username}</Link>
              </div>
              <div className="buttons">
                <ThumbUpAltIcon
                  onClick={() => {
                    likeAPost(value.id);
                  }}
                  className={
                    likedPosts.includes(value.id) ? "unlikeBttn" : "likeBttn"
                  }
                />

                <label>{value.Likes.length}</label>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
