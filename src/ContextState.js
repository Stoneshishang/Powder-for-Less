import React, { createContext, useState } from "react";

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
};

export const Context = createContext(defaultState);

export const Provider = ({ children }) => {
  const [airport, setAirport] = useState("");
  const [selectedMW, setSelectedMW] = useState([]);
  const [selectedRockies, setSelectedRockies] = useState([]);
  const [selectedSierra, setSelectedSierra] = useState([]);
  const [num, setNum] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");

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

    arrivalDate,
    setArrivalDate,
  };

  return <Context.Provider {...{ value }}>{children}</Context.Provider>;
};
