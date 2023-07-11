import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  let { id } = useParams();
  const [username, setUsername] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get(`https://ct2-social-media-app-api-fbe02f4bafbc.herokuapp.com/auth/${id}`).then((response) => {
      setUsername(response.data.username);
    });

    axios.get(`https://ct2-social-media-app-api-fbe02f4bafbc.herokuapp.com/posts/${id}`).then((response) => {
      setPosts(response.data);
      console.log(response.data[0].title);
    });
  }, []);

  return (
    <div className="profile-container">
      <div className="info">
        <h3>Username: {username}</h3>
      </div>
        {posts.map((post, key) => {
          return (
            <div className="post" key={key}>
            <div className="title">{post.title}</div>
            <div className="body" onClick={() => navigate(`/post/${post.id}`)}>{post.postText}</div>
            <div className="footer">{post.username}</div>
            </div>
          )
        })}
    </div>
  );
};

export default Profile;
