import React, { useContext } from "react";

import { Context } from "../ContextState";

const TripInfoSum = () => {
  const {
    airport,
    selectedMW,
    selectedRockies,
    selectedSierra,
    num,
    departureDate,
    arrivalDate,
  } = useContext(Context);

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

      <pre>TripInfoSum departure Date is {JSON.stringify(departureDate)}</pre>

      <pre>TripInfoSum arrival Date is {JSON.stringify(arrivalDate)}</pre>
    </div>
  );
};

export default TripInfoSum;
