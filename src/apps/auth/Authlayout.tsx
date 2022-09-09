import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";

import "./assets/vendors/bootstrap/css/bootstrap.min.css";
import "./assets/css/auth.min.css";
import "./assets/css/auth-responsive.min.css";

import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import ToastComp from "./components/Toast";

const Authlayout = () => {
  const [dimensionheight, setDimensions] = useState(window.innerHeight);

  useEffect(() => {
    function handleResize() {
      setDimensions(window.innerHeight);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div id="auth-wrapper" style={{ minHeight: dimensionheight }}>
        {/* header */}
        <Header />
        {/* header ends */}

        <div className="auth-card">
          <div className="slider-box">
            <div
              id="carouselExampleSlidesOnly"
              className="carousel slide carousel-fade"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                <div
                  className="carousel-item item-1 active"
                  data-bs-interval="7000"
                >
                  <div className="slider-content">
                    <div className="slide-text text-center">
                      <h2 className="wlc-txt" style={{ color: "#fff" }}>
                        Welcome <br />
                        to <br />
                        <span>Earneasymoney</span>
                      </h2>
                      <h5 className="in-text-lead  mt-3 mb-3">
                        {/* Create An account and start Earning */}
                      </h5>
                      <ul className="authSlidecta">
                        <li>
                          <Link
                            to="/register"
                            className="btn btn-primary custom"
                          >
                            <i className="fas fa-user-circle"></i>
                            <span>Register</span>
                          </Link>
                        </li>
                        <li>
                          <Link to="/login" className="btn btn-primary custom">
                            <i className="fas fa-sign-in-alt"></i>
                            <span>Login</span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="carousel-item item-2" data-bs-interval="7000">
                  <div className="slider-content">
                    <div className="slide-text">
                      <p className=" ">
                        Your Journey To Financial Freedom Start Here
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* content */}
          <Outlet />
          {/* content ends */}
        </div>
      </div>
      <ToastComp />
    </>
  );
};

export default Authlayout;
