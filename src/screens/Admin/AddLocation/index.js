import React, { useState, useEffect } from "react";
import "./AddLocation.css";

import Selector from "../../../components/Selector";
import Spinner from "../../../components/Spinner";
import { MandatoryFieldCheck } from "../../../utils/validation";

// api
import { getData, postData } from "../../../api";
import Alert from "../../../utils/Alert";
import { useNavigate } from "react-router-dom";

const AddLocation = () => {
  const navigate = useNavigate();
  const [locationDetails, setlocationDetails] = useState({
    city_id: "",
    location: "",
  });
  const [loading, setloading] = useState({ page: false, button: false });

  const [error, seterror] = useState({
    city_id: "",
    location: "",
  });

  const [cities, setcities] = useState([]);

  const getCities = async () => {
    setloading({ ...loading, page: true });
    const response = await getData("/city/cities", false);
    setloading({ ...loading, page: false });
    if (response) {
      let city = response.map((item) => ({ id: item._id, item: item.city }));
      setcities(city);
    }
  };
  useEffect(() => {
    getCities();
  }, []);
  // submit
  const handleSubmit = async () => {
    let error = validation();

    if (error.city_id === "" && error.location === "") {
      setloading({ ...loading, button: true });

      const response = await postData(`/location/add`, locationDetails);
      if (response) {
        Alert(
          response.message,
          "",
          () => {
            navigate("/admin/locations");
          },
          false,
          () => {},
          () => {},
          true,
          "Ok"
        );
      }
      setloading({ ...loading, button: false });
    }
  };

  // validation
  const validation = () => {
    let error = {};
    error.city_id = MandatoryFieldCheck(locationDetails.city_id);
    error.location = MandatoryFieldCheck(locationDetails.location);
    seterror({
      city_id: error.city_id,
      location: error.location,
    });
    return error;
  };
  return (
    <>
      {loading.page ? (
        <Spinner />
      ) : (
        <div className="admin add-location-page">
          <div className="title">Add Location</div>
          <form className="login-container">
            <div className="input-container">
              <Selector
                // mainTitle={"Origin"}
                title={"Select city"}
                items={cities}
                // initialSelection={locationsFrom}
                selectedItem={(e) => {
                  setlocationDetails({
                    ...locationDetails,
                    city_id: e.length > 0 ? e[0].id : "",
                  });
                }}
                isError={error.city_id}
              />
            </div>
            <div className="input-container">
              <input
                className={`input ${error.location ? "input-error" : ""}`}
                placeholder="location"
                onChange={(e) =>
                  setlocationDetails({
                    ...locationDetails,
                    location: e.target.value.trim(),
                  })
                }
                onKeyUp={(e) =>
                  (e.KeyCode === 13 || e.which === 13) && handleSubmit()
                }
              />
              <span className="error-text">{error.location}</span>
            </div>

            <button
              onClick={() => handleSubmit()}
              type="button"
              disabled={loading.button}
            >
              {loading.button ? <Spinner type={"button"} /> : "Add Location"}
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default AddLocation;
