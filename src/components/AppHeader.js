import { Button } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

const AppHeader = () => {
  const dispatch = useDispatch();

  return (
    <header
      className="site-layout-background"
      style={{
        display: "flex",
        padding: 0,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <h1>App Header </h1>
      <Button type="primary" onClick={() => dispatch(logout())}>
        Logout
      </Button>
    </header>
  );
};

export default AppHeader;
