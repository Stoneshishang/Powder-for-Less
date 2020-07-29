import React, { useState } from "react";

function NumOfPeople() {
  const [num, setNum] = useState("");

  const numChangeHandler = (e) => {
    setNum(e.target.value);
    console.log(`Num is ${e.target.value}`);
  };

  return (
    <div className='passenger-number'>
      <label htmlFor='num-people'>Number of People:</label>
      <input
        name='numPeople'
        value={num}
        onChange={numChangeHandler}
        placeholder='Number of Passengers'
        // required
      />
      <pre>input Num is {JSON.stringify(num)}</pre>
    </div>
  );
}

export default NumOfPeople;
