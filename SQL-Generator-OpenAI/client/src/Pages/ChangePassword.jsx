import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { User, KeyRound } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

const schema = z
  .object({
    username: z.string().min(1, "Please enter a valid username."),
    oldPassword: z
      .string()
      .min(5, { message: "Password must be at least 5 characters." }),
    newPassword: z
      .string()
      .min(5, { message: "Password must be at least 5 characters." }),
    confirmNewPassword: z
      .string()
      .min(5, { message: "Password must be at least 5 characters." }),
  })
  .refine((v) => v.newPassword === v.confirmNewPassword, {
    message: "Passwords do not match.",
    path: ["confirmNewPassword"],
  });

function ChangePassword() {
  let navigate = useNavigate();
  const { setAuthState } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const changePassword = async (values) => {
    const data = {
      username: values.username,
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
      confirmNewPassword: values.confirmNewPassword,
    };
    try {
      const response = await axios.put(
        "http://localhost:3005/users/changepassword",
        data
      );

      if (response.data?.error) {
        alert(response.data.error);
        return;
      }

      localStorage.removeItem("accessToken");
      setAuthState({ username: "", id: "", status: false });
      navigate("/login");
    } catch (err) {
      const msg =
        err?.response?.data?.error || err.message || "Something went wrong.";
      alert(msg);
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
        Change Your Password
      </div>
      {/* Form HTML */}
      <form
        onSubmit={handleSubmit(changePassword)}
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
        <div className="font-['Montserrat'] font-bold pt-5">Old password</div>
        {errors.oldPassword && (
          <div className="text-red-500">{errors.oldPassword.message}</div>
        )}
        <div className="passwordInputWrapper flex flex-row border-1 w-full p-1">
          <KeyRound className="border-r-1 border-gray-100 pr-1" />
          <input
            className="pl-1 focus:outline-none"
            {...register("oldPassword")}
            type="password"
            placeholder="Old Password..."
          ></input>
        </div>

        <div className="font-['Montserrat'] font-bold pt-5">New password</div>
        {errors.newPassword && (
          <div className="text-red-500">{errors.newPassword.message}</div>
        )}
        <div className="passwordInputWrapper flex flex-row border-1 w-full p-1">
          <KeyRound className="border-r-1 border-gray-100 pr-1" />
          <input
            className="pl-1 focus:outline-none"
            {...register("newPassword")}
            type="password"
            placeholder="New Password..."
          ></input>
        </div>

        <div className="font-['Montserrat'] font-bold pt-5">
          Confirm New password
        </div>
        {errors.confirmNewPassword && (
          <div className="text-red-500">
            {errors.confirmNewPassword.message}
          </div>
        )}
        <div className="passwordInputWrapper flex flex-row border-1 w-full p-1">
          <KeyRound className="border-r-1 border-gray-100 pr-1" />
          <input
            className="pl-1 focus:outline-none"
            {...register("confirmNewPassword")}
            type="password"
            placeholder="Confirm New Password..."
          ></input>
        </div>

        <button
          className="self-center hover:cursor-pointer transform transition duration-10 hover:scale-101 active:scale-99 bg-linear-30 mt-7 bg-gradient-to-r from-green-500 via-green-400 to-green-500 border-2 rounded-2xl
              w-80"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Loading..." : "Change Password"}
        </button>
      </form>
    </div>
  );
}

export default ChangePassword;
