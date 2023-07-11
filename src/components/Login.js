import React, { useState, useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "../App.css";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const Login = () => {
  const { setAuthState } = useAuthContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(5).required("You must input a username"),
    password: Yup.string()
      .min(4)
      .max(20)
      .required("Password must be between 4 and 20 characters"),
  });

  const login = () => {
    axios
      .post("https://ct2-social-media-app-api-fbe02f4bafbc.herokuapp.com/auth/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        if (response.data.error) {
          alert("An error occurred.");
        } else {
          localStorage.setItem("accessToken", response.data.token);
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
          navigate("/");
        }
        console.log(response.data);
      });
  };

  return (
    <div className="outer-body">
    <div className="form-container">
      <label>Username:</label>
      <input
        type="text"
        onChange={(e) => setUsername(e.target.value)}
        id="input"
        placeholder="Username"
      ></input>
      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        id="input"
        placeholder="Password"
      ></input>
      <button onClick={login}>Login</button>
    </div>
    </div>
  );
};

export default Login;
