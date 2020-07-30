import React, { useContext } from "react";

import { Context } from "../ContextState";

const TripInfoSum = () => {
  const { airport, setAirport, selectedMW, setSelectedMW } = useContext(
    Context,
  );

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
