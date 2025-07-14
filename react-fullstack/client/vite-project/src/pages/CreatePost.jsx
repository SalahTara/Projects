import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function createpost() {
  const initialValues = {
    title: "",
    postText: "",
    username: "",
  };
  const onSubmit = (data) => {
    axios.post("http://localhost:3001/posts", data).then((response) => {
      navigate("/");
    });
  };

  let navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("You must have a title"),
    postText: Yup.string().required(),
    username: Yup.string().min(3).max(15).required(),
  });
  return (
    <div className="createPostPage">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Title: </label>
          <ErrorMessage name="title-error" component="span" />
          <Field
            className="field"
            autoComplete="off"
            id="inputCreatePost"
            name="title"
            placeholder="(Ex. title...)"
          />
          <label>Post: </label>
          <ErrorMessage name="postText-error" component="span" />
          <Field
            className="field"
            autoComplete="off"
            id="inputCreatePost"
            name="postText"
            placeholder="(Ex. Hi I'm Johm...)"
          />
          <label>Username: </label>
          <ErrorMessage name="username-error" component="span" />
          <Field
            className="field"
            autoComplete="off"
            id="inputCreatePost"
            name="username"
            placeholder="(Ex. John...)"
          />
          <button type="submit">Create Post</button>
        </Form>
      </Formik>
    </div>
  );
}

export default createpost;
