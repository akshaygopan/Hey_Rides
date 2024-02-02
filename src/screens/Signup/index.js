import React, { useState, useContext } from "react";
import "./Signup.css";

import { useNavigate } from "react-router-dom";

// icons
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

// context
import { AuthContext } from "../../context/AuthContext";

// validation
import {
  MandatoryFieldCheck,
  ValidateEmail,
  ValidatePassword,
  ValidateUserName,
} from "../../utils/validation";
import Spinner from "../../components/Spinner";
import { postData } from "../../api";

export default function Signup() {
  const navigate = useNavigate();
  const { setisAuthenticated } = useContext(AuthContext);

  const [credentials, setcredentials] = useState({
    email: "",
    password: "",
    phone: "",
    confirmPassword: "",
    name: "",
  });
  const [error, seterror] = useState({
    email: "",
    password: "",
    phone: "",
    confirmPassword: "",
    name: "",
  });
  const [passwordVisible, setpasswordVisible] = useState(false);
  const [confirmPasswordVisible, setconfirmPasswordVisible] = useState(false);
  const [loading, setloading] = useState(false);

  // submit
  const handleSubmit = async () => {
    let error = validation();

    if (
      error.email === "" &&
      error.password === "" &&
      error.phone === "" &&
      error.confirmPassword === "" &&
      error.name === ""
    ) {
      setloading(true);
      const response = await postData(`/signup`, credentials, false);
      if (response) {
        // localStorage.setItem(
        //   "hey_rides_auth",
        //   JSON.stringify({
        //     access_token: response.token,
        //     userType: response.userType,
        //   })
        // );
        navigate("/login");
        // setauthDetails({ isAuthenticated: true, type: response.userType });
        // if (response.userType == "admin") {
        //   navigate("/admin/bookings");
        // } else {
        //   navigate("/");
        // }
      }
      setloading(false);
    }
  };

  // validation
  const validation = () => {
    let error = {};
    error.email = ValidateEmail(credentials.email);
    error.password = ValidatePassword(credentials.password);
    error.name = MandatoryFieldCheck(credentials.name);
    error.confirmPassword = ValidatePassword(credentials.confirmPassword);
    error.phone = MandatoryFieldCheck(credentials.phone);
    if (credentials.password !== credentials.confirmPassword) {
      error.confirmPassword = "Password is not matching";
    }
    seterror({
      email: error.email,
      password: error.password,
      name: error.name,
      confirmPassword: error.confirmPassword,
      phone: error.phone,
    });
    return error;
  };
  return (
    <div className="signup-page">
      <span className="title">Signup</span>
      <form className="login-container">
        <div className="input-container">
          <input
            className={`input ${error.name ? "input-error" : ""}`}
            placeholder="name"
            onChange={(e) =>
              setcredentials({
                ...credentials,
                name: e.target.value.trim(),
              })
            }
            onKeyUp={(e) =>
              (e.KeyCode === 13 || e.which === 13) && handleSubmit()
            }
          />
          <span className="error">{error.name}</span>
        </div>
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
            className={`input ${error.phone ? "input-error" : ""}`}
            placeholder="phone number"
            onChange={(e) =>
              setcredentials({
                ...credentials,
                phone: e.target.value.trim(),
              })
            }
            onKeyUp={(e) =>
              (e.KeyCode === 13 || e.which === 13) && handleSubmit()
            }
          />
          <span className="error">{error.phone}</span>
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
        <div className="input-container">
          <input
            className={`input ${error.confirmPassword ? "input-error" : ""}`}
            placeholder="confirm password"
            type={confirmPasswordVisible ? "text" : "password"}
            onChange={(e) =>
              setcredentials({
                ...credentials,
                confirmPassword: e.target.value.trim(),
              })
            }
            onKeyUp={(e) =>
              (e.KeyCode === 13 || e.which === 13) && handleSubmit()
            }
          />
          <span className="password-icon">
            {confirmPasswordVisible ? (
              <BsEyeSlashFill
                onClick={() => setconfirmPasswordVisible(false)}
              />
            ) : (
              <BsEyeFill onClick={() => setconfirmPasswordVisible(true)} />
            )}
          </span>
          <span className="error">{error.confirmPassword}</span>
        </div>
        <button onClick={() => handleSubmit()} type="button" disabled={loading}>
          {loading ? <Spinner type={"button"} /> : "Signup"}
        </button>
      </form>
    </div>
  );
}
