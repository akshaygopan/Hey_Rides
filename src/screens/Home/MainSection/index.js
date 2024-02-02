import React from "react";
import "./MainSection.css";
import CarImage from "../../../assets/car8.png";
import { useNavigate } from "react-router-dom";

export default function MainSection() {
  const navigate = useNavigate();
  return (
    <div className="car-section">
      <div className="section-1">
        <span className="title">Hey Rides </span>
        <span className="content">"Your Journey our priority"</span>
        <div className="signup-button" onClick={() => navigate("/signup")}>
          Signup
        </div>
      </div>
      <div className="image-section">
        <img src={CarImage} />
      </div>
    </div>
  );
}
