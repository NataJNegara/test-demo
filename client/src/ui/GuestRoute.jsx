import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function ProtectedRoute() {
  const { user } = useUser();

  return !user.email ? <Outlet /> : <Navigate to={"/dashboard"} />;
}
