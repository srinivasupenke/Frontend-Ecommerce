import React, { useContext } from "react";

import { ThreeDots } from "react-loader-spinner";
import { ShopContext } from "../../Context/ShopContext";
import "./Loader.css";

const GlobalLoader = () => {
  const { loading } = useContext(ShopContext);

  if (!loading) return null;

  return (
    <div className="loader">
      <ThreeDots height="80" width="80" color="black" ariaLabel="loading" />
    </div>
  );
};

export default GlobalLoader;
