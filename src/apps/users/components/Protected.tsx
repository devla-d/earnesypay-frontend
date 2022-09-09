import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../../hooks";

const Protected = () => {
  const isLoggin = useAppSelector((state) => state.user.isLoggedin);
  return isLoggin ? <Outlet /> : <Navigate to="/login" />;
};

export default Protected;
