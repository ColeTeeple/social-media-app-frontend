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
    username: Yup.string().min(3).max(15).required("You must input a username"),
    password: Yup.string()
      .min(4)
      .max(20)
      .required("Password must be between 4 and 20 characters"),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/auth", data)
    .then((response) => {
        navigate("/");
    })
  }

  return (
    <div className="outer-body">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
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
