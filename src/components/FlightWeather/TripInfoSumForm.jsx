import React, { useContext, useEffect, useState, useRef } from "react";
import CollapsibleSumTable from "./CollapsibleSumTable";
import { Context } from "../../ContextState";
import _ from "lodash";
import moment from "moment";
import "./TripInfoSumForm.css";

// import LaterButtonClickTable from "./LaterButtonClickTable";

const TripInfoSum = () => {
  const {
    airport,
    selectedMW,
    selectedRockies,
    departureDate,
    returnDate,
    bothData,
    fetchBothData,
    sumTableData,
    setSumTableData,
    setDetailTableData,
    loading,
    setLoading,
  } = useContext(Context);

  const [countButtonClick, setCountButtonClick] = useState(0);
  const [countEffect, setCountEffect] = useState(0);

  const [buttonClick, setButtonClick] = useState(false);

  const chosenResortsObjArr = selectedMW.concat(selectedRockies);
  // console.log("   choseResortsObjArr is: ", chosenResortsObjArr);

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

  // update selected date item
  let detailWeatherDataArr = [];
  let detailDatesArr = [];
  let tripSnowSum = 0;
  let resortID = "";
  let gatherSumTableData = {};
  let gatherDetailTableData = {};

  // const prevSumTable = useRef([]);

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

    const daysReturnTimeDiff =
      Number(returnTimeDiff / (1000 * 60 * 60 * 24)) + 1;

    setCountEffect(countEffect + 1);
    console.log(
      `----------------------useEffect triggered ${countEffect} times------------------------`,
    );

    const weather = bothData.weather;
    if (weather !== null) {
      const { daily: dailyWeatherInfo } = weather.data;

      const { lat: weatherLocationInfo } = weather.data;

      const tripDuationWeather = dailyWeatherInfo.slice(
        daysDepartureTimeDiff,
        daysReturnTimeDiff,
      );
      const tripDurationSnowArr = tripDuationWeather.map((x) => x.snow);

      detailWeatherDataArr = tripDurationSnowArr.map((v) =>
        v === undefined ? "-" : v,
      );

      // console.log("detialTableDataArr is: ", detailWeatherDataArr);

      const departureDateString = JSON.stringify(departureDate);

      const returnDateString = JSON.stringify(returnDate);

      const getDaysArray = (startDate, stopDate) => {
        let dateArray = [];
        let currentDate = moment(startDate, "YYYY-MM-DD");
        stopDate = moment(stopDate, "YYYY-MM-DD");
        while (currentDate <= stopDate) {
          dateArray.push(moment(currentDate).format("YYYY-MM-DD"));
          currentDate = moment(currentDate).add(1, "days");
        }
        return dateArray;
      };

      detailDatesArr = getDaysArray(departureDateString, returnDateString);

      // console.log("datesArr is: ", detailDatesArr);

      tripSnowSum = tripDurationSnowArr.reduce((s, v) => {
        return s + (v || 0);
      }, 0);

      //Match response Data with corresponding resort
      const resortIDObj = chosenResortsObjArr.filter((obj) => {
        return _.round(obj.value.lat, 2) === weatherLocationInfo;
      });

      resortID = resortIDObj.map((id) => id.label);
      resortID = resortID[0];
      console.log("resortID is: ", resortID);
    }

    const flight = bothData.flight;

    let direct = [];
    let minPrice = [];
    let minFlightIDs = [];
    let carriersList = [];
    if (flight !== null) {
      const { Quotes } = flight.data;
      direct = Quotes.map((x) => x.Direct);
      console.log('direct is: ', direct);
      minPrice = Quotes.map((x) => x.MinPrice);
      console.log('min price is: ', minPrice);


      console.log("full flight info is: ", flight.data);
      console.log("flight Quotes are: ", Quotes);

      carriersList = flight.data.Carriers;

      console.log("carriersList is: ", carriersList);

      minFlightIDs = Quotes.map((x) => Number(x.OutboundLeg.CarrierIds));
      console.log('minFlightIDs is: ', minFlightIDs);

    }
    //merge two array into an object.
    const flightRoute = {};
    direct.forEach((d, p) => (flightRoute[d] = minPrice[p]));

    //add key/value pair into object.

    if(flight !== null){
      flightRoute["trueAirline"] = flight.data.Carriers.filter(x => x.CarrierId === flightRoute.true);
      flightRoute["falseAirline"] = flight.data.Carriers.filter(x => x.CarrierId === flightRoute.false);
  
    }
   
    console.log(flightRoute);

    gatherSumTableData = {
      resort: resortID,
      weather: tripSnowSum,
      flight: flightRoute,
    };

    // prevSumTable.current = prevSumTable.push(gatherSumTableData);

    // console.log(`${resortID} gatherSumTableData is: `, gatherSumTableData);

    gatherDetailTableData = {
      resort: resortID,
      date: detailDatesArr,
      weather: detailWeatherDataArr,
    };

    console.log("gatherDetailTableData is: ", gatherDetailTableData);

    setDetailTableData((prevData) => {
      return [...prevData, gatherDetailTableData];
    });

    // console.log("tripInfoSum detailTableData is: ", detailTableData);

    setSumTableData((prevData) => {
      return [...prevData, gatherSumTableData];
    });

    // console.log("sumTableData is: ", sumTableData);
  }, [bothData]);

  // handler used to trigger api fetch with necessary data
  const conditionalRenderTable = () => {
    setLoading(true);
    setCountButtonClick(countButtonClick + 1);
    console.log(
      `*************************clicked on it ${countButtonClick} times ********************************* `,
    );
    if (countButtonClick === 0) {
      handleFetchData();
    } else {
      setSumTableData([
        {
          resort: "",
          weather: 0,
          flight: {},
        },
        {
          resort: "",
          weather: 0,
          flight: {},
        },
      ]);
      console.log("conditionalRenderTable SumTableData is: ", sumTableData);

      setDetailTableData([]);

      handleFetchData();
    }
  };

  const handleFetchData = () => {
    for (let i = 0; i < tripObjectsArr.length; i++) {
      const chosenResortsCords = tripObjectsArr[i].ResortCords;

      const lat = chosenResortsCords.lat;
      const lon = chosenResortsCords.lon;

      //fetch flight data base on the user location, selected resorts, and dates.
      const originplace = homeAirportCode;
      const destinationplace = tripObjectsArr[i].Airport;
      // console.log("   destinationplace is: ", destinationplace);
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
      }
    }

    setButtonClick(true);
  };

  return (
    <div>
      <button className="find-trip-btn" onClick={conditionalRenderTable}>
        Find Trips!
      </button>
      {buttonClick === true && <CollapsibleSumTable isLoading={loading} />}
    </div>
  );
};

export default TripInfoSum;
