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

  bothData: {},
  fetchBothData: () => {},
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
  const [bothData, setBothData] = useState({ weather: null, flight: null });

  // fetchBothData is where the Data is actually fetched and set to the Context.
  const fetchBothData = async (args) => {
    const bothData = await fetchBoth(args);

    setBothData(bothData);
  };

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

    bothData,
    fetchBothData,
  };

  // {value} is object property value shorthand.
  // {...{value}} is spreading keys as component props. it's the conventional way to
  // keep from having to write value={value}.
  return <Context.Provider {...{ value }}>{children}</Context.Provider>;
};
