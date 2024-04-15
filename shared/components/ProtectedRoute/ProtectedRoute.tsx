import { ReactNode } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const router = useRouter();
  const token =
    typeof window !== "undefined" ? sessionStorage.getItem("token") : null;

  console.log(token);
  useEffect(() => {
    console.log(token);
    if (!token) {
      router.push("/login");
    }
  }, [token, router]);

  return token ? <>{children}</> : null;
};

export default ProtectedRoute;

// import { ReactNode } from "react";
// import { useRouter } from "next/router";
// import { useEffect } from "react";

// interface ProtectedRouteProps {
//   children: ReactNode;
// }

// const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
//   const router = useRouter();
//   const token = sessionStorage.getItem("token");

//   console.log(token);
//   useEffect(() => {
//     console.log(token);
//     if (!token) {
//       router.push("/login");
//     }
//   }, [token, router]);

//   return token ? <>{children}</> : null;
// };

// export default ProtectedRoute;
