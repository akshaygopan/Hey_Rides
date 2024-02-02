import React, { useState, useContext } from "react";
import "./Login.css";

import { useLocation, useNavigate, useHistory } from "react-router-dom";

// icons
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

// context
import { AuthContext } from "../../context/AuthContext";

// validation
import { ValidatePassword, ValidateEmail } from "../../utils/validation";

// api
import { postData } from "../../api";
import Spinner from "../../components/Spinner";
import Alert from "../../utils/Alert";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setauthDetails } = useContext(AuthContext);

  const [credentials, setcredentials] = useState({
    email: "",
    password: "",
  });
  const [error, seterror] = useState({ email: "", password: "" });
  const [passwordVisible, setpasswordVisible] = useState(false);
  const [loading, setloading] = useState(false);

  // submit
  const handleSubmit = async () => {
    let error = validation();
    if (error.email === "" && error.password === "") {
      setloading(true);
      let payload = {
        email: credentials.email,
        password: credentials.password,
      };
      const response = await postData(`/login`, payload, false);
      if (response) {
        localStorage.setItem(
          "hey_rides_auth",
          JSON.stringify({
            access_token: response.token,
            userType: response.userType,
            name: response.name,
          })
        );
        setauthDetails({
          isAuthenticated: true,
          type: response.userType,
          name: response.name,
        });
        if (response.userType == "admin") {
          navigate("/admin/bookings");
        } else {
          if (location.state) {
            if (response.userType === "user") {
              const response = await postData(
                "/booking/create",
                location.state
              );
              if (response) {
                Alert(
                  "Booking Confirmed",
                  "Booking confirmed. We will reachout to you",
                  () => {
                    navigate("/");
                  },
                  false,
                  () => {},
                  () => {},
                  true,
                  "Ok"
                );
              }
            } else {
              Alert(
                "Error",
                "Please login as user to book ride",
                () => {
                  navigate("/login");
                },
                false,
                () => {},
                () => {},
                true,
                "Ok"
              );
            }
          }
          navigate("/");
        }
      }
      setloading(false);
    }
  };
  // validation
  const validation = () => {
    let error = {};
    error.password = ValidatePassword(credentials.password);
    error.email = ValidateEmail(credentials.email);
    seterror({
      password: error.password,
      email: error.email,
    });
    return error;
  };
  return (
    <div className="login-page">
      <span className="title">
        {location.pathname.split("/")[1] === "admin" ? "Admin Login" : "Login"}
      </span>
      <form className="login-container">
        <div className="input-container">
          <input
            className={`input ${error.email ? "input-error" : ""}`}
            placeholder="email"
            onChange={(e) =>
              setcredentials({
                ...credentials,
                email: e.target.value.toLowerCase().trim(),
              })
            }
            onKeyUp={(e) =>
              (e.KeyCode === 13 || e.which === 13) && handleSubmit()
            }
          />
          <span className="error">{error.email}</span>
        </div>
        <div className="input-container">
          <input
            className={`input ${error.password ? "input-error" : ""}`}
            placeholder="password"
            type={passwordVisible ? "text" : "password"}
            onChange={(e) =>
              setcredentials({
                ...credentials,
                password: e.target.value.trim(),
              })
            }
            onKeyUp={(e) =>
              (e.KeyCode === 13 || e.which === 13) && handleSubmit()
            }
          />
          <span className="password-icon">
            {passwordVisible ? (
              <BsEyeSlashFill onClick={() => setpasswordVisible(false)} />
            ) : (
              <BsEyeFill onClick={() => setpasswordVisible(true)} />
            )}
          </span>
          <span className="error">{error.password}</span>
        </div>
        {location.pathname.split("/")[1] !== "admin" && (
          <div className="info-text">
            <span className="signup-text" onClick={() => navigate("/signup")}>
              Signup?
            </span>
            <span
              className="forgot-password-text"
              onClick={() => navigate("/forget-password")}
            >
              Forget password?
            </span>
          </div>
        )}
        <button onClick={() => handleSubmit()} type="button" disabled={loading}>
          {loading ? <Spinner type={"button"} /> : "Login"}
        </button>
      </form>
    </div>
  );
}
