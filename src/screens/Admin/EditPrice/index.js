import React, { useState, useEffect } from "react";
import "./EditPrice.css";

import { useNavigate, useParams } from "react-router-dom";

import Selector from "../../../components/Selector";
import Spinner from "../../../components/Spinner";
import Alert from "../../../utils/Alert";

import { MandatoryFieldCheck } from "../../../utils/validation";

// api
import { getData, postData, putData } from "../../../api";

const EditPrice = () => {
  const routeParams = useParams();
  const navigate = useNavigate();
  const [priceDetails, setpriceDetails] = useState({
    from: "",
    price: 0,
    to: "",
    luggage1: 0,
    luggage2: 0,
  });
  const [loading, setloading] = useState({ page: true, button: false });

  const [error, seterror] = useState({
    from: "",
    price: "",
    to: "",
    luggage1: "",
    luggage2: "",
  });

  const [cities, setcities] = useState([]);
  const [locationList, setlocationList] = useState({
    from: cities,
    to: cities,
  });
  const [selectedCity, setselectedCity] = useState({ from: [], to: [] });

  const getCities = async () => {
    const response = await getData("/city/cities", false);

    if (response) {
      let city = response.map((item) => ({ id: item._id, item: item.city }));
      setcities(city);
      setlocationList({ from: city, to: city });
      return city;
    }
    return null;
  };

  const getPrices = async () => {
    const price = await getData(`/price/${routeParams.id}`, priceDetails);
    if (price) {
      return price;
    }
    return null;
  };

  const apiCalls = async () => {
    setloading({ ...loading, page: true });
    const citiesPromise = getCities();
    const pricePromise = getPrices();

    const [city, price] = await Promise.all([citiesPromise, pricePromise]);
    if (price) {
      setpriceDetails({
        from: price.from._id,
        price: price.price,
        to: price.to._id,
        luggage1: price.luggage[0],
        luggage2: price.luggage[1],
      });
      let cityFrom = city.filter((item) => item.id == price.from._id);
      let cityTo = city.filter((item) => item.id == price.to._id);
      setselectedCity({ from: cityFrom, to: cityTo });
    }

    setloading({ ...loading, page: false });
  };

  useEffect(() => {
    apiCalls();
  }, []);

  // submit
  const handleSubmit = async () => {
    let error = validation();

    if (
      error.from === "" &&
      error.to === "" &&
      error.price === "" &&
      error.luggage1 === "" &&
      error.luggage2 === ""
    ) {
      setloading({ ...loading, button: true });
      let payload = {
        from: priceDetails.from,
        price: parseFloat(priceDetails.price).toFixed(2),
        to: priceDetails.to,
        luggage: [
          parseFloat(priceDetails.luggage1).toFixed(2),
          parseFloat(priceDetails.luggage2).toFixed(2),
        ],
      };
      const response = await putData(
        `/price/update/${routeParams.id}`,
        payload
      );
      if (response) {
        Alert(
          "Updated",
          "",
          () => {
            navigate("/admin/price");
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
    error.from = MandatoryFieldCheck(priceDetails.from);
    error.price = MandatoryFieldCheck(priceDetails.price);
    error.to = MandatoryFieldCheck(priceDetails.to);
    error.luggage1 = MandatoryFieldCheck(priceDetails.luggage1);
    error.luggage2 = MandatoryFieldCheck(priceDetails.luggage2);
    seterror({
      from: error.from,
      price: error.price,
      to: error.to,
      luggage1: error.luggage1,
      luggage2: error.luggage2,
    });
    return error;
  };

  const locationHandler = (type, locationId) => {
    switch (type) {
      case "from":
        setlocationList({
          ...locationList,
          to: cities.filter((item) => item.id !== locationId),
        });
        break;
      case "to":
        setlocationList({
          ...locationList,
          from: cities.filter((item) => item.id !== locationId),
        });
        break;
      default:
        setlocationList({
          from: cities,
          to: cities,
        });
    }
  };
  return (
    <>
      {loading.page ? (
        <Spinner />
      ) : (
        <div className="admin add-price-page">
          <div className="title">Add Fee</div>
          <form className="login-container">
            <div className="input-container">
              <Selector
                mainTitle={"From"}
                title={"Select city"}
                items={locationList.from}
                initialSelection={selectedCity.from}
                selectedItem={(e) => {
                  setpriceDetails({
                    ...priceDetails,
                    from: e.length > 0 ? e[0].id : "",
                  });
                  locationHandler("from", e.length > 0 ? e[0].id : "");
                }}
                isError={error.from}
              />
            </div>
            <div className="input-container">
              <Selector
                mainTitle={"To"}
                title={"Select city"}
                items={locationList.to}
                initialSelection={selectedCity.to}
                selectedItem={(e) => {
                  setpriceDetails({
                    ...priceDetails,
                    to: e.length > 0 ? e[0].id : "",
                  });
                  locationHandler("to", e.length > 0 ? e[0].id : "");
                }}
                isError={error.to}
              />
            </div>
            <div className="input-container">
              <input
                className={`input ${error.price ? "input-error" : ""}`}
                type="number"
                placeholder="price"
                value={priceDetails.price}
                onChange={(e) =>
                  setpriceDetails({
                    ...priceDetails,
                    price: e.target.value.trim(),
                  })
                }
                onKeyUp={(e) =>
                  (e.KeyCode === 13 || e.which === 13) && handleSubmit()
                }
              />
              <span className="error-text">{error.price}</span>
            </div>
            <div className="input-container">
              <input
                className={`input ${error.luggage1 ? "input-error" : ""}`}
                type="number"
                placeholder="first luggage"
                value={priceDetails.luggage1}
                onChange={(e) =>
                  setpriceDetails({
                    ...priceDetails,
                    luggage1: e.target.value.trim(),
                  })
                }
                onKeyUp={(e) =>
                  (e.KeyCode === 13 || e.which === 13) && handleSubmit()
                }
              />
              <span className="error-text">{error.luggage1}</span>
            </div>
            <div className="input-container">
              <input
                className={`input ${error.luggage2 ? "input-error" : ""}`}
                type="number"
                placeholder="second luggage"
                value={priceDetails.luggage2}
                onChange={(e) =>
                  setpriceDetails({
                    ...priceDetails,
                    luggage2: e.target.value.trim(),
                  })
                }
                onKeyUp={(e) =>
                  (e.KeyCode === 13 || e.which === 13) && handleSubmit()
                }
              />
              <span className="error-text">{error.luggage2}</span>
            </div>

            <button
              onClick={() => handleSubmit()}
              type="button"
              disabled={loading.button}
            >
              {loading.button ? <Spinner type={"button"} /> : "Edit Fee"}
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default EditPrice;
