import React, { useContext, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

function createpost() {
  const { authState } = useContext(AuthContext);
  let navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    }
  }, []);
  const initialValues = {
    title: "",
    postText: "",
  };
  const onSubmit = (data) => {
    axios
      .post("http://localhost:3005/posts", data, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        navigate("/");
      });
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("You must have a title"),
    postText: Yup.string().required(),
  });

  return (
    <div className="createPostPage container">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="card grid formContainer">
          <label className="title-lg">Title:</label>
          <ErrorMessage
            name="title-error"
            component="span"
            className="error-text"
          />
          <Field
            className="input"
            autoComplete="off"
            id="inputCreatePost"
            name="title"
            placeholder="(Ex. title...)"
          />

          <label className="title-lg">Post:</label>
          <ErrorMessage
            name="postText-error"
            component="span"
            className="error-text"
          />
          <Field
            as="textarea"
            rows="4"
            className="textarea"
            autoComplete="off"
            id="inputCreatePost"
            name="postText"
            placeholder="(Ex. Hi I'm John...)"
          />

          <button type="submit" className="btn btn-primary">
            Create Post
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default createpost;
