import React, { useState, useEffect, forwardRef } from "react";
import "../Admin.css";
import "./AdminBookings.css";

import Spinner from "../../../components/Spinner";

import { getData, postData } from "../../../api";
import moment from "moment";
import { useNavigate } from "react-router-dom";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import NoContent from "../../../components/NoContent";

const AdminBookings = () => {
  const navigator = useNavigate();
  const [loading, setloading] = useState(false);
  const [bookings, setbookings] = useState([]);

  var today = new Date();
  var endDate = new Date(today.setMonth(today.getMonth() + 3));
  const [date, setdate] = useState({
    startDate: new Date(),
    endDate: endDate,
  });

  const getBookings = async () => {
    setloading(true);
    const response = await postData("/booking/bookings", {
      startTime: date.startDate,
      endTime: date.endDate,
    });
    setloading(false);
    if (response) setbookings(response);
  };
  useEffect(() => {
    getBookings();
  }, [date]);

  //  custom datepicker
  const CustomDatepicker = forwardRef(({ value, onClick }, ref) => (
    <button className="example-custom-input" onClick={onClick} ref={ref}>
      {value}
    </button>
  ));

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="admin bookings">
          <div className="datepicker">
            <DatePicker
              className="date-picker"
              selected={date.startDate}
              onChange={(dates) => {
                const [start, end] = dates;
                setdate({
                  startDate: start,
                  endDate: end,
                });
              }}
              startDate={date.startDate}
              endDate={date.endDate}
              minDate={new Date()}
              selectsRange
              customInput={<CustomDatepicker />}
            />
          </div>
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <div
                className="list-content"
                onClick={() => navigator(`/admin/bookings/${booking._id}`)}
              >
                <div>
                  <div className="name">Name: {booking.user_id.name}</div>
                  <div className={`status`}>
                    Status:{" "}
                    <span className={`${booking.status}`}>
                      {booking.status}
                    </span>
                  </div>
                </div>
                <div>
                  {/* <div className="date">
                    Scheduled for:{" "}
                    {moment(booking.ScheduledToTime).format(
                      "DD/MM/YYYY  hh:mm A"
                    )} */}
                  <div>Phone: {booking.user_id.phone}</div>
                  <div className="price">
                    Price: <span>${booking.price}</span>
                  </div>
                </div>
                <div className="date">
                  Scheduled for:{" "}
                  {moment(booking.ScheduledToTime).format(
                    "DD/MM/YYYY  hh:mm A"
                  )}
                </div>
                <div className="from">
                  Pickup:{" "}
                  {booking.from.location_id._id === "6564e158f3d3c3b55fe5854b"
                    ? booking.from.customLocation
                    : booking.from.location_id.location}
                </div>
                <div className="to">
                  Dropoff:{" "}
                  {booking.to.location_id._id === "6564e158f3d3c3b55fe5854b"
                    ? booking.to.customLocation
                    : booking.to.location_id.location}
                </div>

                {booking.driver && (
                  <span className="driver">
                    Driver: <span> {booking.driver.name}</span>
                  </span>
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

export default AdminBookings;
