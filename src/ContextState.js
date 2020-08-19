import React, { createContext, useState } from "react";
import {
  // fetchWeather, fetchFlight,
  fetchBoth,
} from "./apis/fetchAPI";

const defaultState = {
  // Airport Selection
  airport: "",
  setAirport: () => {},
  // Resort Selection
  selectedMW: [],
  setSelectedMW: () => {},
  selectedRockies: [],
  setSelectedRockies: () => {},
  selectedSierra: [],
  setSelectedSierra: () => {},
  // Number of people selection
  num: "",
  setNum: () => {},
  // Date
  departureDate: "",
  setDepartureDate: () => {},

  arrivalDate: "",
  setArrivalDate: () => {},
  // // Weather Data
  // fetchWeatherData: () => {},
  // weatherData: {},
  // // Flight Data
  // fetchFlightData: () => {},
  // flightData: {},

  fetchBoth: () => {},
  bothData: {},
};

export const Context = createContext(defaultState);

export const InfoProvider = ({ children }) => {
  const [airport, setAirport] = useState("");
  const [selectedMW, setSelectedMW] = useState([]);
  const [selectedRockies, setSelectedRockies] = useState([]);
  const [selectedSierra, setSelectedSierra] = useState([]);
  const [num, setNum] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  // const [weatherData, setWeatherData] = useState("");
  // const [flightData, setFlightData] = useState("");
  const [bothData, setBothData] = useState({ weather: null, flight: null });

  const fetchBoth = async (args) => {
    const bothData = await fetchBoth(args);

    setBothData(bothData);
  };

  // const fetchWeatherData = async (args) => {
  //   const weatherData = await fetchWeather(args);
  //   // console.log("ContextState fetchweatherData is: ", weatherData);

  //   setWeatherData(weatherData);
  // };

  // const fetchFlightData = async (args) => {
  //   const flightData = await fetchFlight(args);
  //   // console.log("ContextState fetchFlightData is: ", flightData);

  //   setFlightData(flightData);
  // };

  const value = {
    // Airport Selection
    airport,
    setAirport,
    // Resort Selection
    selectedMW,
    setSelectedMW,

    selectedRockies,
    setSelectedRockies,

    selectedSierra,
    setSelectedSierra,

    num,
    setNum,

    departureDate,
    setDepartureDate,

    returnDate,
    setReturnDate,

    // weatherData,
    // fetchWeatherData,

    // flightData,
    // fetchFlightData,

    bothData,
    fetchBoth,
  };

  // {value} is object property value shorthand.
  // {...{value}} is spreading keys as component props. it's the conventional way to
  // keep from having to write value={value}.
  return <Context.Provider {...{ value }}>{children}</Context.Provider>;
};
