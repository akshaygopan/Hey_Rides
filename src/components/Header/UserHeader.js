import React, { useContext } from "react";
import "./Header.css";

// icons
import {
  BsExclamationCircle,
  BsGear,
  BsCarFront,
  BsTelephone,
  BsFileBarGraph,
} from "react-icons/bs";
import { AiOutlineSchedule } from "react-icons/ai";

import { useNavigate } from "react-router-dom";

// images
import Logo from "../../assets/heyride_copy.png";

// context
import { AuthContext } from "../../context/AuthContext";
import { logout } from "../../api";

export default function UserHeader() {
  const navigate = useNavigate();

  const { authDetails, setauthDetails } = useContext(AuthContext);
  console.log(authDetails);
  return (
    <div className="header">
      <div className="titles">
        {/* <div className="logo-section"> */}
        <img onClick={() => navigate("/")} src={Logo} className="logo" />
        {/* </div> */}

        {authDetails.isAuthenticated && authDetails.type === "user" && (
          <div className="title" onClick={() => navigate("/my-bookings")}>
            <span>
              <AiOutlineSchedule size={13} />
            </span>
            <span>My Bookings</span>
          </div>
        )}
        <div className="title" onClick={() => navigate("/about")}>
          <span>
            <BsExclamationCircle size={13} />
          </span>
          <span>ABOUT</span>
        </div>
        <div className="title" onClick={() => navigate("/ourservices")}>
          <span>
            <BsGear size={13} />
          </span>
          <span>OUR SERVICES</span>
        </div>
        {/* <div className="title" onClick={() => navigate("/ourvehicles")}>
          <span>
            <BsCarFront size={13} />
          </span>
          <span>OUR VEHICLES</span>
        </div> */}
        <div className="title">
          <span>
            <BsTelephone size={13} />
          </span>
          <span onClick={() => navigate("/contact")}>CONTACT</span>
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
        <button className="auth-button" onClick={() => navigate("/login")}>
          Login
        </button>
      )}
    </div>
  );
}
