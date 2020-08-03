import React, { useContext } from "react";

import { Context } from "../ContextState";

const TripInfoSum = () => {
  const {
    airport,
    // setAirport,
    selectedMW,
    // setSelectedResorts,
    selectedRockies,
    // setSelectedRockies,
    selectedSierra,

    num,
  } = useContext(Context);

  // console.log("TripInfoSum selectedResorts are: ", selectedResorts);
  // console.log("TripInfoSum setSelectedResorts are: ", setSelectedResorts);
  // console.log("TripInfoSum setSelectedRockies is: ", setSelectedRockies);

  // console.log("TripInfoSum airport is: ", airport);

  return (
    <div>
      <pre>
        TripInfoSum selected MW resorts are {JSON.stringify(selectedMW)}
      </pre>
      <pre>
        TirpInfoSum Rockies resorts are {JSON.stringify(selectedRockies)}
      </pre>
      <pre>TirpInfoSum Sierra resorts are {JSON.stringify(selectedSierra)}</pre>

      <pre>TripInfoSum home airpot is {JSON.stringify(airport)}</pre>

      <pre>TripInfoSum Number of Traveler is {JSON.stringify(num)}</pre>
      {/* {airport} */}
    </div>
  );
};

export default TripInfoSum;
