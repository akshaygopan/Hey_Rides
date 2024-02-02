import React, { useState, useEffect } from "react";
import "../Admin.css";
import "./Booking.css";

import moment from "moment";

//api
import { deleteData, getData, putData } from "../../../api";

// utils
import { Capitalize } from "../../../utils/StringFormat";

// components
import Spinner from "../../../components/Spinner";
import { useNavigate, useParams } from "react-router-dom";
import Selector from "../../../components/Selector";
import Alert from "../../../utils/Alert";

const Booking = () => {
  const routeParams = useParams();
  const navigate = useNavigate();
  const [loading, setloading] = useState({ page: true, button: false });
  const [booking, setbooking] = useState([]);
  const [drivers, setdrivers] = useState();
  const [selectedDriver, setselectedDriver] = useState();
  let booking_id = routeParams.id;

  // booking
  const getBooking = async () => {
    const booking = await getData(`/booking/${booking_id}`);
    if (booking) return booking;
  };

  // driver
  const getDriver = async () => {
    const response = await getData("/driver/drivers", false);
    if (response) {
      let drivers = response.map((item) => ({
        id: item._id,
        item: item.name,
        phoneNumber: item.phoneNumber,
      }));
      return drivers;
    }
  };

  const getApis = async () => {
    setloading({ ...loading, page: true });
    const bookingPromise = getBooking();
    const driverPromise = getDriver();

    const [booking, drivers] = await Promise.all([
      bookingPromise,
      driverPromise,
    ]);
    setbooking(booking);
    setdrivers(drivers);
    setloading({ ...loading, page: false });
  };
  useEffect(() => {
    getApis();
  }, []);

  const handleSubmit = async () => {
    if (selectedDriver) {
      const response = await putData(`/booking/driver/update/${booking_id}`, {
        driver_id: selectedDriver.id,
      });
      if (response) {
        Alert(
          "Success",
          "Allocated Driver to the booking",
          () => {
            navigate("/admin/bookings");
          },
          false,
          () => {},
          () => {},
          true,
          "Ok"
        );
      }
    } else {
      Alert(
        "Error",
        "Please select the driver",
        () => {},
        false,
        () => {},
        () => {},
        true,
        "Ok"
      );
    }
  };

  const cancelBooking = async () => {
    const response = await deleteData(`/booking/cancel/${booking_id}`);
    if (response) {
      Alert(
        "Cancelled",
        "Booking cancelled",
        () => {
          navigate("/admin/bookings");
        },
        false,
        () => {},
        () => {},
        true,
        "Ok"
      );
    }
  };
  return (
    <>
      {loading.page ? (
        <Spinner />
      ) : (
        <div className="admin admin-booking">
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
                Status{" "}
                <span className={`${booking.status}`}>{booking.status}</span>
              </div>
            </div>
            <div className="booked-on">
              Booked by: <span>{booking.user_id.name}</span>
            </div>
            <div className="phone-number">
              <a href={`tel:${booking.user_id.phone}`}>
                Phone: {booking.user_id.phone}
              </a>
            </div>
            <div className="booked-on">
              Booked on:{" "}
              <span>
                {moment(booking.createdAt).format("DD/MM/YYYY [at] hh:mm A")}
              </span>
            </div>
            <div className="content">
              <div className="booking-location">
                <span>
                  Pickup:{" "}
                  {booking.from.location_id._id === "6564e158f3d3c3b55fe5854b"
                    ? Capitalize(booking.from.customLocation)
                    : Capitalize(booking.from.location_id.location)}
                </span>
                <span>
                  Dropoff:{" "}
                  {booking.to.location_id._id === "6564e158f3d3c3b55fe5854b"
                    ? Capitalize(booking.to.customLocation)
                    : Capitalize(booking.to.location_id.location)}
                </span>
              </div>
              <div className="price">{`$${booking.price}`}</div>
            </div>
            {(booking.status === "Confirmed" ||
              booking.status === "Pending") && (
              <div className="allocate-driver">
                <div className="title">Allocate Driver </div>
                <Selector
                  title={"Select driver"}
                  items={drivers}
                  initialSelection={
                    booking.driver
                      ? [{ id: booking.driver._id, item: booking.driver.name }]
                      : []
                  }
                  selectedItem={(e) =>
                    setselectedDriver(e.length > 0 ? e[0] : "")
                  }
                />
                <button
                  onClick={() => handleSubmit()}
                  type="button"
                  disabled={loading.button}
                >
                  {loading.button ? <Spinner type={"button"} /> : "Allocate"}
                </button>

                <button
                  onClick={() => cancelBooking()}
                  type="button"
                  className="cancel"
                  disabled={loading.button}
                >
                  {loading.button ? <Spinner type={"button"} /> : "Cancel"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Booking;
