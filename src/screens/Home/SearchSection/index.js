import React, { useState, useEffect } from "react";
import "./SearchSection.css";

import { useNavigate } from "react-router-dom";

// image
import { BiSolidCar } from "react-icons/bi";
import { AiFillGift } from "react-icons/ai";

import TaxiImage from "../../../assets/car9.jpeg";

import SearchArea from "../../../components/SearchArea";
import { getData } from "../../../api";
import Spinner from "../../../components/Spinner";

export default function SearchSection() {
  const navigate = useNavigate();
  const [rideSelected, setrideSelected] = useState(true);
  const [scheduleInfo, setscheduleInfo] = useState({
    from: "",
    to: "",
    date: new Date(),
    adults: 1,
    luggage: 0,
  });
  const [loading, setloading] = useState(false);
  const [locations, setlocations] = useState([]);

  const [error, seterror] = useState({
    from: false,
    to: false,
    adults: false,
  });
  const onSearch = () => {
    let errorDict = error;
    if (scheduleInfo.from === "") errorDict = { ...errorDict, from: true };
    else errorDict = { ...errorDict, from: false };
    if (scheduleInfo.to === "") errorDict = { ...errorDict, to: true };
    else errorDict = { ...errorDict, to: false };
    if (scheduleInfo.adults === 0) errorDict = { ...errorDict, adults: true };
    else errorDict = { ...errorDict, adults: false };
    seterror(errorDict);
    if (!errorDict.from && !errorDict.to && !errorDict.adults)
      navigate(
        `scheduled/from/${scheduleInfo.from}/to/${
          scheduleInfo.to
        }/date/${scheduleInfo.date.getTime()}/adults/${
          scheduleInfo.adults
        }/luggage/${scheduleInfo.luggage}`
      );
  };

  const getCities = async () => {
    setloading(true);
    const response = await getData("/city/cities", false);
    if (response) {
      let cities = response.map((city) => ({
        id: city._id,
        item: city.city,
      }));
      setlocations(cities);
    }
    setloading(false);
  };
  useEffect(() => {
    getCities();
  }, [scheduleInfo.from, scheduleInfo.to]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="search-section">
          <div className="search-container">
            <div className="search-header">
              <div
                className={`ride-parcel ${rideSelected ? "selected" : ""}`}
                onClick={() => setrideSelected(true)}
              >
                <BiSolidCar />
                <span>Ride</span>
              </div>
              <div
                className={`ride-parcel ${!rideSelected ? "selected" : ""}`}
                onClick={() => setrideSelected(false)}
              >
                <AiFillGift />
                <span>Parcel</span>
              </div>
            </div>

            {rideSelected ? (
              <SearchArea
                locationsFrom={locations.filter(
                  (item) => item.id == scheduleInfo.from
                )}
                locationsTo={locations.filter(
                  (item) => item.id == scheduleInfo.to
                )}
                locations={locations}
                scheduleInfo={scheduleInfo}
                setscheduleInfo={setscheduleInfo}
                error={error}
              />
            ) : (
              <span className="search-area-parcel">Work in progress</span>
            )}

            <button className="search-button" onClick={onSearch}>
              Search
            </button>
          </div>
          <img className="background-image" src={TaxiImage} />
        </div>
      )}
    </>
  );
}
