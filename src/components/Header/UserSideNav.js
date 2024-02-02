import React, { useContext, useRef, useEffect, useState } from "react";
import "./SideNav.css";

// icons
import { BsExclamationCircle, BsGear, BsTelephone } from "react-icons/bs";
import { AiOutlineSchedule } from "react-icons/ai";
import { FaCity, FaLocationDot } from "react-icons/fa6";
import { MdPriceCheck } from "react-icons/md";
import { TiThMenuOutline } from "react-icons/ti";

import { useNavigate } from "react-router-dom";

// images
import Logo from "../../assets/heyride_copy.png";

// context
import { AuthContext } from "../../context/AuthContext";
import { logout } from "../../api";

export default function UserSideNav() {
  const navigate = useNavigate();
  const { authDetails, setauthDetails } = useContext(AuthContext);

  const node = useRef();
  const [isOpen, setisOpen] = useState(false);

  document.documentElement.style.setProperty(
    "--vh",
    `${window.innerHeight * 0.01}px`
  );

  const openMenu = () => {
    setisOpen(true);
  };
  const closeMenu = () => {
    setisOpen(false);
  };
  useEffect(() => {
    // add when mounted
    document.addEventListener("mousedown", handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);
  useEffect(() => {
    window.addEventListener("resize", viewPort);
    return () => window.removeEventListener("resize", viewPort);
  }, []);
  const handleClick = (e) => {
    if (!node.current.contains(e.target)) {
      closeMenu();
      return;
    }
  };

  const viewPort = () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };

  const redirect = (path) => {
    navigate(path);
    closeMenu();
  };
  return (
    <div className="sidenav">
      <div className="handburg-icon">
        <TiThMenuOutline onClick={openMenu} size={20} />
      </div>
      <div className={`dim-background ${isOpen ? "active" : "hide"}`}></div>
      <div className={`sidenav-div ${isOpen ? "active" : ""}`} ref={node}>
        <div className="titles">
          {/* <div className="logo-section"> */}
          <img onClick={() => redirect("/")} src={Logo} className="logo" />
          {/* </div> */}

          {authDetails.isAuthenticated && authDetails.type === "user" && (
            <div className="title" onClick={() => redirect("/my-bookings")}>
              <span>
                <AiOutlineSchedule size={13} />
              </span>
              <span>My Bookings</span>
            </div>
          )}
          <div className="title" onClick={() => redirect("/about")}>
            <span>
              <BsExclamationCircle size={13} />
            </span>
            <span>ABOUT</span>
          </div>
          <div className="title" onClick={() => redirect("/ourservices")}>
            <span>
              <BsGear size={13} />
            </span>
            <span>OUR SERVICES</span>
          </div>
          {/* <div className="title" onClick={() => redirect("/ourvehicles")}>
          <span>
            <BsCarFront size={13} />
          </span>
          <span>OUR VEHICLES</span>
        </div> */}
          <div className="title">
            <span>
              <BsTelephone size={13} />
            </span>
            <span onClick={() => redirect("/contact")}>CONTACT</span>
          </div>
        </div>
        {authDetails.isAuthenticated ? (
          <button
            className="auth-button logout"
            onClick={
              () => logout()
              // setauthDetails({
              //   userType: "user",
              //   isAuthenticated: false,
              //   name: "",
              // })
            }
          >
            <span>{authDetails.name.split(" ")[0].trim()}</span>
          </button>
        ) : (
          <button className="auth-button" onClick={() => redirect("/login")}>
            Login
          </button>
        )}
      </div>
    </div>
  );
}
