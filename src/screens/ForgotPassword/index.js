import React, { useState, useContext } from "react";
import "./ForgotPassword.css";

import { useNavigate } from "react-router-dom";

// validation
import { ValidateEmail } from "../../utils/validation";
import Spinner from "../../components/Spinner";
import { postData } from "../../api";
import Alert from "../../utils/Alert";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [credentials, setcredentials] = useState({
    email: "",
  });
  const [error, seterror] = useState({
    email: "",
  });
  const [loading, setloading] = useState(false);

  // submit
  const handleSubmit = async () => {
    let error = validation();

    if (error.email === "") {
      setloading(true);
      const response = await postData(`/forgot-password`, credentials, false);
      if (response) {
        Alert(
          response.message,
          "",
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
      setloading(false);
    }
  };

  // validation
  const validation = () => {
    let error = {};
    error.email = ValidateEmail(credentials.email);
    seterror({
      email: error.email,
    });
    return error;
  };
  return (
    <div className="signup-page">
      <span className="title">Forgot password</span>
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
        <button onClick={() => handleSubmit()} type="button" disabled={loading}>
          {loading ? <Spinner type={"button"} /> : "Reset"}
        </button>
      </form>
    </div>
  );
}
