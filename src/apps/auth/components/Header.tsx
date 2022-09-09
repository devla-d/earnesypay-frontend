import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../hooks";

const Header = () => {
  const page = useAppSelector((state) => state.page.currentpage);

  let rediRect;
  if (page == "Login") {
    rediRect = (
      <Link to="/register">
        <i className="fas fa-user-circle"></i>
        <span className="ml-2" style={{ marginLeft: "5px" }}>
          Register
        </span>
      </Link>
    );
  } else if (page == "Register") {
    rediRect = (
      <Link to="/login">
        <i className="fas fa-sign-in-alt"></i> Sign In
      </Link>
    );
  }

  return (
    <>
      <header>
        <ul className="nav">
          <li>
            <a href="#">
              <i className="fas fa-angle-left"></i>
            </a>
          </li>

          <li>{rediRect}</li>
        </ul>
      </header>
    </>
  );
};

export default Header;
