import React, { useContext, useEffect, useState } from "react";
import { InfinitySpin } from "react-loader-spinner";
import "./style.scss";
import { ThemeContext } from "../../context/themeContext";

const Loader = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className="modern-loader">
      <InfinitySpin
        visible={true}
        width="120"
        color="#ff6b35"
        ariaLabel="infinity-spin-loading"
      />
      <p className="loading-text">Loading MovieMowa...</p>
    </div>
  );
};

export default Loader;
