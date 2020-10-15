import React, { useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Context } from "../../ContextState";
import Card from "./Card";

const UserInfoDisplay = () => {
  const { userInfo } = useContext(Context);

  console.log("userInfo is: ", userInfo);

  const { user, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      // <Card>
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
      </div>
    )
  );
};

export default UserInfoDisplay;
