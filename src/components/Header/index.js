import React, { useContext } from "react";
import "./index.css";

import AdminHeader from "./AdminHeader";
import UserHeader from "./UserHeader";
import { AuthContext } from "../../context/AuthContext";
import UserSideNav from "./UserSideNav";
import AdminSideNav from "./AdminSideNav";

const Header = () => {
  const { authDetails } = useContext(AuthContext);

  return authDetails.type === "admin" ? (
    <>
      <AdminSideNav />
      <AdminHeader />
    </>
  ) : (
    <>
      <UserSideNav />
      <UserHeader />
    </>
  );
};

export default Header;
