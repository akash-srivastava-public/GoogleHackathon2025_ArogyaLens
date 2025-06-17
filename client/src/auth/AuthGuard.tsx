// src/auth/AuthGuard.tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import type { JSX } from "react";

const AuthGuard = ({ children }: { children: JSX.Element }) => {
  const { userId } = useAuth();
  return userId ? children : <Navigate to="/login" replace />;
};

export default AuthGuard;
