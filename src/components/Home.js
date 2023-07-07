import React, { useEffect, useState } from "react";
import "../App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const Home = () => {
  const [listOfPosts, setListOfPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/posts/").then((response) => {
      console.log(response);
      setListOfPosts(response.data);
    });
  }, []);

  const likePost = (postId) => {
    axios.post(
      "http://localhost:3001/likes",
      { PostId: postId },
      { headers: { accessToken: localStorage.getItem("accessToken") } }
    )
    .then((response) => {
      setListOfPosts(listOfPosts.map((val) => {
        if (val.id == postId) {
          if (response.data.liked) {
            return {...val, Likes: [...val.Likes, 0]}
          }
          else {
            const likesArray = val.Likes;
            likesArray.pop();
            return {...val, Likes: likesArray}
          }
        }
        else {
          return val;
        }
      }))
    })
  };

  return (
    <div>
      {listOfPosts.map((val, key) => {
        return (
          <div className="post">
            <div className="title">{val.title}</div>
            <div className="body" onClick={() => navigate(`/post/${val.id}`)}>{val.postText}</div>
            <div className="footer">
              -{val.username}{" "}
              <Button onClick={() => likePost(val.id)} id="like-button" variant="light">Like</Button>
              <label>{val.Likes.length}</label>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
