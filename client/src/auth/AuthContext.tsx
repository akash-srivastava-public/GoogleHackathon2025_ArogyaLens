// src/auth/AuthContext.tsx
import { createContext, useContext, useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";

type DecodedToken = {
  userId: string;
  exp?: number;
  iat?: number;
  [key: string]: any;
};

type AuthContextType = {
  token: string | null;
  userId: string | null;
  setToken: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setTokenState] = useState<string | null>(() => sessionStorage.getItem("token"));
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        setUserId(decoded.userId || decoded.sub || null);
      } catch (err) {
        console.error("Failed to decode token:", err);
        setUserId(null);
      }
    } else {
      setUserId(null);
    }
  }, [token]);

  const setToken = (newToken: string) => {
    sessionStorage.setItem("token", newToken);
    setTokenState(newToken);
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    setTokenState(null);
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{ token, userId, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
