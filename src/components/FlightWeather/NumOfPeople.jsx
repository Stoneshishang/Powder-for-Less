import React from "react";
import "./NumOfPeople.css";

import { Context } from "../../ContextState";

const NumOfPeople = () => {
  return (
    <Context.Consumer>
      {({ num, setNum }) => (
        <div className="num-of-people">
          <label htmlFor="num-people">Number of People:</label>
          <input
            name="numPeople"
            value={num}
            onChange={(event) => setNum(event.target.value)}
            placeholder="Number of Passengers"
          />
        </div>
      )}
    </Context.Consumer>
  );
};

export default NumOfPeople;
