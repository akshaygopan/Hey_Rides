import React from "react";
import "./Spinner.css";
import { RotatingLines, Bars } from "react-loader-spinner";

const Spinner = ({ type }) => {
  return (
    <>
      {type === "button" ? (
        <Bars
          height="30"
          width="30"
          color={"#ffffff"}
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      ) : (
        <div className="spinner">
          <RotatingLines
            strokeColor="#fab722"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        </div>
      )}
    </>
  );
};

export default Spinner;
