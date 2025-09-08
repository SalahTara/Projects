import "../index.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { User, KeyRound } from "lucide-react";
import axios from "axios";

const schema = z.object({
  username: z
    .string()
    .min(5, { message: "Username must be at least 5 characters." }),
  password: z
    .string()
    .min(5, { message: "Password must be at least 5 characters." }),
});

function Register() {
  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { username: "", password: "" },
  });

  const signUp = (values) => {
    axios.post("http://localhost:3005/users", values);
    navigate("/login");
    console.log("User Signed Up Successfully");
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
        Welcome!
      </div>
      {/* Form HTML */}
      <form
        onSubmit={handleSubmit(signUp)}
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
            type="text"
            placeholder="Password..."
          ></input>
        </div>

        <button
          className="self-center hover:cursor-pointer transform transition duration-10 hover:scale-101 active:scale-99 bg-linear-30 mt-7 bg-gradient-to-r from-green-500 via-green-400 to-green-500 border-2 rounded-2xl
             w-80"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Loading..." : "Sign Up"}
        </button>

        <div className="flex justify-center pt-5">
          <button
            onClick={() => {
              navigate("/login");
            }}
            className="underline text-blue-500 hover:cursor-pointer"
          >
            Already have an Account?
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
