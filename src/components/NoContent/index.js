import React from "react";
import "./NoContent.css";
import NoContentImg from "../../assets/no_content.jpg";

export default function NoContent({ content }) {
  return (
    <div className="no-content">
      <img src={NoContentImg} />
      <span>{content}</span>
    </div>
  );
}
