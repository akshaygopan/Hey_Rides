import React, { useState, useContext } from "react";
import "./ResetPassword.css";

import { useNavigate, useParams } from "react-router-dom";

// icons
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

// validation
import { ValidatePassword } from "../../utils/validation";
import Spinner from "../../components/Spinner";
import { postData } from "../../api";
import Alert from "../../utils/Alert";

export default function ResetPassword() {
  const navigate = useNavigate();
  const routeParams = useParams();

  const [credentials, setcredentials] = useState({
    password: "",
    confirmPassword: "",
  });
  const [error, seterror] = useState({
    password: "",
    confirmPassword: "",
  });
  const [passwordVisible, setpasswordVisible] = useState(false);
  const [confirmPasswordVisible, setconfirmPasswordVisible] = useState(false);
  const [loading, setloading] = useState(false);

  // submit
  const handleSubmit = async () => {
    let error = validation();

    if (error.password === "" && error.confirmPassword === "") {
      // setloading(true);
      const payload = {
        id: routeParams.id,
        password: credentials.password,
        token: routeParams.token,
      };
      const response = await postData(`/reset-password`, payload, false);
      if (response) {
        Alert(
          response.message,
          "",
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
      // setloading(false);
    }
  };

  // validation
  const validation = () => {
    let error = {};
    error.password = ValidatePassword(credentials.password);
    error.confirmPassword = ValidatePassword(credentials.confirmPassword);
    if (credentials.password !== credentials.confirmPassword) {
      error.confirmPassword = "Password is not matching";
    }
    seterror({
      password: error.password,
      confirmPassword: error.confirmPassword,
    });
    return error;
  };
  return (
    <div className="signup-page">
      <span className="title">Reset password</span>
      <form className="login-container">
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
          {loading ? <Spinner type={"button"} /> : "Reset"}
        </button>
      </form>
    </div>
  );
}
