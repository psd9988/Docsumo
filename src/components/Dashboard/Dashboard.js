import React, { useContext } from "react";
import { LoginStateContext } from "../../contexts/LoginContext";

export const Dashboard = () => {
  const { loggedinUser } = useContext(LoginStateContext);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1 style={{ color: "white" }}>{`Hello ${loggedinUser}`}</h1>
    </div>
  );
};
