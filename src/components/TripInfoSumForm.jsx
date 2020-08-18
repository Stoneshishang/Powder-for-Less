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
    flightData,
    fetchFlightData,
  } = useContext(Context);

  const [count, setCount] = useState(0);
  const [countEffect, setCountEffect] = useState(0);

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

    setCountEffect(countEffect + 1);
    console.log(
      `---------useEffect triggered ${countEffect} times-------------`,
    );

    console.log(
      `1. chosen day ${departureDate} humidity for testing is: ${JSON.stringify(
        item,
      )}`,
    );
    // console.log("departure time diff is: ", daysDepartureTimeDiff);
    let flightDest = flightData.Places;
    let flightPrice = flightData.Quotes;
    // if (flightDest !== undefined && flightPrice !== undefined) {
    // flightDest = flightData.Places

    console.log("2. flight Destination is: ", flightDest);
    console.log("3. flight Price is: ", flightPrice);

    // }
  }, [departureDate, weatherData, flightData]);

  //fetch weather data base on the resorts' cordinates.
  const chosenResortsCordsArr = selectedMW
    .concat(selectedRockies)
    .map((x) => x.value);
  //fetch flight data base on resorts' selections.
  const chosenResortsAirportArr = selectedMW
    .concat(selectedRockies)
    .map((x) => x.airport);

  //"Zip" two arrays into one array of objects. so I can iterate through each object.
  // https://stackoverflow.com/questions/50741594/how-to-combine-two-arrays-into-an-array-of-objects-in-javascript
  const tripObjectsArr = chosenResortsCordsArr.map((x, i) => {
    return { ResortCords: x, Airport: chosenResortsAirportArr[i] };
  });

  //extract airport code from string.
  const homeAirportCode = airport.substring(
    airport.length - 4,
    airport.length - 1,
  );

  //find the unique items in the string.
  // const uniqueAirports = [...new Set(chosenResortsAirportArr)];

  // handler used to trigger api fetch with necessary data
  const handleFetchData = () => {
    setCount(count + 1);
    console.log(
      `*************************clicked on it ${count} times ********************************* `,
    );

    for (let i = 0; i < tripObjectsArr.length; i++) {
      const chosenResortsCords = tripObjectsArr[i].ResortCords;
      // console.log("chosenResortsCords is: ", chosenResortsCords);

      const lat = chosenResortsCords.lat;
      const lon = chosenResortsCords.lon;
      fetchWeatherData({ lat, lon });

      //fetch flight data base on the user location, selected resorts, and dates.
      const originplace = homeAirportCode;
      const destinationplace = tripObjectsArr[i].Airport;
      console.log("destinationplace is: ", destinationplace);
      const outboundpartialdate = departureDate;
      const inboundpartialdate = returnDate;

      if (originplace !== destinationplace) {
        fetchFlightData({
          originplace,
          destinationplace,
          outboundpartialdate,
          inboundpartialdate,
        });
      } else {
        console.log(
          "You live very close to your selected resorts, you could drive!",
        );
      }
    }
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

      <button onClick={handleFetchData}>Click me</button>

      {/* </form> */}
    </div>
  );
};

export default TripInfoSum;
