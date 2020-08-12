import React, { useContext, useEffect, useState } from "react";

import { Context } from "../ContextState";

const TripInfoSum = () => {
  const {
    airport,
    selectedMW,
    selectedRockies,
    selectedSierra,
    num,
    departureDate,
    returnDate,
    weatherData,
    fetchWeatherData,
  } = useContext(Context);

  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = today.getFullYear();
  const currentDate = yyyy + "-" + mm + "-" + dd;
  const departureTimeDiff = new Date(departureDate) - new Date(currentDate);
  // const daysDepartureTimeDiff = departureTimeDiff / (1000 * 60 * 60 * 24);

  const [count, setCount] = useState(0);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  // update selected date item
  useEffect(() => {
    if (loading) {
      setLoading(false);
      const daysDepartureTimeDiff = departureTimeDiff / (1000 * 60 * 60 * 24);
      const item = weatherData.daily;
      const wholeitem = weatherData.daily;
      setData(item);
      console.log("darparture days difference is: ", daysDepartureTimeDiff);
      console.log("weatherData whole is", wholeitem);
      console.log("weatherData item is: ", item);
    }
  }, [loading, weatherData, departureTimeDiff]);

  // handler used to trigger api fetch with necessary data
  const handleFetchWeather = () => {
    const lat = "40.562307";
    const lon = "-111.640067";
    setLoading(true);
    fetchWeatherData({ lat, lon });
    setCount(count + 1);
    console.log(
      `**************clicked on it ${count} times ****************************** `,
    ); // pass in the date
  };

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

      <pre>TripInfoSum return Date is {JSON.stringify(returnDate)}</pre>

      {/* <form onSubmit={submitHandler}> */}

      <button onClick={handleFetchWeather}>Click me</button>
      {/* {loading ? <div>...loading</div> : <div>{data}</div>} */}

      {/* </form> */}
    </div>
  );
};

export default TripInfoSum;
