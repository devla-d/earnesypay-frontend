import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../hooks";
import { logout } from "../../auth/slicers/Userslicer";
import { changeMobileNavicon, closeNavOnClick } from "../helper";

interface PropsInterface {
  openDialog: () => void;
}

const MobileNavbar = (props: PropsInterface) => {
  const { openDialog } = props;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const openRefDialog = (e: React.MouseEvent) => {
    e.preventDefault();
    closeNavOnClick();

    openDialog();
  };
  const logoutUser = (e: React.MouseEvent) => {
    e.preventDefault();
    closeNavOnClick();
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("userToken");
    dispatch(logout());

    navigate("/login");
  };

  return (
    <>
      <div id="mobile-nav">
        <div className="togle">
          <div className="menu">
            <a
              id="mnavTogller"
              href="#"
              onClick={(e) => changeMobileNavicon(e)}
            >
              <i id="mobilenavToggler" className="fas fa-bars"></i>
            </a>
          </div>
        </div>

        <div className="nav">
          <ul id="mobNavmenu">
            <li>
              <NavLink
                onClick={closeNavOnClick}
                to="/"
                className={({ isActive }) => (isActive ? "active" : undefined)}
              >
                <i className="fas fa-fw fa-tachometer-alt"></i>
                <span>Dashbaord</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                onClick={closeNavOnClick}
                to="/transaction-logs"
                className={({ isActive }) => (isActive ? "active" : undefined)}
              >
                <i className="fas fa-coins"></i>
                <span>Transactions</span>
              </NavLink>
            </li>
            <li>
              <a onClick={openRefDialog} href="#">
                <i className="fas fa-user-plus"></i>
                <span>Referrals</span>
              </a>
            </li>
            <li>
              <NavLink
                onClick={closeNavOnClick}
                to="/settings"
                className={({ isActive }) => (isActive ? "active" : undefined)}
              >
                <i className="fas fa-cog"></i>
                <span>Settings</span>
              </NavLink>
            </li>

            <li>
              <a onClick={logoutUser} href="#">
                <i className="fas fa-sign-out-alt"></i>
                <span>Sign out</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default MobileNavbar;
