"use client";
import { styles } from "@/styles/styles";
import { useAuth } from "@/utils/auth";
import React, { useEffect } from "react";

const Dashboard = () => {
  const isChecking = useAuth();
  const token =
    typeof window !== "undefined" ? sessionStorage.getItem("token") : null;

  useEffect(() => {
    if (!isChecking && token) {
      console.log("Dashboard data loaded successfully");
    }
  }, [isChecking, token]);

  if (isChecking) {
    return (
      <div className={`${styles.flexCenter} min-h-screen`}>
        <span className="page_loader"></span>
      </div>
    );
  }

  return <div className="">Dashboard</div>;
};

export default Dashboard;
