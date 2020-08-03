import React, { useState } from "react";

function NumOfPeople() {
  const [num, setNum] = useState("");

  const numChangeHandler = (e) => {
    setNum(e.target.value);
    console.log(`Num is ${e.target.value}`);
  };

  return (
    <div className="passenger-number">
      <label htmlFor="num-people">Number of People:</label>
      <input
        name="numPeople"
        value={num}
        onChange={numChangeHandler}
        placeholder="Number of Passengers"
        // required
      />
      {console.log("Context.Consumer num is: ", num)}
      <pre>input Num is {JSON.stringify(num)}</pre>
    </div>
  );
}

// import { Context } from "../ContextState";

// function NumOfPeople() {
//   // const [num, setNum] = useState("");

//   // const numChangeHandler = (e) => {
//   //   const { value } = e.target;
//   //   console.log(`value is ${value}`);

//   //   setNum(value);
//   // };

//   return (
//     <Context.Consumer>
//       {({ num, setNum }) => (
//         <div className="passenger-number">
//           <label htmlFor="num-people">Number of People:</label>
//           <input
//             name="numPeople"
//             value={num}
//             onChange={() => setNum()}
//             placeholder="Number of Passengers"
//             // required
//           />
//           {console.log("Context.Consumer num is: ", num)}
//           <pre>input Num is {JSON.stringify(num)}</pre>
//           <button onClick={setNum}>Submit NumOfPeople</button>
//         </div>
//       )}
//     </Context.Consumer>
//   );
// }

export default NumOfPeople;
