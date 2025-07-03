"use client"

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { signIn } from "../features/auth/authSlice";
import { useSignUpMutation } from "../features/services/signApi";

type FormFields = {
  name: string,
  phoneOrUserName: string,
  password: string,
  confirm_password: string,
}
const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormFields>();
  const dispatch = useDispatch();
  const [signUpApi, { isLoading, error }] = useSignUpMutation();
  const password = watch("password");

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      // Remove confirm_password before sending to API
      const { confirm_password, ...submitData } = data;
      const result = await signUpApi(submitData).unwrap();
      dispatch(signIn(result.user)); // assuming API returns { user, token }
      // Optionally store token, redirect, etc.
    } catch (err) {
      // handle error (show message, etc.)
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters",
              },
            })}
            placeholder="Your name"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Phone or Username */}
        <div>
          <label className="block text-sm font-medium mb-1">Phone or Username</label>
          <input
            type="text"
            {...register("phoneOrUserName", {
              required: "Phone or username is required",
              minLength: {
                value: 4,
                message: "Must be at least 4 characters",
              },
            })}
            placeholder="01XXXXXXXX or username"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.phoneOrUserName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.phoneOrUserName.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            placeholder="Your password"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium mb-1">Confirm Password</label>
          <input
            type="password"
            {...register("confirm_password", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            placeholder="Confirm password"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.confirm_password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirm_password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          disabled={isLoading}
        >
          {isLoading ? "Signing Up..." : "Sign Up"}
        </button>
        {error && (
          <p className="text-red-500 text-sm mt-2">Sign up failed. Please try again.</p>
        )}
      </form>
    </div>
  );
};

export default SignUpForm;
