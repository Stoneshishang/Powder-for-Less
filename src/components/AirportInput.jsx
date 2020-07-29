import React, { useState } from "react";
import AutoComplete from "./AutoComplete";
import airports from "./airports";
// import { v4 as uuidv4 } from "uuid";

const AirportInput = () => {
  const [enteredAirport, setEnteredAirport] = useState("");

  const handleChange = (e) => {
    setEnteredAirport(e.target.value);

    console.log(`AirportInput e.target.value is ${e.target.value}`);
  };

  return (
    <div>
      <label>Home Airport:</label>
      <AutoComplete
        name="autocomplete-airport"
        items={airports}
        value={enteredAirport}
        onChange={handleChange}
      />
      {/* <pre>{JSON.stringify(enteredAirport)}</pre> */}
    </div>
  );
};

export default AirportInput;
