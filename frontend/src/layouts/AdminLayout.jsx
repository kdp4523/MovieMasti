import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import AdminHeader from "../components/adminHeader/AdminHeader";

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const adminToken = Cookies.get("adminJwtToken");
    if (!adminToken) {
      navigate("/admin/login");
    }
  }, [navigate]);

  return (
    <>
      <AdminHeader />
      {children}
    </>
  );
};

export default AdminLayout;
