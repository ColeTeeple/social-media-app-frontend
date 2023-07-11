import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Route, Routes, Link } from "react-router-dom";
import Home from "./components/Home";
import CreatePost from "./components/NewPost";
import Post from "./components/Post";
import Login from "./components/Login";
import Registration from "./components/Registration";
import PageNotFound from "./components/PageNotFound";
import Profile from "./components/Profile";
import { useAuthContext } from "./context/AuthContext";
import { Button } from "react-bootstrap";

function App() {
  const { authState, setAuthState } = useAuthContext();
  useEffect(() => {
    axios
      .get("https://ct2-social-media-app-api-fbe02f4bafbc.herokuapp.com/auth/auth", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({...authState, status: false});
        } else {
          setAuthState({username: response.data.username, id: response.data.id, status: true});
        }
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({username: "", id: 0, status: false});
  }

  return (
    <div className="App">
      <div className="navbar" id="navbar">
        <Link to="/" id="link">Home</Link>
        <Link to="/create">Create Post</Link>

        {!authState.status ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="registration">Register</Link>
          </>
        ) : (
          <>
          <Link to={`/profile/${authState.id}`} element={<Profile/>}>Profile</Link>
          <Button onClick={logout} variant="dark">Logout</Button>
          </>
        )}
      </div>

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/create" element={<CreatePost />}></Route>
        <Route path="/post/:id" element={<Post />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/registration" element={<Registration />}></Route>
        <Route path="/profile/:id" element={<Profile/>}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
