import React, { useRef, useState, useEffect } from "react";
import "./SearchArea.css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { AiOutlineMinusCircle, AiFillPlusCircle } from "react-icons/ai";

import Selector from "../Selector";
import { TorontoAirportId, TorontoId } from "../../constant/Config";

export default function SearchArea({
  locationsFrom = [],
  locationsTo = [],
  locations,
  scheduleInfo,
  setscheduleInfo,
  error,
}) {
  const [open, setopen] = useState(false);
  const ref = useRef(null);
  const [locationList, setlocationList] = useState({
    from:
      locationsFrom.length > 0
        ? // ? locations.filter(
          //     (item) =>
          //       item.id !== locationsFrom[0].id &&
          //       item.id !== locationsTo[0].id &&
          //       (item.id === TorontoId ||
          //         locationsFrom[0].id === TorontoAirportId)
          //   )
          filterLocation("From", locationsFrom, locationsTo)
        : locations,
    to:
      locationsTo.length > 0
        ? // ? locations.filter(
          //     (item) =>
          //       item.id !== locationsTo[0].id && item.id !== locationsFrom[0].id
          //   )
          filterLocation("To", locationsFrom, locationsTo)
        : locations,
  });
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setopen(false);
    }
  };
  function filterLocation(type, locationsFrom, locationsTo, locationId) {
    switch (type) {
      case "From":
        return locations
          .map((item) => {
            if (locationId && item.id === locationId) return null;
            if (item.id === locationsFrom[0].id) return null;
            if (locationsTo.length > 0 && item.id === locationsTo[0].id)
              return null;
            if (
              locationsTo.length > 0 &&
              item.id === TorontoId &&
              locationsTo[0].id === TorontoAirportId
            )
              return null;
            if (
              locationsTo.length > 0 &&
              item.id === TorontoAirportId &&
              locationsTo[0].id === TorontoId
            )
              return null;
            else return item;
          })
          .filter((item) => item !== null);
      case "To":
        return locations
          .map((item) => {
            if (locationId && item.id === locationId) return null;
            if (
              (locationsFrom.length > 0 && item.id === locationsFrom[0].id) ||
              item.id === locationsTo[0].id
            )
              return null;
            if (
              locationsFrom.length > 0 &&
              item.id === TorontoId &&
              locationsFrom[0].id === TorontoAirportId
            )
              return null;
            if (
              locationsFrom.length > 0 &&
              item.id === TorontoAirportId &&
              locationsFrom[0].id === TorontoId
            )
              return null;
            else return item;
          })
          .filter((item) => item !== null);
    }
  }
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const locationHandler = (type, locationId) => {
    switch (type) {
      case "from":
        setlocationList({
          to: locations.filter((item) => item.id !== locationId),
          // ...locationList,
          // to: filterLocation(
          //   "To",
          //   locationList.from,
          //   locationList.to,
          //   locationId
          // ),
        });
        break;
      case "to":
        setlocationList({
          from: locations.filter((item) => item.id !== locationId),
          // ...locationList,
          // from: filterLocation(
          //   "From",
          //   locationList.from,
          //   locationList.to,
          //   locationId
          // ),
        });
        break;
      default:
        setlocationList({
          from: locations.filter((item) => item.id != scheduleInfo.to),
          to: locations.filter((item) => item.id != scheduleInfo.from),
        });
    }
  };
  console.log(locationList);
  return (
    <div className="search-area">
      <div className="location">
        <div className="from">
          <Selector
            mainTitle={"Origin"}
            title={"Leaving from"}
            items={locationList.from}
            initialSelection={locationsFrom}
            selectedItem={(e) => {
              setscheduleInfo({
                ...scheduleInfo,
                from: e.length > 0 ? e[0].id : "",
              });
              locationHandler("from", e.length > 0 ? e[0].id : "");
            }}
            isError={error.from}
          />
        </div>
        <div className="to">
          <Selector
            mainTitle={"Destination"}
            title={"Going to"}
            initialSelection={locationsTo}
            items={locationList.to}
            selectedItem={(e) => {
              setscheduleInfo({
                ...scheduleInfo,
                to: e.length > 0 ? e[0].id : "",
              });
              locationHandler("to", e.length > 0 ? e[0].id : "");
            }}
            isError={error.to}
          />
        </div>
      </div>
      <div className="parameters">
        <div className={`date`}>
          <div className="title">Date</div>
          <DatePicker
            selected={scheduleInfo.date}
            onChange={(date) =>
              setscheduleInfo({ ...scheduleInfo, date: date })
            }
            minDate={new Date()}
            //   showTimeSelect
            //   includeTimes={timeFromWindsor}
            dateFormat="MMMM d, yyyy"
            disabledKeyboardNavigation
          />
        </div>
        <div
          className={`passengers ${error.adults ? "error" : ""}`}
          ref={ref}
          onClick={() => setopen(true)}
        >
          <div className="passengers-header">
            <div className="title">Passengers</div>
            <div className="content">{scheduleInfo.adults} passengers</div>
          </div>
          {open && (
            <div className="popup-contents">
              <div className="popup-content">
                <span>Adult</span>
                <div className="controller">
                  <AiOutlineMinusCircle
                    onClick={() =>
                      scheduleInfo.adults > 1
                        ? setscheduleInfo({
                            ...scheduleInfo,
                            adults: scheduleInfo.adults - 1,
                          })
                        : 0
                    }
                  />
                  <span>{scheduleInfo.adults}</span>
                  <AiFillPlusCircle
                    onClick={() =>
                      scheduleInfo.adults > 6
                        ? 0
                        : setscheduleInfo({
                            ...scheduleInfo,
                            adults: scheduleInfo.adults + 1,
                          })
                    }
                  />
                </div>
              </div>
              <div className="popup-content">
                <span>Luggage</span>
                <div className="controller">
                  <AiOutlineMinusCircle
                    onClick={() =>
                      scheduleInfo.luggage > 0
                        ? setscheduleInfo({
                            ...scheduleInfo,
                            luggage: scheduleInfo.luggage - 1,
                          })
                        : 0
                    }
                  />
                  <span>{scheduleInfo.luggage}</span>
                  <AiFillPlusCircle
                    onClick={() =>
                      scheduleInfo.luggage > 2
                        ? 0
                        : setscheduleInfo({
                            ...scheduleInfo,
                            luggage: scheduleInfo.luggage + 1,
                          })
                    }
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
