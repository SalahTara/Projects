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
    axios
      .get(
        `https://full-stack-server-salaheddin-0e99fd015aab.herokuapp.com/posts/byId/${id}`
      )
      .then((response) => {
        setPostObject(response.data);
      });

    axios
      .get(
        `https://full-stack-server-salaheddin-0e99fd015aab.herokuapp.com/comments/${id}`
      )
      .then((response) => {
        setComments(response.data);
      });

    axios
      .get(
        `https://full-stack-server-salaheddin-0e99fd015aab.herokuapp.com/posts/${id}`
      )
      .then((response) => {
        setListOfPosts(response.data);
      });
  }, []);

  const addComment = () => {
    axios
      .post(
        "https://full-stack-server-salaheddin-0e99fd015aab.herokuapp.com/comments",
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
      .delete(
        `https://full-stack-server-salaheddin-0e99fd015aab.herokuapp.com/comments/${id}`,
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      )
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
      .delete(
        `https://full-stack-server-salaheddin-0e99fd015aab.herokuapp.com/posts/${id}`,
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      )
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
        "https://full-stack-server-salaheddin-0e99fd015aab.herokuapp.com/posts/title",
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
        "https://full-stack-server-salaheddin-0e99fd015aab.herokuapp.com/posts/body",
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
    <div className="postPage">
      <div className="leftSide">
        <div className="post" id="individual">
          <div
            className="title"
            onClick={() => {
              if (authState.username === postObject.username) {
                editPost("title");
              }
            }}
          >
            {postObject.title}
          </div>
          <div
            className="body"
            onClick={() => {
              if (authState.username === postObject.username) {
                editPost("body");
              }
            }}
          >
            {postObject.postText}
          </div>
          <div className="footer">
            {postObject.username}
            {authState.username === postObject.username && (
              <DeleteIcon
                onClick={() => {
                  deletePost(id);
                  navigate("/");
                }}
              ></DeleteIcon>
            )}
          </div>
        </div>
      </div>
      <div className="rightSide">
        <div className="addCommentContainer">
          <input
            type="text"
            placeholder="Comment..."
            autoComplete="off"
            value={newComment}
            onChange={(event) => {
              setNewComment(event.target.value);
            }}
          />
          <button onClick={addComment}> Add Comment</button>
        </div>
        <div className="listOfComments">
          {comments.map((comment, key) => {
            return (
              <div key={key} className="comment">
                {comment.commentBody}
                <label> Username: {comment.username}</label>
                {authState.username === comment.username && (
                  <button
                    onClick={() => {
                      deleteComment(comment.id);
                    }}
                  >
                    X
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Post;
