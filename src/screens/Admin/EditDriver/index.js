import React, { useState, useEffect } from "react";
import "./EditDriver.css";

import Spinner from "../../../components/Spinner";
import { MandatoryFieldCheck } from "../../../utils/validation";

// api
import { getData, postData, putData } from "../../../api";
import Alert from "../../../utils/Alert";
import { useNavigate, useParams } from "react-router-dom";

const EditDriver = () => {
  const routeParams = useParams();
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

      const response = await putData(`/driver/update/${routeParams.id}`, {
        name: driverDetails.name.trim(),
        phoneNumber: driverDetails.phoneNumber.trim(),
      });
      if (response) {
        Alert(
          "Updated",
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

  const getDriver = async () => {
    setloading(true);
    const response = await getData(`/driver/${routeParams.id}`, driverDetails);
    if (response) {
      setdriverDetails({
        name: response.name,
        phoneNumber: response.phoneNumber.toString(),
      });
    }
    setloading(false);
  };
  useEffect(() => {
    getDriver();
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="admin add-city-page">
          <div className="title">Edit Driver</div>
          <form className="login-container">
            <div className="input-container">
              <input
                className={`input ${error.name ? "input-error" : ""}`}
                placeholder="Name"
                value={driverDetails.name}
                onChange={(e) =>
                  setdriverDetails({
                    ...driverDetails,
                    name: e.target.value,
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
                value={driverDetails.phoneNumber}
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
            <button
              onClick={() => handleSubmit()}
              type="button"
              disabled={loading}
            >
              {loading ? <Spinner type={"button"} /> : "Edit Driver"}
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default EditDriver;
