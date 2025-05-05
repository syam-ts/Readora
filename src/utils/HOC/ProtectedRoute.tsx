import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserState } from "../../config/UserStateConftg";

export const UserProtectedRoute: React.FC = () => {
  
  const isUserAuth = useSelector((state: UserState) => state?.isUser);
  console.log("isUser: ", isUserAuth);

  // if (isUserAuth && location.pathname === "/login") {
  //   return <Navigate to="/home" />;
  // }

  return isUserAuth ? <Outlet /> : <Navigate to="/login" />;
};
