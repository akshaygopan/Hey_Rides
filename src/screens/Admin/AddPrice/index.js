import React, { useState, useEffect } from "react";
import "./AddPrice.css";

import { useNavigate } from "react-router-dom";

import Selector from "../../../components/Selector";
import Spinner from "../../../components/Spinner";
import Alert from "../../../utils/Alert";

import { MandatoryFieldCheck } from "../../../utils/validation";

// api
import { getData, postData } from "../../../api";

const AddPrice = () => {
  const navigate = useNavigate();
  const [priceDetails, setpriceDetails] = useState({
    from: "",
    price: 0,
    to: "",
    luggage1: 0,
    luggage2: 0,
  });
  const [loading, setloading] = useState({ page: false, button: false });

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

  const getCities = async () => {
    setloading(true);
    const response = await getData("/city/cities", false);
    setloading(false);
    if (response) {
      let city = response.map((item) => ({ id: item._id, item: item.city }));
      setcities(city);
      setlocationList({ from: city, to: city });
    }
  };
  useEffect(() => {
    getCities();
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
      setloading(true);
      let payload = {
        from: priceDetails.from,
        price: parseFloat(priceDetails.price).toFixed(2),
        to: priceDetails.to,
        luggage: [
          parseFloat(priceDetails.luggage1).toFixed(2),
          parseFloat(priceDetails.luggage2).toFixed(2),
        ],
      };
      const response = await postData(`/price/add`, payload);
      if (response) {
        Alert(
          response.message,
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
      setloading(false);
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
                // initialSelection={pricesFrom}
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
                // initialSelection={pricesFrom}
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
              disabled={loading}
            >
              {loading ? <Spinner type={"button"} /> : "Add Fee"}
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default AddPrice;
