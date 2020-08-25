import React, { useContext, useEffect, useState, useRef } from "react";
import SumTable from "./SumTable";
import { Context } from "../ContextState";

const TripInfoSum = () => {
  const {
    airport,
    selectedMW,
    selectedRockies,
    selectedSierra,
    // num,
    departureDate,
    returnDate,
    bothData,
    fetchBothData,
  } = useContext(Context);

  const [sumTableWeatherInfo, setSumTableWeatherInfo] = useState();
  const [sumTableFlightInfo, setSumTableFlightInfo] = useState();
  const weatherResultArray = useRef([]);
  const flightReasultArray = useRef([]);
  const tripObjArr = useRef([]);

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
    const returnTimeDiff = new Date(returnDate) - new Date(currentDate);
    const daysDepartureTimeDiff = Number(
      departureTimeDiff / (1000 * 60 * 60 * 24),
    );

    const daysReturnTimeDiff = Number(returnTimeDiff / (1000 * 60 * 60 * 24));

    setCountEffect(countEffect + 1);
    console.log(
      `---------useEffect triggered ${countEffect} times-------------`,
    );

    console.log("   bothData is: ", bothData);

    const weather = bothData.weather;
    if (weather !== null) {
      const { daily: dailyWeatherInfo } = weather.data;

      const tripDuationWeather = dailyWeatherInfo.slice(
        daysDepartureTimeDiff,
        daysReturnTimeDiff,
      );
      const tripDurationSnowArr = tripDuationWeather.map((x) => x.snow);
      const tripSnowSum = tripDurationSnowArr.reduce((s, v) => {
        return s + (v || 0);
      }, 0);

      // console.log("   tripDurationSnowis: ", tripDurationSnowArr);
      console.log("   tripSnowSum is: ", tripSnowSum);

      setSumTableWeatherInfo(tripSnowSum);

      weatherResultArray.current.push(tripSnowSum);
      console.log("   weatherResultArray is: ", weatherResultArray.current);
    }

    const flight = bothData.flight;
    if (flight !== null) {
      const { Quotes } = flight.data;

      setSumTableFlightInfo(JSON.stringify(Quotes));
      flightReasultArray.current.push(Quotes);
      console.log("   flightResultArray is: ", flightReasultArray.current);
    }
  }, [bothData]);

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
      // console.log("chosenResortCords is: ", chosenResortsCords);

      const lat = chosenResortsCords.lat;
      const lon = chosenResortsCords.lon;

      //fetch flight data base on the user location, selected resorts, and dates.
      const originplace = homeAirportCode;
      const destinationplace = tripObjectsArr[i].Airport;
      console.log("   destinationplace is: ", destinationplace);
      const outboundpartialdate = departureDate;
      const inboundpartialdate = returnDate;

      if (originplace !== destinationplace) {
        fetchBothData({
          lat,
          lon,
          originplace,
          destinationplace,
          outboundpartialdate,
          inboundpartialdate,
        });
      } else {
        console.log("   Drive is better!");
      }
    }
  };

  return (
    <div>
      {/* <pre>
        TripInfoSum selected MW resorts are {JSON.stringify(selectedMW)}
      </pre>
      <pre>
        TirpInfoSum Rockies resorts are {JSON.stringify(selectedRockies)}
      </pre>
      <pre>TirpInfoSum Sierra resorts are {JSON.stringify(selectedSierra)}</pre>
      <pre>TripInfoSum home airpot is {JSON.stringify(airport)}</pre>
      <pre>TripInfoSum Number of Traveler is {JSON.stringify(num)}</pre>
      <pre>TripInfoSum departure Date is {JSON.stringify(departureDate)}</pre>
      <pre>TripInfoSum return Date is {JSON.stringify(returnDate)}</pre> */}

      <button onClick={handleFetchData}>Find Trips!</button>
      <SumTable
        onSumWeatherInfo={sumTableWeatherInfo}
        onSumFlightInfo={sumTableFlightInfo}
      />
    </div>
  );
};

export default TripInfoSum;
