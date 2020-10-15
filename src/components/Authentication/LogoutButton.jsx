import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./AuthButton.css";

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <button className="logout-btn " onClick={() => logout()}>
        Log Out
      </button>
    )
  );
};

export default LogoutButton;
