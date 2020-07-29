import React, { useState } from "react";

function Dates() {
  const [departureDate, setDepartureDate] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");

  const onDepartureDateHandler = (e) => {
    setDepartureDate(e.target.value);
    console.log(`Departure Date is ${e.target.value}`);
  };

  const onArrivalDateHandler = (e) => {
    setArrivalDate(e.target.value);
    console.log(`Arrival Date is ${e.target.value}`);
  };

  return (
    <div className='dates'>
      <div>
        <label htmlFor='departure-date'>Departure Date:</label>
        <input
          type='date'
          name='departure-date'
          placeholder='Deaprture Date'
          value={departureDate}
          onChange={onDepartureDateHandler}
          // required
        />
        <pre>Selected departureDate is {JSON.stringify(departureDate)}</pre>
      </div>
      <div>
        <label htmlFor='return-date'>Return Date:</label>
        <input
          type='date'
          name='return-date'
          placeholder='Return Date'
          value={arrivalDate}
          onChange={onArrivalDateHandler}
          // required
        />
        <pre>Selected arrivalDate is {JSON.stringify(arrivalDate)}</pre>
      </div>
    </div>
  );
}

export default Dates;
