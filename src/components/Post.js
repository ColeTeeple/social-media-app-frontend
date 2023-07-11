import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";
import { useAuthContext } from "../context/AuthContext";
import { Button } from "react-bootstrap";

const Post = () => {
  const { authState, setAuthState } = useAuthContext();
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://ct2-social-media-app-api-fbe02f4bafbc.herokuapp.com/posts/byId/${id}`).then((response) => {
      setPostObject(response.data);
    });

    axios.get(`https://ct2-social-media-app-api-fbe02f4bafbc.herokuapp.com/comments/${id}`).then((response) => {
      setComments(response.data);
      console.log(comments);
    });
  }, []);

  const addComment = () => {
    axios
      .post(
        `https://ct2-social-media-app-api-fbe02f4bafbc.herokuapp.com/comments`,
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
          };
          setComments([...comments, commentToAdd]);
          setNewComment("");
        }
      });
  };

  const removeComment = (commentId) => {
    axios
      .delete(`https://ct2-social-media-app-api-fbe02f4bafbc.herokuapp.com/comments/${commentId}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        setComments(
          comments.filter((val) => {
            return val.id != commentId;
          })
        );
      });
  };

  const deletePost = (postId) => {
    axios
      .delete(`https://ct2-social-media-app-api-fbe02f4bafbc.herokuapp.com/posts/${postId}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        console.log("Delete request successful.");
        navigate("/");
      });
  };

  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="post" id="individual">
          <div className="title">{postObject.title}</div>
          <div className="body">{postObject.postText}</div>
          <div className="footer">
            -{postObject.username}
            
          </div>
          <div id="delete-post-div">
          {authState.username == postObject.username && (
              <Button
                onClick={() => deletePost(postObject.id)}
                id="delete-post-button"
                size="sm"
                variant="dark"
              >
                Delete Post
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="rightSide">
        <div className="addCommentContainer">
          <input
            type="text"
            placeholder="Comment"
            autoComplete="off"
            onChange={(e) => setNewComment(e.target.value)}
          ></input>
          <button onClick={addComment} type="submit" id="add-comment-button">
            Add Comment
          </button>
        </div>
        <div className="listOfComments">
          {comments.map((val, key) => {
            return (
              <>
                <div className="comment" key={key}>
                  {val.commentBody}
                  <br></br>
                  <label> -{val.username}</label>
                
                </div>
                <div className="comment" id="comment-bottom">{authState.username == val.username && (
                    <Button
                      onClick={() => removeComment(val.id)}
                      id="delete-comment-button"
                      variant="dark"
                    >
                      Delete
                    </Button>
                  )}</div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Post;
