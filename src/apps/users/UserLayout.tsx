import React, { useEffect, useState, useRef } from "react";
import "./assets/vendors/bootstrap/css/bootstrap.min.css";
import "./assets/css/users.min.css";
import "./assets/css/user-responsive.min.css";

import { Outlet } from "react-router-dom";
import SideBar from "./components/SideBar";
import MobileNavbar from "./components/MobileNavbar";
import RefDialog from "./components/RefDialog";
import ToastComp from "../auth/components/Toast";

const UserLayout = () => {
  const [dimensionheight, setDimensions] = useState(window.innerHeight);
  const navDate = useRef<NodeJS.Timeout>();

  const [refActive, setrefActive] = useState(false);
  const openDialog = () => {
    console.log(refActive);
    setrefActive(!refActive);
  };
  const closeDialog = () => {
    setrefActive(false);
  };

  useEffect(() => {
    function handleResize() {
      setDimensions(window.innerHeight);
    }

    window.addEventListener("resize", handleResize);

    navDate.current = setInterval(function () {
      var dt = new Date();
      var x1 = dt.toUTCString();
      var dtext = document.querySelector("#tdate") as HTMLElement;
      dtext ? (dtext.innerHTML = x1) : null;
    }, 1000);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(navDate.current);
    };
  }, []);

  return (
    <>
      <div id="users-wrapper" style={{ minHeight: dimensionheight }}>
        <div className="topNav">
          <ul>
            <li>
              <p id="tdate"></p>
            </li>
            <li className="lang">
              <span className="fas fa-globe"></span>
              <div className="lang-select-con">
                <select className="" id="language">
                  <option value="en">English</option>
                  <option value="nl">Dutch</option>
                  <option value="km">Cambodian</option>

                  <option value="fr">French</option>

                  <option value="de">German</option>
                </select>
              </div>
            </li>
          </ul>
        </div>
        {/* <!--wrapper content--> */}

        <div id="wrapper-content">
          {/* <!--siderbar--> */}
          <SideBar
            dimensionheight={dimensionheight}
            openDialog={openDialog}
            refActive={refActive}
          />
          {/* <!--siderbar end--> */}
          {/* <!--panel content--> */}
          <div id="panel-content">
            {/* <!--content--> */}

            <Outlet />

            {/* <!--content ends--> */}

            {/* <!---panel footer--> */}
            <div id="panelFooter">
              <div>{/* <!-- <p>Copywright@earnalipay.com</p> --> */}</div>
            </div>
            {/* <!---panel footer ends--> */}
            {/* <!---panel mobilenav --> */}
            <MobileNavbar openDialog={openDialog} />
            {/* <!---panel mobilenav ends--> */}
          </div>
          {/* <!----panel content ends--> */}
        </div>
        {/* <!--wrapper content--> */}
      </div>

      {/*dialog*/}
      <RefDialog isActive={refActive} closeDialog={closeDialog} />
      <ToastComp />

      {/*dialog*/}
    </>
  );
};

export default UserLayout;
