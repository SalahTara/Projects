import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
import DeleteIcon from "@mui/icons-material/Delete";

function Post() {
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);
  const [listOfPosts, setListOfPosts] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { authState } = useContext(AuthContext);
  let navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3005/posts/byId/${id}`).then((response) => {
      setPostObject(response.data);
    });

    axios.get(`http://localhost:3005/comments/${id}`).then((response) => {
      setComments(response.data);
    });

    axios.get(`http://localhost:3005/posts/${id}`).then((response) => {
      setListOfPosts(response.data);
    });
  }, []);

  const addComment = () => {
    axios
      .post(
        "http://localhost:3005/comments",
        {
          commentBody: newComment,
          PostId: id,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          const commentToAdd = {
            commentBody: newComment,
            username: response.data.username,
            id: id,
          };
          setComments([...comments, commentToAdd]);
          setNewComment("");
        }
      });
  };
  const deleteComment = (id) => {
    axios
      .delete(`http://localhost:3005/comments/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        setComments(
          comments.filter((val) => {
            return val.id != id;
          })
        );
      });
  };

  const deletePost = (id) => {
    axios
      .delete(`http://localhost:3005/posts/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        setPostObject({});
        setListOfPosts(
          listOfPosts.filter((val) => {
            return val.id != id;
          })
        );
      });
    navigate("/");
  };

  const editPost = (option) => {
    let newTitle = "";
    let newBody = "";
    if (option === "title") {
      newTitle = prompt("Enter New Title: ");
      axios.put(
        "http://localhost:3005/posts/title",
        {
          newTitle: newTitle,
          id: id,
        },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      );
      setPostObject({ ...postObject, title: newTitle });
    } else {
      newBody = prompt("Enter New Text");
      axios.put(
        "http://localhost:3005/posts/body",
        {
          newBody: newBody,
          id: id,
        },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      );
      setPostObject({ ...postObject, postText: newBody });
    }
  };

  return (
    <div className="postPage container grid-2">
      {/* Left Side: Post */}
      <div className="leftSide">
        <div className="card" id="individual">
          <div
            className="title-lg"
            onClick={() => {
              if (authState.username === postObject.username) {
                editPost("title");
              }
            }}
          >
            {postObject.title}
          </div>

          <div
            className="body-text"
            onClick={() => {
              if (authState.username === postObject.username) {
                editPost("body");
              }
            }}
          >
            {postObject.postText}
          </div>

          <div className="space muted">
            <span>{postObject.username}</span>
            {authState.username === postObject.username && (
              <DeleteIcon
                style={{ cursor: "pointer" }}
                onClick={() => {
                  deletePost(id);
                  navigate("/");
                }}
              />
            )}
          </div>
        </div>
      </div>

      {/* Right Side: Comments */}
      <div className="rightSide grid" style={{ gap: "1.25rem" }}>
        <div className="card row addCommentContainer">
          <input
            type="text"
            className="input"
            placeholder="Comment..."
            autoComplete="off"
            value={newComment}
            onChange={(event) => {
              setNewComment(event.target.value);
            }}
          />
          <button className="btn btn-primary" onClick={addComment}>
            Add Comment
          </button>
        </div>

        <div className="listOfComments grid">
          {comments.map((comment, key) => (
            <div
              key={key}
              className="card comment grid"
              style={{ gap: ".5rem" }}
            >
              <div className="body-text">{comment.commentBody}</div>
              <label className="muted">Username: {comment.username}</label>
              {authState.username === comment.username && (
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    deleteComment(comment.id);
                  }}
                >
                  X
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Post;
