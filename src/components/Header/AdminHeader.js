import React, { useContext } from "react";

// icons
import { BsCarFront } from "react-icons/bs";
import { AiOutlineSchedule } from "react-icons/ai";
import { FaCity, FaLocationDot } from "react-icons/fa6";
import { MdPriceCheck } from "react-icons/md";

import { useNavigate } from "react-router-dom";

// images
import Logo from "../../assets/heyride_copy.png";

// context
import { AuthContext } from "../../context/AuthContext";
import { logout } from "../../api";

export default function AdminHeader() {
  const navigate = useNavigate();
  const { authDetails, setauthDetails } = useContext(AuthContext);
  return (
    <div className="header">
      <div className="titles">
        <img src={Logo} className="logo" />

        <div className="title" onClick={() => navigate("/admin/bookings")}>
          <span>
            <AiOutlineSchedule size={13} />
          </span>
          <span>Bookings</span>
        </div>
        <div className="title" onClick={() => navigate("/admin/drivers")}>
          <span>
            <BsCarFront size={13} />
          </span>
          <span>Drivers</span>
        </div>
        <div className="title" onClick={() => navigate("/admin/cities")}>
          <span>
            <FaCity size={13} />
          </span>
          <span>Cities</span>
        </div>
        <div className="title" onClick={() => navigate("/admin/locations")}>
          <span>
            <FaLocationDot size={13} />
          </span>
          <span>Locations</span>
        </div>
        <div className="title" onClick={() => navigate("/admin/price")}>
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
          onClick={() => navigate("/admin/login")}
        >
          Login
        </button>
      )}
    </div>
  );
}
