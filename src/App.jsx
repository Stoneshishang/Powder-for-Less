import React from "react";
import "./App.css";
// import Footer from "./components/Footer";
import Header from "./components/Header";
import ResortsSelection from "./components/FlightWeather/ResortsSelection";
import Dates from "./components/FlightWeather/Dates";
import NumOfPeople from "./components/FlightWeather/NumOfPeople";
import AutoComplete from "./components/FlightWeather/AutoComplete";
import airports from "./apis/airports";
import TripInfoSumForm from "./components/FlightWeather/TripInfoSumForm";
import { InfoProvider } from "./ContextState";
import LoginButton from "./components/Authentication/LoginButton";
import LogoutButton from "./components/Authentication/LogoutButton";
import Profile from "./components/Authentication/profile";
import UserInfoForm from "./components/UserInfo/UserInfoForm";
import UserInfoDisplay from "./components/UserInfo/UserInfoDisplay";

const App = () => {
  return (
    <InfoProvider>
      <div>
        <div className="header-login-container">
          <Header />
          <LoginButton className="login-btn-position" />
        </div>
        <LogoutButton />
        <UserInfoForm />
        <UserInfoDisplay />
        {/* <Profile /> */}
        <ResortsSelection />
        <AutoComplete items={airports} />
        <NumOfPeople />
        <Dates />
        <TripInfoSumForm />
        {/* <Footer /> */}
      </div>
    </InfoProvider>
  );
};

export default App;
