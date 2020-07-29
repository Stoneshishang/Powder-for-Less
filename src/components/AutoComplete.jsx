import React, { createContext } from "react";
import "./AutoComplete.css";
import { v4 as uuidv4 } from "uuid";

export const AirportContext = createContext("");

export default class AutoComplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions: [],
      text: "",
    };
  }

  onTextChanged = (e) => {
    const { items } = this.props;
    const value = e.target.value;
    // console.log(`autocomplete value is ${value}`);
    let suggestions = [];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, "i");
      suggestions = items.sort().filter((v) => regex.test(v));
    }
    this.setState(() => ({ suggestions, text: value }));
  };

  suggestionSelected = (value) => {
    this.setState(() => ({
      text: value,
      suggestions: [],
    }));
    // console.log(`suggestionSelected is ${value}`);
  };

  renderSuggestions() {
    const { suggestions } = this.state;
    if (suggestions.length === 0) {
      return null;
    }
    return (
      <ul key={uuidv4()}>
        {suggestions.map((item) => (
          <li key={uuidv4()} onClick={() => this.suggestionSelected(item)}>
            {item}
            {/* {console.log(`this.item is ${item}`)} */}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    const { text } = this.state;
    return (
      <div className='auto-complete'>
        <input
          value={text}
          onChange={this.onTextChanged}
          placeholder='Home Airport'
          type='text'
          // required
        />
        {this.renderSuggestions()}
        {/* {console.log(`this.text is ${text}`)} */}
        <AirportContext.Provider value={text}></AirportContext.Provider>
        {console.log("AutoComplete text is: ", text)}
        {/* <button onClick={() => this.setState(text)}>Submit Airport</button> */}
        <pre>{JSON.stringify(text)}</pre>
      </div>
    );
  }
}
