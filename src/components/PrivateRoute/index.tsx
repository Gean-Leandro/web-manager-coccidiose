import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebaseConfig";
import { Navigate } from "react-router-dom";
import { JSX } from "react";
import './privateRoute.css';

export function PrivateRoute({ children }: { children: JSX.Element }) {
  const [user, loading] = useAuthState(auth);

  if (loading) return <p>Carregando...</p>;

  return user ? children : <Navigate to="/" replace />;
}