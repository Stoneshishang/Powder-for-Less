import React, { useContext, useEffect, useState } from "react";

import { Context } from "../ContextState";
import { fetchFlight } from "../apis/fetchAPI";

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
    flightData,
    fetchFlightData,
  } = useContext(Context);

  const [count, setCount] = useState(0);

  // update selected date item
  useEffect(() => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
    const currentDate = yyyy + "-" + mm + "-" + dd;
    const departureTimeDiff = new Date(departureDate) - new Date(currentDate);
    const daysDepartureTimeDiff = Number(
      departureTimeDiff / (1000 * 60 * 60 * 24),
    );

    // fetch the chosen day's weather conditon.
    let item = weatherData.daily;
    if (item !== undefined) {
      item = weatherData.daily[daysDepartureTimeDiff].humidity;
    }
    console.log(
      `chosen day ${departureDate} humidity for testing is: ${JSON.stringify(
        item,
      )}`,
    );
    // console.log("departure time diff is: ", daysDepartureTimeDiff);

    let flight = flightData;

    console.log("flightData response is: ", flight);
  }, [departureDate, weatherData, flightData]);

  // handler used to trigger api fetch with necessary data
  const handleFetchWeather = () => {
    setCount(count + 1);
    console.log(
      `*************************clicked on it ${count} times ********************************* `,
    );

    const chosenResortsCordsArr = selectedMW.map((x) => x.value);

    const chosenResortsNameArr = selectedMW.map((x) => x.label);
    console.log("chosenResortsNameArr is: ", chosenResortsNameArr);

    for (let i = 0; i < chosenResortsCordsArr.length; i++) {
      const chosenResortsCords = chosenResortsCordsArr[i];
      // console.log("chosenResortsCords is: ", chosenResortsCords);

      const lat = chosenResortsCords.lat;
      const lon = chosenResortsCords.lon;
      fetchWeatherData({ lat, lon });
    }

    fetchFlightData();
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

      {/* </form> */}
    </div>
  );
};

export default TripInfoSum;
