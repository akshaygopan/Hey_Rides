import React, { useState, useEffect } from "react";
import "./EditCity.css";

import Spinner from "../../../components/Spinner";
import { MandatoryFieldCheck } from "../../../utils/validation";

// api
import { getData, postData, putData } from "../../../api";
import Alert from "../../../utils/Alert";
import { useNavigate, useParams } from "react-router-dom";

const EditCity = () => {
  const routeParams = useParams();
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

      const response = await putData(
        `/city/update/${routeParams.id}`,
        cityDetails
      );
      if (response) {
        Alert(
          "Updated",
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

  const getCities = async () => {
    setloading(true);
    const response = await getData(`/city/${routeParams.id}`, cityDetails);
    if (response) {
      setcityDetails({
        city: response.city,
        province: response.province,
        country: response.country,
      });
    }
    setloading(false);
  };
  useEffect(() => {
    getCities();
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="admin add-city-page">
          <div className="title">Edit City</div>
          <form className="login-container">
            <div className="input-container">
              <input
                className={`input ${error.city ? "input-error" : ""}`}
                placeholder="city"
                value={cityDetails.city}
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
              <span className="error">{error.city}</span>
            </div>
            <div className="input-container">
              <input
                className={`input ${error.province ? "input-error" : ""}`}
                placeholder="province"
                value={cityDetails.province}
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
              <span className="error">{error.province}</span>
            </div>
            <div className="input-container">
              <input
                className={`input ${error.country ? "input-error" : ""}`}
                placeholder="country"
                value={cityDetails.country}
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
            <button
              onClick={() => handleSubmit()}
              type="button"
              disabled={loading}
            >
              {loading ? <Spinner type={"button"} /> : "Edit City"}
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default EditCity;
