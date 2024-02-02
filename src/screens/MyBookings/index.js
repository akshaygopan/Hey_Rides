import React, { useState, useEffect } from "react";
import "./MyBookings.css";

import moment from "moment";

//api
import { deleteData, getData } from "../../api";

// utils
import { Capitalize } from "../../utils/StringFormat";

// components
import Spinner from "../../components/Spinner";
import Alert from "../../utils/Alert";
import NoContent from "../../components/NoContent";

const MyBookings = () => {
  const [loading, setloading] = useState(false);
  const [pageRefresh, setpageRefresh] = useState(false);
  const [bookings, setbookings] = useState([]);

  const getBookings = async () => {
    setloading(true);
    const response = await getData("/booking/user/bookings");
    setloading(false);
    if (response) setbookings(response);
  };
  useEffect(() => {
    getBookings();
  }, [pageRefresh]);

  const cancelBooking = async (id) => {
    const response = await deleteData(`/booking/cancel/user/${id}`);
    if (response) {
      Alert(
        "Cancelled",
        "Booking cancelled",
        () => {},
        false,
        () => {},
        () => {
          setpageRefresh(!pageRefresh);
        },
        true,
        "Ok"
      );
    }
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="my-bookings">
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <div className="booking-card">
                <div className="booking-header">
                  <div className="scheduled-for">
                    Scheduled for:{" "}
                    <span>
                      {moment(booking.ScheduledToTime).format(
                        "DD/MM/YYYY [at] hh:mm A"
                      )}
                    </span>
                    <span>{` (${booking.from.city_id.city} to ${booking.to.city_id.city})`}</span>
                  </div>
                  <div className="status">
                    Status:{" "}
                    <span className={`${booking.status}`}>
                      {booking.status}
                    </span>
                  </div>
                </div>
                <div className="booked-on">
                  Booked on:{" "}
                  <span>
                    {moment(booking.createdAt).format(
                      "DD/MM/YYYY [at] hh:mm A"
                    )}
                  </span>
                </div>
                <div className="content">
                  <div className="booking-location">
                    <span>
                      Pickup:{" "}
                      {`${Capitalize(booking.from.location_id.location)}`}
                    </span>
                    <span>
                      Dropoff:{" "}
                      {`${Capitalize(booking.to.location_id.location)}`}
                    </span>
                  </div>
                  <div className="price">{`$${booking.price}`}</div>
                </div>
                {booking.status === "Confirmed" && (
                  <div className="driver-info">
                    <div className="name">
                      Driver name: {booking.driver?.name}
                    </div>
                    <div className="ph">
                      Phone number: {booking.driver?.phoneNumber}
                    </div>
                  </div>
                )}
                {moment(new Date()).isBefore(booking.ScheduledToTime) &&
                  (booking.status === "Confirmed" ||
                    booking.status === "Pending") && (
                    <button
                      onClick={() => cancelBooking(booking._id)}
                      type="button"
                      className="cancel"
                      disabled={loading.button}
                    >
                      {loading.button ? <Spinner type={"button"} /> : "Cancel"}
                    </button>
                  )}
              </div>
            ))
          ) : (
            <NoContent content={"No Bookings Available"} />
          )}
        </div>
      )}
    </>
  );
};

export default MyBookings;
