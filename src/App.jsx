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

const App = () => {
  return (
    <InfoProvider>
      <div>
        <Header />
        <ResortsSelection />
        <label>Home Airport:</label>
        <AutoComplete name="autocomplete-airport" items={airports} />
        <NumOfPeople />
        <Dates />
        <TripInfoSumForm />
        {/* <Footer /> */}
      </div>
    </InfoProvider>
  );
};

export default App;
