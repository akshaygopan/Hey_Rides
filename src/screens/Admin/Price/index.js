import React, { useEffect, useState } from "react";
import "../Admin.css";
import "./AdminPrice.css";

import { useNavigate } from "react-router-dom";

import Spinner from "../../../components/Spinner";
import { AiFillDelete } from "react-icons/ai";
import { MdEdit } from "react-icons/md";

// api
import { deleteData, getData } from "../../../api";
import Alert from "../../../utils/Alert";
import NoContent from "../../../components/NoContent";

const AdminPrice = () => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [pageRefresh, setpageRefresh] = useState(false);
  const [price, setprice] = useState([]);

  const getprice = async () => {
    setloading(true);
    const response = await getData("/price/prices", false);
    setloading(false);
    if (response) setprice(response);
  };
  useEffect(() => {
    getprice();
  }, [pageRefresh]);

  const onCancel = async (id) => {
    setloading(true);
    const response = await deleteData(`/price/delete/${id}`);
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
        <div className="admin location">
          <div className="add" onClick={() => navigate("/admin/price/add")}>
            Add+
          </div>
          {price.length > 0 ? (
            price.map((item) => (
              <div className="list-content">
                <div className="from">{item.from.city}</div>
                <div className="to">{item.to.city}</div>
                <div className="price">${item.price}</div>
                <div className="action-buttons">
                  <div
                    className="edit"
                    onClick={() => navigate(`/admin/price/edit/${item._id}`)}
                  >
                    <MdEdit />
                  </div>
                  <div className="cancel" onClick={() => onCancel(item._id)}>
                    <AiFillDelete />
                  </div>
                </div>
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

export default AdminPrice;
