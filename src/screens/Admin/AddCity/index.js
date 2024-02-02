import React, { useState } from "react";
import "./AddCity.css";

import Spinner from "../../../components/Spinner";
import { MandatoryFieldCheck } from "../../../utils/validation";

// api
import { postData } from "../../../api";
import Alert from "../../../utils/Alert";
import { useNavigate } from "react-router-dom";

const AddCity = () => {
  const navigate = useNavigate();
  const [cityDetails, setcityDetails] = useState({
    city: "",
    province: "",
    country: "",
  });
  const [loading, setloading] = useState(false);

  const [error, seterror] = useState({
    city: "",
    province: "",
    country: "",
  });

  // submit
  const handleSubmit = async () => {
    let error = validation();
    if (error.city === "" && error.province === "" && error.country === "") {
      setloading(true);

      const response = await postData(`/city/add`, cityDetails);
      if (response) {
        Alert(
          response.message,
          "",
          () => {
            navigate("/admin/cities");
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
    error.city = MandatoryFieldCheck(cityDetails.city);
    error.province = MandatoryFieldCheck(cityDetails.province);
    error.country = MandatoryFieldCheck(cityDetails.country);
    seterror({
      city: error.city,
      province: error.province,
      country: error.country,
    });
    return error;
  };
  return (
    <div className="admin add-city-page">
      <div className="title">Add City</div>
      <form className="login-container">
        <div className="input-container">
          <input
            className={`input ${error.city ? "input-error" : ""}`}
            placeholder="city"
            onChange={(e) =>
              setcityDetails({
                ...cityDetails,
                city: e.target.value.trim(),
              })
            }
            onKeyUp={(e) =>
              (e.KeyCode === 13 || e.which === 13) && handleSubmit()
            }
          />
          <span className="error-text">{error.city}</span>
        </div>
        <div className="input-container">
          <input
            className={`input ${error.province ? "input-error" : ""}`}
            placeholder="province"
            onChange={(e) =>
              setcityDetails({
                ...cityDetails,
                province: e.target.value.trim(),
              })
            }
            onKeyUp={(e) =>
              (e.KeyCode === 13 || e.which === 13) && handleSubmit()
            }
          />
          <span className="error-text">{error.province}</span>
        </div>
        <div className="input-container">
          <input
            className={`input ${error.country ? "input-error" : ""}`}
            placeholder="country"
            onChange={(e) =>
              setcityDetails({
                ...cityDetails,
                country: e.target.value.trim(),
              })
            }
            onKeyUp={(e) =>
              (e.KeyCode === 13 || e.which === 13) && handleSubmit()
            }
          />
          <span className="error-text">{error.country}</span>
        </div>
        <button onClick={() => handleSubmit()} type="button" disabled={loading}>
          {loading ? <Spinner type={"button"} /> : "Add City"}
        </button>
      </form>
    </div>
  );
};

export default AddCity;
