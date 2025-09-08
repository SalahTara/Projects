import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { User, KeyRound } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

const schema = z.object({
  username: z.string({ message: "Please enter a valid username." }),
  password: z
    .string()
    .min(5, { message: "Password must be at least 5 characters." }),
});

function Login() {
  let navigate = useNavigate();
  const { setAuthState } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { username: "", password: "" },
  });

  const signIn = async (values) => {
    try {
      const data = { username: values.username, password: values.password };
      axios.post("http://localhost:3005/users/login", data).then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        }

        if (response.data.token) {
          localStorage.setItem("accessToken", response.data.token);
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
          navigate("/");
        }
      });
    } catch (error) {
      setError("root", { message: "Invalid username or password." });
    }
  };

  return (
    <div className="loginPageContainer min-h-screen flex flex-col p-20 items-center bg-blue-100 bg-[url('../images/Login-BG.png')] bg-center">
      <div className="siteName flex flex-row justify-center items-center ">
        <img src="../images/SQL-Logo.png" className="w-10 pr-2 " />
        <div className="inline-block font-['Montserrat'] font-bold text-2xl subpixel-antialiased">
          SQL Query Generator
        </div>
      </div>
      <div className="welcomeMessage font-['Montserrat'] font-bold m-20 text-5xl">
        Good to See You Again!
      </div>
      {/* Form HTML */}
      <form
        onSubmit={handleSubmit(signIn)}
        className="formContainer flex flex-col justify-center bg-white w-full p-8
              max-w-sm         
              sm:max-w-md              
              md:max-w-lg              
              lg:max-w-xl
              shadow-2xl
              
              "
      >
        <div className="font-['Montserrat'] font-bold">Your username</div>
        {errors.username && (
          <div className="text-red-500">{errors.username.message}</div>
        )}
        <div className="usernameInputWrapper flex flex-row border-1 w-full p-1  ">
          <User className="border-r-1 border-gray-100 pr-1" />
          <input
            className="pl-1 focus:outline-none"
            {...register("username")}
            type="text"
            placeholder="Username..."
          ></input>
        </div>
        <div className="font-['Montserrat'] font-bold pt-5">Your password</div>
        {errors.password && (
          <div className="text-red-500">{errors.password.message}</div>
        )}
        <div className="passwordInputWrapper flex flex-row border-1 w-full p-1">
          <KeyRound className="border-r-1 border-gray-100 pr-1" />
          <input
            className="pl-1 focus:outline-none"
            {...register("password")}
            type="password"
            placeholder="Password..."
          ></input>
        </div>

        <button
          className="self-center hover:cursor-pointer transform transition duration-10 hover:scale-101 active:scale-99 bg-linear-30 mt-7 bg-gradient-to-r from-green-500 via-green-400 to-green-500 border-2 rounded-2xl
              w-80"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Loading..." : "Sign In"}
        </button>

        <div className="flex justify-around pt-5">
          <button
            type="button"
            onClick={() => {
              navigate("/register");
            }}
            className="underline text-blue-500 hover:cursor-pointer"
          >
            Don't have an Account?
          </button>
          <button
            type="button"
            onClick={() => {
              navigate("/changepassword");
            }}
            className="underline text-blue-500  hover:cursor-pointer"
          >
            Forgot Password?
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
