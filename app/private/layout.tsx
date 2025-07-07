
// "use client";
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useRouter } from "next/navigation";
// import { useCheckLoggedInStatusQuery } from "../features/services/usersApi";
// import { signIn, signOut } from "../features/auth/authSlice";
// export default function Private({ children }) {
//  const router = useRouter();
//   // const [hasToken, setHasToken] = useState(false);

//   // useEffect(() => {
//   //   const token = localStorage.getItem('access_token');
//   //   if (token) {
//   //     setHasToken(true);
//   //   }
//   // }, []);
//   //   const location = useLocation();
//   const auth = useSelector((state: any) => state?.auth);
//   const user = useSelector((state: any) => state?.auth.user);
//  const dispatch = useDispatch();
//   const { data, isLoading, isSuccess, error } = useCheckLoggedInStatusQuery(undefined);
//   // { skip: true }
//   useEffect(() => {
//     if (!isLoading && !user) {
//       if (isSuccess && data?.is_success) {
//         dispatch(signIn(data?.data));
//       } else {
//         console.log("error", error);
//         dispatch(signOut());
//       }
//     }
//     console.log({ data });
//     console.log({ user });
//   }, [isLoading, isSuccess, data, dispatch]);

//   if (auth?.isLoading) {
//     return (
//       <div>
//         <h1>is loading</h1>
//       </div>
//     );
//   }
//   if (!auth?.user) {
//     // return (
//     //   <Navigate to="/signin" state={{ from: location }} replace></Navigate>
//     // );
//     router.push("/signIn");
//     return null; // or a loading spinner
//   } else {
//     return children;
//   }

// // return children;
// }



"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useCheckLoggedInStatusQuery } from "../features/services/usersApi";
import { signIn, signOut } from "../features/auth/authSlice";

export default function Private({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const auth = useSelector((state: any) => state?.auth);
  const user = auth?.user;

  const { data, isLoading, isSuccess, error } = useCheckLoggedInStatusQuery(undefined);

  // Step 1: Check login status and dispatch user
  useEffect(() => {
    if (!isLoading && !user) {
      if (isSuccess && data?.is_success) {
        dispatch(signIn(data?.data));
      } else {
        dispatch(signOut());
      }
    }
  }, [isLoading, isSuccess, data, user, dispatch]);

  // ❗Step 2: Do redirect in separate useEffect
  useEffect(() => {
    if (!auth?.isLoading && !auth?.user) {
      router.push("/signIn");
    }
  }, [auth?.isLoading, auth?.user, router]);

  // Show loading UI
  if (auth?.isLoading || isLoading) {
    return <div><h1>Loading...</h1></div>;
  }

  // ✅ Authenticated — render protected children
  return <>{children}</>;
}
