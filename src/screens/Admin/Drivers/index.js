import React, { useState, useEffect } from "react";
import "../Admin.css";
import "./Drivers.css";

import Spinner from "../../../components/Spinner";

import { AiFillDelete } from "react-icons/ai";
import { MdEdit } from "react-icons/md";

// api
import { deleteData, getData } from "../../../api";
import { useNavigate } from "react-router-dom";
import Alert from "../../../utils/Alert";
import NoContent from "../../../components/NoContent";

const AdminDrivers = () => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [pageRefresh, setpageRefresh] = useState(false);
  const [drivers, setdrivers] = useState([]);

  const getdrivers = async () => {
    setloading(true);
    const response = await getData("/driver/drivers", false);
    setloading(false);
    if (response) setdrivers(response);
  };
  useEffect(() => {
    getdrivers();
  }, [pageRefresh]);

  const onCancel = async (id) => {
    setloading(true);
    const response = await deleteData(`/driver/delete/${id}`);
    setloading(false);
    if (response) {
      Alert(
        "Successfull",
        "Message deleted successfully",
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
        <div className="admin driver">
          <div className="add" onClick={() => navigate("/admin/drivers/add")}>
            Add+
          </div>
          {drivers.length > 0 ? (
            drivers.map((driver) => (
              <div className="list-content">
                <div className="name">{driver.name}</div>
                <div className="phone-number">{driver.phoneNumber}</div>
                <div className="action-buttons">
                  <div
                    className="edit"
                    onClick={() =>
                      navigate(`/admin/drivers/edit/${driver._id}`)
                    }
                  >
                    <MdEdit />
                  </div>
                  <div className="cancel" onClick={() => onCancel(driver._id)}>
                    <AiFillDelete />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <NoContent content={"No Drivers Available"} />
          )}
        </div>
      )}
    </>
  );
};

export default AdminDrivers;
