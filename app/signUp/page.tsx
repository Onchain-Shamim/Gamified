"use client"

import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../features/auth/authSlice";
import { useSignUpMutation } from "../features/services/usersApi";
import { useRouter } from "next/navigation";

type FormFields = {
  name: string,
  phone: string,
  password: string,
}
const SignUpForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormFields>();
  const dispatch = useDispatch();
  const auth = useSelector((state: any) => state.auth);
  const [signUpApi, { isLoading, isSuccess , isError, error, data }] = useSignUpMutation();
  const password = watch("password");

  useEffect(() => {
    if(!isLoading){
      if(isSuccess){
        console.log("Sign Up Successful: ", data);
        dispatch(signIn(data?.data));
        router.push("/private/profile"); // or your desired route
      }
      if(isError){
        console.log("Sign Up Error:", (error as any)?.data?.error?.message)
      }
    }
  }, [isLoading, isSuccess, isError, data, error, dispatch, router]);

  useEffect(() => {
    if(!auth?.isLoading && auth?.user){
      router.push("/private/profile");
    }
  }, [auth, router]);

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const result = await signUpApi(data).unwrap();
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

        {/* Phone number */}
        <div>
          <label className="block text-sm font-medium mb-1">Phone number</label>
          <input
            type="text"
            {...register("phone", {
              required: "Phone number is required",
              minLength: {
                value: 4,
                message: "Must be at least 4 characters",
              },
            })}
            placeholder="phone number"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">
              {errors.phone.message}
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
          {isLoading ? "Signing Up..." : "Sign Up"}
        </button>
        {error && (
          <p className="text-red-500 text-sm mt-2">Sign up failed. Please try again.</p>
        )}
        {/* Show success only after a successful sign up */}
        {isSuccess && !isLoading && !error && (
          <p className="text-green-600 text-sm mt-2 text-center font-semibold">User sign up successful!</p>
        )}
      </form>
    </div>
  );
};

export default SignUpForm;
