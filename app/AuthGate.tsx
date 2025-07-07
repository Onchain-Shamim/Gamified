// 'use client';
// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useRouter } from "next/navigation";
// import { useCheckLoggedInStatusQuery } from "./features/services/usersApi";
// import { signIn, signOut } from "./features/auth/authSlice";

// export default function AuthGate({ children }: { children: React.ReactNode }) {
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const auth = useSelector((state: any) => state.auth);
//   const user = auth.user;

//   const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;

//   const {
//     data,
//     isLoading,
//     isSuccess,
//     isError,
//     error,
//   } = useCheckLoggedInStatusQuery(undefined, {
//     skip: !token,
//   });

//   // Handle auth state update
//   useEffect(() => {
//     if (!token) {
//       dispatch(signOut());
//       return;
//     }

//     if (!isLoading) {
//       if (isSuccess && data?.is_success) {
//         dispatch(signIn(data?.data));
//       } else {
//         dispatch(signOut());
//       }
//     }
//   }, [token, isLoading, isSuccess, data, dispatch]);

//   // Redirect if user is null and not loading
//   useEffect(() => {
//     if (!auth.isLoading && !auth.user) {
//       router.push('/signin');
//     }
//   }, [auth.isLoading, auth.user, router]);

//   // Loading screen
//   if (auth.isLoading || isLoading) {
//     return (
//       <div className="h-screen flex items-center justify-center">
//         <p>Loading...</p>
//       </div>
//     );
//   }

//   return <>{children}</>;
// }











"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useCheckLoggedInStatusQuery } from "./features/services/usersApi";
import { signIn, signOut } from "./features/auth/authSlice";

export default function AuthGate({ children }) {
  const router = useRouter();

  //   const location = useLocation();
  const auth = useSelector((state: any) => state?.auth);
  const user = useSelector((state: any) => state?.auth.user);
 const dispatch = useDispatch();
  const { data, isLoading, isSuccess, error } = useCheckLoggedInStatusQuery(undefined, {
  skip: !localStorage.getItem('access_token'), // 👈 boolean condition
});
  // { skip: true }
  useEffect(() => {
    if (!isLoading && !user) {
      if (isSuccess && data?.is_success) {
        dispatch(signIn(data?.data));
      } else {
        console.log("error", error);
        dispatch(signOut());
      }
    }
    console.log({ data });
    console.log({ user });
  }, [isLoading, isSuccess, data, dispatch]);

  if (auth?.isLoading) {
    return (
      <div>
        <h1>is loading</h1>
      </div>
    );
  }
  if (!auth?.user) {
    // return (
    //   <Navigate to="/signin" state={{ from: location }} replace></Navigate>
    // );
    router.push("/signin");
    return null; // or a loading spinner
  } else {
    return children;
  }

// return children;
}
