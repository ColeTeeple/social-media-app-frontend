import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "../App.css";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const navigate = useNavigate();

  const initialValues = {
    title: "",
    postText: "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("You must input a title"),
    postText: Yup.string().required(),
  });

  const onSubmit = (data) => {
    axios
      .post("https://ct2-social-media-app-api-fbe02f4bafbc.herokuapp.com/posts", data, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        console.log("It worked");
        navigate("/");
      });
  };

  return (
    <div className="createPostPage">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="form-container">
          <label>Title:</label>
          <ErrorMessage name="title" element="span"></ErrorMessage>
          {/* names have to match SQL column names */}
          <Field id="input" name="title" placeholder="Enter Title" />
          <label>Post:</label>
          <ErrorMessage name="postText" element="span"></ErrorMessage>
          <Field
            id="input"
            name="postText"
            placeholder="Enter Text"
          />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};

export default CreatePost;
