"use client"
import React from "react";
import { useDispatch } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";
import { signIn } from "../features/auth/authSlice";
import { useSignInMutation } from "../features/services/signApi";

type FormFields = {
  phoneOrUserName: string,
  password: string,
};

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormFields>();
  const dispatch = useDispatch();
  const [signInApi, { isLoading, error }] = useSignInMutation();
  const password = watch("password");

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      console.log("Sign In Data:", data);
      const result = await signInApi(data).unwrap();
      dispatch(signIn(result.user)); // assuming API returns { user, token }
      // Optionally store token, redirect, etc.
    } catch (err) {
      // handle error (show message, etc.)
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          disabled={isLoading}
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </button>
        {error && (
          <p className="text-red-500 text-sm mt-2">Sign in failed. Please try again.</p>
        )}
      </form>
    </div>
  );
};

export default SignInForm;