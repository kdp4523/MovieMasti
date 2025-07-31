import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Header from "../components/header/Header";

const UserLayout = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const jwtToken = Cookies.get("jwtToken");
    if (!jwtToken) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default UserLayout;
