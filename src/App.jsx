import React, { useState } from 'react';
import './App.css';
// import Footer from "./components/Footer";
import Header from './components/Header';
import ResortsSelection from './components/ResortsSelection';
import Dates from './components/Dates';
import FindTripInfoButton from './components/FindTripInfoButton';
import NumOfPeople from './components/NumOfPeople';
// import AirportInput from "./components/AirportInput";
import AutoComplete from './components/AutoComplete';
import airports from './components/airports';
import TripInfoDetail from './components/TripInfoDetail';
import TripInfoSum from './components/TripInfoSum';
// import {UserContext} from './UserContext'
import { Provider } from './ContextState';

// import { v4 as uuidv4 } from "uuid";

const App = () => {
  // const [selectedResorts, setSelectedResorts] = useState([]);
  // const addSelectedResorts = (selectedMW) => {
  //   setSelectedResorts((prevSelectedResorts) => {
  //     return prevSelectedResorts.concat(selectedMW);
  //   });
  //   console.log("Parents selectedResort is: ", selectedResorts);
  // };

  const addInputValues = (e) => {
    e.preventDefault();
  };

  // const [tripSum, setTripSum] = useState([
  //   { resort: "", weather: "undefined", flight: "undefined" },
  // ]);

  return (
    <Provider>
      <div>
        <Header />
        {/* <form className='input-value-sum' value='sum' onSubmit={addInputValues}> */}
        <ResortsSelection />
        <label>Home Airport:</label>
        <AutoComplete name="autocomplete-airport" items={airports} />
        {/* <AirportInput /> */}
        <NumOfPeople />
        <Dates />
        <FindTripInfoButton />
        <TripInfoSum />
        {/* </form> */}
        {/* <Footer /> */}
      </div>
    </Provider>
  );
};

export default App;
