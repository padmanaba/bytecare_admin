import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

export default function RootRedirect() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return <Navigate to={isAuthenticated ? "/dashboard" : "/signin"} replace />;
}
