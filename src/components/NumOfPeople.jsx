import React from "react";

import { Context } from "../ContextState";

const NumOfPeople = () => {
  return (
    <Context.Consumer>
      {({ num, setNum }) => (
        <div className="passenger-number">
          <label htmlFor="num-people">Number of People:</label>
          <input
            name="numPeople"
            value={num}
            onChange={(event) => setNum(event.target.value)}
            placeholder="Number of Passengers"
            // required
          />
          {/* {console.log("Context.Consumer num is: ", num)} */}
          {/* <pre>input Num is {JSON.stringify(num)}</pre> */}
        </div>
      )}
    </Context.Consumer>
  );
};

export default NumOfPeople;
