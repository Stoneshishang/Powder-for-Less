import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./AuthButton.css";

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    !isAuthenticated && (
      <div className="login-btn ">
        <button onClick={() => loginWithRedirect()}>Log In</button>
      </div>
    )
  );
};

export default LoginButton;
