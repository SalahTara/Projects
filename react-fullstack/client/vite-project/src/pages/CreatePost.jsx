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
    if (!authState.status) {
      navigate("/login");
    }
  }, []);
  const initialValues = {
    title: "",
    postText: "",
  };
  const onSubmit = (data) => {
    axios
      .post("http://localhost:3001/posts", data, {
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

          <button type="submit">Create Post</button>
        </Form>
      </Formik>
    </div>
  );
}

export default createpost;
