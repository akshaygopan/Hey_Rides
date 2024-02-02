import React, { useState } from "react";
import "./AddDriver.css";

import Spinner from "../../../components/Spinner";
import { MandatoryFieldCheck } from "../../../utils/validation";

// api
import { postData } from "../../../api";
import Alert from "../../../utils/Alert";
import { useNavigate } from "react-router-dom";

const AddDriver = () => {
  const navigate = useNavigate();
  const [driverDetails, setdriverDetails] = useState({
    name: "",
    phoneNumber: "",
  });
  const [loading, setloading] = useState(false);

  const [error, seterror] = useState({
    name: "",
    phoneNumber: "",
  });

  // submit
  const handleSubmit = async () => {
    let error = validation();
    if (error.name === "" && error.phoneNumber === "") {
      setloading(true);

      const response = await postData(`/driver/add`, driverDetails);
      if (response) {
        Alert(
          response.message,
          "",
          () => {
            navigate("/admin/drivers");
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
    error.name = MandatoryFieldCheck(driverDetails.name);
    error.phoneNumber = MandatoryFieldCheck(driverDetails.phoneNumber);
    seterror({
      name: error.name,
      phoneNumber: error.phoneNumber,
    });
    return error;
  };

  return (
    <div className="admin add-city-page">
      <div className="title">Add Driver</div>
      <form className="login-container">
        <div className="input-container">
          <input
            className={`input ${error.name ? "input-error" : ""}`}
            placeholder="Name"
            onChange={(e) =>
              setdriverDetails({
                ...driverDetails,
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
            className={`input ${error.phoneNumber ? "input-error" : ""}`}
            placeholder="Phone number"
            onChange={(e) =>
              setdriverDetails({
                ...driverDetails,
                phoneNumber: e.target.value.trim(),
              })
            }
            onKeyUp={(e) =>
              (e.KeyCode === 13 || e.which === 13) && handleSubmit()
            }
          />
          <span className="error">{error.phoneNumber}</span>
        </div>
        <button onClick={() => handleSubmit()} type="button" disabled={loading}>
          {loading ? <Spinner type={"button"} /> : "Add Driver"}
        </button>
      </form>
    </div>
  );
};

export default AddDriver;
