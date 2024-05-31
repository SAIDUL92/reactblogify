import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import ProfileProvider from "../providers/ProfileProvider";
import PostProvider from "../providers/PostsProvider";

export default function PrivateRoutes() {
  const { auth } = useAuth();

  return (
    <>
      {auth.authToken ? (
        <main>
          <Outlet />
        </main>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
}
