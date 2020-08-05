import React from "react"; // , { useState }
import "./App.css";
// import Footer from "./components/Footer";
import Header from "./components/Header";
import ResortsSelection from "./components/ResortsSelection";
import Dates from "./components/Dates";
import FindTripInfoButton from "./components/FindTripInfoButton";
import NumOfPeople from "./components/NumOfPeople";
import AutoComplete from "./components/AutoComplete";
import airports from "./components/airports";
// import TripInfoDetail from "./components/TripInfoDetail";
import TripInfoSum from "./components/TripInfoSum";
import { InfoProvider } from "./ContextState";

// import { v4 as uuidv4 } from "uuid";

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
        <FindTripInfoButton />
        <TripInfoSum />
        {/* <Footer /> */}
      </div>
    </InfoProvider>
  );
};

export default App;
