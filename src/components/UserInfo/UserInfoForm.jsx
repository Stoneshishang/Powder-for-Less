import React, { useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Context } from "../../ContextState";
import Card from "./Card";

const UserInfoForm = () => {
  const { enteredPass, setEnteredPass } = useContext(Context);
  const { sportsType, setSportsType } = useContext(Context);
  const { setUserInfo } = useContext(Context);
  const { isAuthenticated } = useAuth0();

  const addUserInfoHandler = (userInfo) => {
    fetch("https://powder-for-less.firebaseio.com/userInfo.json", {
      method: "POST",
      body: JSON.stringify(userInfo),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        setUserInfo((prevInfo) => [...prevInfo, responseData]);
      });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    addUserInfoHandler({
      "pass-type": enteredPass,
      "ski-snowboard": sportsType,
    });
  };

  return (
    !isAuthenticated && (
      <Card>
        <form onSubmit={submitHandler}>
          <h1>Please enter your information</h1>
          <label htmlFor="pass-type">Season Pass Type</label>
          <input
            type="text"
            id="pass-type"
            value={enteredPass}
            onChange={(e) => {
              setEnteredPass(e.target.value);
            }}
          />
          <label htmlFor="ski-snowboard">Sports Type</label>
          <input
            type="text"
            id="ski-snowboard"
            value={sportsType}
            onChange={(e) => {
              setSportsType(e.target.value);
            }}
          />
          <button type="submit">Add Your Info</button>
        </form>
      </Card>
    )
  );
};

export default UserInfoForm;
