import React, { createContext, useState } from 'react';

const defaultState = {
  // Airport Selection
  airport: '',
  setAirport: () => {},
  // Resort Selection
  selectedMW: '',
  setSelectedMW: () => {},
};

export const Context = createContext(defaultState);

export const Provider = ({ children }) => {
  const [airport, setAirport] = useState('');
  const [selectedMW, setSelectedMW] = useState('');

  const value = {
    // Airport Selection
    airport,
    setAirport,
    // Resort Selection
    selectedMW,
    setSelectedMW,
  };

  return <Context.Provider {...{ value }}>{children}</Context.Provider>;
};
