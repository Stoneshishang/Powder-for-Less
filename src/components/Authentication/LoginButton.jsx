import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./AuthButton.css";

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    !isAuthenticated && (
      <button className="login-btn" onClick={() => loginWithRedirect()}>
        Log In
      </button>
    )
  );
};

export default LoginButton;
