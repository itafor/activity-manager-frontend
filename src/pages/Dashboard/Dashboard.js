import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/bookings");
  }, []);

  return <div onClick={() => navigate("/patients")}>Dashboard</div>;
};

export default Dashboard;
