import React, { useState, useContext } from "react";
import { ResortSelectionContext } from "./ResortsSelection";
import { AirportContext } from "./AutoComplete";
// import { TripInfoContext } from "../TripInfoContext";

const TripInfoSum = () => {
  const { selectedMW, setSelectedMW } = useContext(ResortSelectionContext);
  const { airport, setAirport } = useContext(AirportContext);

  console.log("TripInfoSum selectedMW is: ", selectedMW);
  console.log("TripInfoSum setSelectedMW is: ", setSelectedMW);

  console.log("TripInfoSum airport is: ", airport);

  return (
    <div>
      <button onClick={() => setSelectedMW(selectedMW)}>submit resorts</button>
      <pre>TripInfoSum is {JSON.stringify(selectedMW)}</pre>
      <button onClick={() => setAirport(airport)}>Submit Airport</button>
      {airport}
    </div>
  );
};

export default TripInfoSum;
