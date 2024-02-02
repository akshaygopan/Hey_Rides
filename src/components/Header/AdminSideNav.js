import React, { useContext, useRef, useEffect, useState } from "react";
import "./SideNav.css";

// icons
import { BsCarFront } from "react-icons/bs";
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

export default function AdminSideNav() {
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
          <img src={Logo} className="logo" />

          <div className="title" onClick={() => redirect("/admin/bookings")}>
            <span>
              <AiOutlineSchedule size={13} />
            </span>
            <span>Bookings</span>
          </div>
          <div className="title" onClick={() => redirect("/admin/drivers")}>
            <span>
              <BsCarFront size={13} />
            </span>
            <span>Drivers</span>
          </div>
          <div className="title" onClick={() => redirect("/admin/cities")}>
            <span>
              <FaCity size={13} />
            </span>
            <span>Cities</span>
          </div>
          <div className="title" onClick={() => redirect("/admin/locations")}>
            <span>
              <FaLocationDot size={13} />
            </span>
            <span>Locations</span>
          </div>
          <div className="title" onClick={() => redirect("/admin/price")}>
            <span>
              <MdPriceCheck size={13} />
            </span>
            <span>Price</span>
          </div>
        </div>
        {authDetails.isAuthenticated ? (
          <button
            className="auth-button logout"
            onClick={
              () => logout()
              // setauthDetails({ type: "user", isAuthenticated: false, name: "" })
            }
          >
            <span>{authDetails.name.split(" ")[0].trim()}</span>
          </button>
        ) : (
          <button
            className="auth-button"
            onClick={() => redirect("/admin/login")}
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
}
