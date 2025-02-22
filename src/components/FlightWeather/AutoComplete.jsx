import React, { useState, useContext } from "react";
import { Context } from "../../ContextState";
import "./AutoComplete.css";

//This feature is converted from class components to Hooks based on below videos
// https://www.youtube.com/watch?v=2sBDf8xbKEY&list=PL87K_SqEjuYA45pWf3EZkj4getpNacJds&index=3

const Suggestions = ({ suggestions = [], handleSelectSuggestion }) => {
  if (suggestions.length === 0) return null;

  return (
    <ul>
      {suggestions.map((item) => (
        <li key={item} onClick={() => handleSelectSuggestion(item)}>
          {item}
        </li>
      ))}
    </ul>
  );
};

const AutoComplete = ({ items }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [text, setText] = useState("");

  const { setAirport } = useContext(Context);

  const handleSelectSuggestion = (selectedItem) => {
    setSuggestions([]);
    setText(selectedItem);
    setAirport(selectedItem);
  };

  const handleTextChange = ({ target: { value = "" } }) => {
    const regex = new RegExp(`^${value}`, "i");
    const updatedSuggestions =
      value.length > 0
        ? items
            .slice()
            .sort()
            .filter((v) => regex.test(v))
        : [];
    setSuggestions(updatedSuggestions);
    setText(value);
  };

  return (
    <div className="auto-complete">
      <label className="label">Home Airport:</label>
      <input
        value={text}
        onChange={handleTextChange}
        placeholder="Home Airport"
        type="text"
      />
      <Suggestions {...{ suggestions, handleSelectSuggestion }} />
    </div>
  );
};

export default AutoComplete;
