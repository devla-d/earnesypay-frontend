import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../hooks";
import { logout } from "../../auth/slicers/Userslicer";

interface SideBarprops {
  dimensionheight: number;
  openDialog: () => void;
  refActive: boolean;
}

const SideBar = (props: SideBarprops) => {
  const { dimensionheight, openDialog, refActive } = props;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const openRefDialog = (e: React.MouseEvent) => {
    e.preventDefault();
    openDialog();
  };
  const logoutUser = (e: React.MouseEvent) => {
    e.preventDefault();
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("userToken");

    dispatch(logout());

    navigate("/login");
  };
  return (
    <>
      <div id="sidebar" style={{ minHeight: dimensionheight }}>
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              <i className="fas fa-fw fa-tachometer-alt"></i>
              <span>Dashbaord</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/withdraw-funds"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              <i className="fas fa-credit-card"></i>
              <span>Withdrawal</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/transaction-logs"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              <i className="fas fa-coins"></i>
              <span>Transactions</span>
            </NavLink>
          </li>
          <li>
            <a onClick={openRefDialog} href="#" className="">
              <i className="fas fa-user-plus"></i>
              <span>Referrals</span>
            </a>
          </li>
          <li>
            <NavLink
              to="/settings"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              <i className="fas fa-cog"></i>
              <span>Settings</span>
            </NavLink>
          </li>

          <li>
            <a href="#" onClick={logoutUser}>
              <i className="fas fa-sign-out-alt"></i>
              <span>Sign out</span>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SideBar;
