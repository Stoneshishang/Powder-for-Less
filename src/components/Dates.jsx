import React from "react";

import { Context } from "../ContextState";

const Dates = () => {
  // const [departureDate, setDepartureDate] = useState("");
  // const [arrivalDate, setArrivalDate] = useState("");

  // const onDepartureDateHandler = (e) => {
  //   setDepartureDate(e.target.value);
  //   console.log(`Departure Date is ${e.target.value}`);
  // };

  // const onArrivalDateHandler = (e) => {
  //   setArrivalDate(e.target.value);
  //   console.log(`Arrival Date is ${e.target.value}`);
  // };

  return (
    <div className="dates">
      <Context.Consumer>
        {({ departureDate, setDepartureDate }) => (
          <div>
            <label htmlFor="departure-date">Departure Date:</label>
            <input
              type="date"
              name="departure-date"
              placeholder="Deaprture Date"
              value={departureDate}
              onChange={(event) => setDepartureDate(event.target.value)}
              // required
            />
            <pre>Selected departureDate is {JSON.stringify(departureDate)}</pre>
          </div>
        )}
      </Context.Consumer>
      <Context.Consumer>
        {({ returnDate, setReturnDate }) => (
          <div>
            <label htmlFor="return-date">Return Date:</label>
            <input
              type="date"
              name="return-date"
              placeholder="Return Date"
              value={returnDate}
              onChange={(event) => setReturnDate(event.target.value)}
              // required
            />
            <pre>Selected arrivalDate is {JSON.stringify(returnDate)}</pre>
          </div>
        )}
      </Context.Consumer>
    </div>
  );
};

export default Dates;
