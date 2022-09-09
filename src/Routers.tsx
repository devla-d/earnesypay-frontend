import React from "react";
import { Route, Routes } from "react-router-dom";
import CreateInvestment from "./apps/users/pages/CreateInvestment";
import UserLayout from "./apps/users/UserLayout";
import Dashboard from "./apps/users/pages/Dashboard";
import Settings from "./apps/users/pages/Settings";
import Transactions from "./apps/users/pages/Transactions";
import Withdrawal from "./apps/users/pages/Withdrawal";
import Authlayout from "./apps/auth/Authlayout";
import Login from "./apps/auth/pages/Login";
import Register from "./apps/auth/pages/Register";
import Protected from "./apps/users/components/Protected";

const Routers = () => {
  return (
    <>
      <Routes>
        <Route element={<Protected />}>
          <Route element={<UserLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/withdraw-funds" element={<Withdrawal />} />
            <Route path="/transaction-logs" element={<Transactions />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/create-investment" element={<CreateInvestment />} />
          </Route>
        </Route>

        <Route element={<Authlayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </>
  );
};

export default Routers;
