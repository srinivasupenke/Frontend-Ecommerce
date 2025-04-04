import React from "react";
import arrow_icon from "../Assets/breadcrum_arrow.png";
import "./BreadCrums.css";

const BreadCrums = (props) => {
  const { product } = props;
  return (
    <div className="breadcrums">
      HOME <img src={arrow_icon} alt="icon" className="arrow-icon" /> SHOP
      <img src={arrow_icon} alt="icon" className="arrow-icon" />
      {product.category}
      <img src={arrow_icon} alt="icon" className="arrow-icon" /> {product.name}
    </div>
  );
};

export default BreadCrums;
