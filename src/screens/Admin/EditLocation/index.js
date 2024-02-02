import React, { useState, useEffect } from "react";
import "./EditLocation.css";

import Selector from "../../../components/Selector";
import Spinner from "../../../components/Spinner";
import { MandatoryFieldCheck } from "../../../utils/validation";

// api
import { getData, postData, putData } from "../../../api";
import Alert from "../../../utils/Alert";
import { useNavigate, useParams } from "react-router-dom";

const EditLocation = () => {
  const routeParams = useParams();
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
  const [selectedCity, setselectedCity] = useState();

  const [cities, setcities] = useState([]);

  const getCities = async () => {
    const response = await getData("/city/cities", false);

    if (response) {
      let city = response.map((item) => ({ id: item._id, item: item.city }));
      setcities(city);
      return city;
    }
  };

  const getLocations = async () => {
    const location = await getData(
      `/location/${routeParams.id}`,
      locationDetails
    );
    return location;
  };

  const apiCalls = async () => {
    setloading({ ...loading, page: true });
    const citiesPromise = getCities();
    const locationPromise = getLocations();

    const [city, location] = await Promise.all([
      citiesPromise,
      locationPromise,
    ]);
    setlocationDetails({
      city_id: location.city._id,
      location: location.location,
    });
    let cities = city.filter((item) => item.id == location.city._id);
    setselectedCity(cities);
    setloading({ ...loading, page: false });
  };

  useEffect(() => {
    apiCalls();
  }, []);
  // submit
  const handleSubmit = async () => {
    let error = validation();

    if (error.city_id === "" && error.location === "") {
      setloading({ ...loading, button: true });

      const response = await putData(
        `/location/update/${routeParams.id}`,
        locationDetails
      );
      if (response) {
        Alert(
          "Updated",
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
                initialSelection={selectedCity}
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
                value={locationDetails.location}
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
              {loading.button ? <Spinner type={"button"} /> : "Edit Location"}
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default EditLocation;
