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
    axios.post("http://localhost:3005/auth", data).then(() => {
      console.log(data);
      navigate("/");
    });
  };

  return (
    <div className="registration-page container">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="card grid formContainer">
          <label className="title-lg">Username:</label>
          <ErrorMessage
            name="username"
            component="span"
            className="error-text"
          />
          <Field
            className="input"
            autoComplete="off"
            id="inputUsername"
            name="username"
            placeholder="Your Username"
          />

          <label className="title-lg">Password:</label>
          <ErrorMessage
            name="password"
            component="span"
            className="error-text"
          />
          <Field
            className="input"
            autoComplete="off"
            id="inputPassword"
            name="password"
            type="password"
            placeholder="Your Password..."
          />

          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default Registration;
