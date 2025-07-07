"use client"
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";
import { signIn } from "../features/auth/authSlice";
import { useSignInMutation } from "../features/services/usersApi";
import { useRouter } from "next/navigation";

type FormFields = {
  phoneOrUserName: string,
  password: string,
};

const SignInForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormFields>();
  const dispatch = useDispatch();
  const auth = useSelector((state: any) => state.auth);
  const [signInApi, { isLoading, isSuccess , isError,error, data }] = useSignInMutation();
  const password = watch("password");

  useEffect(() => {
    if(!isLoading){
      if(isSuccess){
        console.log("Sign In Successful: ", data);// or your desired route
        dispatch(signIn(data?.data)); // assuming API returns { user, token }
        router.push("/private/profile"); // assuming API returns { user, token }
      }
      if(isError){
        console.log("Sign In Error:", (error as any)?.data?.error?.message)
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
      const result = await signInApi(data).unwrap();
      console.log("Sign In Result: ", result);
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
        {/* phoneOrUserName */}
        <div>
          <label className="block text-sm font-medium mb-1">phoneOrUserName</label>
          <input
            type="text"
            {...register("phoneOrUserName", {
              required: "phoneOrUserName is required",
              minLength: {
                value: 4,
                message: "Must be at least 4 characters",
              },
            })}
            placeholder="phoneOrUserName number"
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
        {isError && 
          (error as any)?.data?.error?.message && (
            <p className="text-red-500 text-sm mt-2">
              {(error as any)?.data?.error?.message}
            </p>
        )}
        {/* Show success only after a successful sign in */}

      </form>
    </div>
  );
};

export default SignInForm;