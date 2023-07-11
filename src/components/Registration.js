import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "../App.css";
import * as Yup from "yup";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate();
  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(16).required("You must input a username"),
    password: Yup.string()
      .min(8)
      .max(16)
      .required("Password must be between 4 and 20 characters"),
  });

  const onSubmit = (data) => {
    axios.post("https://ct2-social-media-app-api-fbe02f4bafbc.herokuapp.com/auth", data)
    .then((response) => {
        navigate("/");
    })
  }

  return (
    <div className="outer-body">
      <Formik  onSubmit={onSubmit} initialValues={initialValues} validationSchema={validationSchema}>
        <Form className="form-container">
          <label>Username:</label>
          {/* names have to match SQL column names */}
          <ErrorMessage name="username" element="span"></ErrorMessage>
          <Field id="input" name="username" placeholder="Username" />
          <label>Password:</label>
          <ErrorMessage name="password" element="span"></ErrorMessage>
          <Field
            id="input"
            name="password"
            placeholder="Password"
          />
          <button type="submit">Register</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Registration;
