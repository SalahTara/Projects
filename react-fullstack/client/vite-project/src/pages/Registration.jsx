import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Registration() {
  let navigate = useNavigate();
  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(4).max(20).required(),
  });

  const onSubmit = (data) => {
    axios
      .post(
        "https://full-stack-api-posts-app-8d7221af6ca5.herokuapp.com/auth",
        data
      )
      .then(() => {
        console.log(data);
        navigate("/");
      });
  };

  return (
    <div className="registration-page">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Username: </label>
          <ErrorMessage name="username" component="span" />
          <Field
            className="field"
            autoComplete="off"
            id="inputUsername"
            name="username"
            placeholder="Your Username"
          />

          <label>Password: </label>
          <ErrorMessage name="password" component="span" />
          <Field
            className="field"
            autoComplete="off"
            id="inputPassword"
            name="password"
            p
            laceholder="Your Password..."
            type="password"
          />
          <button type="submit">Register</button>
        </Form>
      </Formik>
    </div>
  );
}

export default Registration;
