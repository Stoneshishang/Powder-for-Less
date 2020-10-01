import React from "react";
import "./Dates.css";

import { Context } from "../../ContextState";

const Dates = () => {
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
              required
            />
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
              required
            />
          </div>
        )}
      </Context.Consumer>
    </div>
  );
};

export default Dates;
