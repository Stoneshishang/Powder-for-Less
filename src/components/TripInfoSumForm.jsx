import React, { useContext, useEffect, useState, useRef } from "react";
<<<<<<< HEAD
// import _ from "lodash";
=======
import SumTable from "./SumTable";
>>>>>>> fetch-both-API-at-once
import { Context } from "../ContextState";
import _ from "lodash";

const TripInfoSum = () => {
  const {
    airport,
    selectedMW,
    selectedRockies,
    selectedSierra,
    // num,
    departureDate,
    returnDate,
<<<<<<< HEAD
    weatherData,
    fetchWeatherData,
    flightData,
    fetchFlightData,
  } = useContext(Context);

  const [count, setCount] = useState(0);
  const [countEffect, setCountEffect] = useState(0);
  const weatherResultArray = useRef([]);
  const flightReasultArray = useRef([]);

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
    let latCords = weatherData.lat;
    if (item !== undefined) {
      item = weatherData.daily[daysDepartureTimeDiff].humidity;
      weatherResultArray.current.push(item);
    }
    setCountEffect(countEffect + 1);
    console.log(
      `---------useEffect triggered ${countEffect} times-------------`,
    );

    console.log(
      `1. chosen resort latitude ${latCords}, humidity for testing is: ${JSON.stringify(
        item,
      )}`,
    );
    // console.log("departure time diff is: ", daysDepartureTimeDiff);
    let flightDest = flightData.Places;
    let flightPrice = flightData.Quotes;

    flightReasultArray.current.push(flightPrice);
    // if (flightDest !== undefined && flightPrice !== undefined) {
    // flightDest = flightData.Places

    console.log("2. flight Destination is: ", flightDest);
    console.log("3. flight Price is: ", flightPrice);
    // }
  }, [weatherData, flightData]);
=======

    bothData,
    fetchBothData,

    sumTableData,
    setSumTableData,
  } = useContext(Context);

  // const [sumTableWeatherInfo, setSumTableWeatherInfo] = useState();
  // const [sumTableFlightInfo, setSumTableFlightInfo] = useState();

  const [count, setCount] = useState(0);
  const [countEffect, setCountEffect] = useState(0);

  const chosenResortsObjArr = selectedMW.concat(selectedRockies);
  // console.log("   choseResortsObjArr is: ", chosenResortsObjArr);
>>>>>>> fetch-both-API-at-once

  //fetch weather data base on the resorts' cordinates.
  const chosenResortsCordsArr = selectedMW
    .concat(selectedRockies)
    .map((x) => x.value);

  console.log(`chosenResortsCordsArr is: `, chosenResortsCordsArr);
  console.log("weatherResultArr outside is: ", weatherResultArray);
  console.log("flightReasultArray outside is: ", flightReasultArray);
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

  // console.log("latCords is: ", latCords);

  // const latArr = chosenResortsCordsArr.map((x) => _.round(x.lat, 2)); // use lodash to round it.

  // console.log("latArr is: ", latArr);

  // //storing API results for display.
  // const identifyResorts = latArr.indexOf(latCords);

  // console.log("identifyResorts is: ", identifyResorts);

  //find the unique items in the string.
  // const uniqueAirports = [...new Set(chosenResortsAirportArr)];

  // update selected date item
  let gatherSumTableData = {};

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
      `----------------------useEffect triggered ${countEffect} times------------------------`,
    );

    const weather = bothData.weather;
    let dataID = "";
    let tripSnowSum = 0;
    if (weather !== null) {
      const { daily: dailyWeatherInfo } = weather.data;

      const { lat: weatherLocationInfo } = weather.data;

      const tripDuationWeather = dailyWeatherInfo.slice(
        daysDepartureTimeDiff,
        daysReturnTimeDiff,
      );
      const tripDurationSnowArr = tripDuationWeather.map((x) => x.snow);
      tripSnowSum = tripDurationSnowArr.reduce((s, v) => {
        return s + (v || 0);
      }, 0);

      console.log("   tripSnowSum is: ", tripSnowSum);

      //Match response Data with corresponding resort
      const dataIDObj = chosenResortsObjArr.filter((obj) => {
        return _.round(obj.value.lat, 2) === weatherLocationInfo;
      });

      dataID = dataIDObj.map((id) => id.label);
    }

    const flight = bothData.flight;
    let direct = [];
    let minPrice = [];
    if (flight !== null) {
      const { Quotes } = flight.data;
      direct = Quotes.map((x) => x.Direct);
      minPrice = Quotes.map((x) => x.MinPrice);
      console.log("Quotes is: ", Quotes);
    }

    //merge two array into an object.
    const flightRoute = {};
    direct.forEach((d, p) => (flightRoute[d] = minPrice[p]));

    gatherSumTableData = {
      resort: dataID,
      weather: tripSnowSum,
      flight: flightRoute,
    };

    console.log(`${dataID} gatherSumTableData is: `, gatherSumTableData);

    setSumTableData(gatherSumTableData);
  }, [bothData]);

  // handler used to trigger api fetch with necessary data
  const handleFetchData = () => {
    setCount(count + 1);
    console.log(
      `*************************clicked on it ${count} times ********************************* `,
    );

    for (let i = 0; i < tripObjectsArr.length; i++) {
      const chosenResortsCords = tripObjectsArr[i].ResortCords;
<<<<<<< HEAD
      const lat = chosenResortsCords.lat;
      const lon = chosenResortsCords.lon;
=======
      // console.log("chosenResortCords is: ", chosenResortsCords);

      const lat = chosenResortsCords.lat;
      const lon = chosenResortsCords.lon;

>>>>>>> fetch-both-API-at-once
      //fetch flight data base on the user location, selected resorts, and dates.
      const originplace = homeAirportCode;
      const destinationplace = tripObjectsArr[i].Airport;
      console.log("   destinationplace is: ", destinationplace);
      const outboundpartialdate = departureDate;
      const inboundpartialdate = returnDate;

<<<<<<< HEAD
      fetchWeatherData({ lat, lon });
      fetchFlightData({
        originplace,
        destinationplace,
        outboundpartialdate,
        inboundpartialdate,
      });

      // fetchWeatherData({ lat, lon });
      // if (originplace !== destinationplace) {
      //   fetchFlightData({
      //     originplace,
      //     destinationplace,
      //     outboundpartialdate,
      //     inboundpartialdate,
      //   });
      // } else {
      //   console.log(
      //     "You live very close to your selected resorts, you could drive!",
      //   );
      // }
=======
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
>>>>>>> fetch-both-API-at-once
    }
  };

  return (
    <div>
      {/* <pre>
        TripInfoSum selected MW resorts are {JSON.stringify(selectedMW)}
      </pre>
      <pre>
        TirpInfoSum Rockies resorts are {JSON.stringify(selectedRockies)}
      </pre> */}
      {/* <pre>TirpInfoSum Sierra resorts are {JSON.stringify(selectedSierra)}</pre>
      <pre>TripInfoSum home airpot is {JSON.stringify(airport)}</pre>
      <pre>TripInfoSum Number of Traveler is {JSON.stringify(num)}</pre>
      <pre>TripInfoSum departure Date is {JSON.stringify(departureDate)}</pre>
      <pre>TripInfoSum return Date is {JSON.stringify(returnDate)}</pre> */}

      <button onClick={handleFetchData}>Find Trips!</button>
      <SumTable />
    </div>
  );
};

export default TripInfoSum;
