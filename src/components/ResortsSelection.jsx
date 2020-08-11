import React from "react";
import MultiSelect from "react-multi-select-component";
import "./ResortSelection.css";

import { Context } from "../ContextState";

const ResortSelection = () => {
  const MidWest = [
    { label: "Boyne Mountain", value: "boyne-mountain" },
    { label: "Boyne Highland", value: "boyne-highland" },
  ];

  const Rockies = [
    { label: "Alta Snowbird, UT", value: "alta-snowbird" },
    { label: "Arapahoe Basin Ski Area, CO", value: "abasin" },
    { label: "Aspen Snowmass, CO", value: "snowmass" },
    { label: "Big Sky Resort, MT", value: "big-sky" },
    { label: "Brighton Resort, UT", value: "brighton" },
    { label: "Jackson Hole, WY", value: "jackson-hole" },
  ];

  const Sierra = [
    { label: "Squaw Valley, CA", value: "Squaw" },
    { label: "Mammoth Mounatain, CA", value: "Mammoth" },
    { label: "Alpine Meadows", value: "Apline Meadows" },
  ];

  return (
    // Render the MultiSelected Boxes by resorts region.
    <div className="resortSelection">
      <div className="resortList">
        {/* Context.Consumer vs useContext https://stackoverflow.com/questions/56816374/context-consumer-vs-usecontext-to-access-values-passed-by-context-provider */}
        <Context.Consumer>
          {({ selectedMW, setSelectedMW }) => (
            <div className="midwest">
              <h1>MID WEST</h1>
              {/* <pre>{JSON.stringify(selectedResorts)}</pre> */}
              <MultiSelect
                options={MidWest}
                value={selectedMW}
                onChange={setSelectedMW}
                labelledBy={"Select"}
              />
            </div>
          )}
        </Context.Consumer>

        <Context.Consumer>
          {({ selectedRockies, setSelectedRockies }) => (
            <div className="rockies">
              <h1>ROCKIES</h1>
              <MultiSelect
                options={Rockies}
                value={selectedRockies}
                onChange={setSelectedRockies}
                labelledBy={"Select"}
              />
            </div>
          )}
        </Context.Consumer>

        <Context.Consumer>
          {({ selectedSierra, setSelectedSierra }) => {
            return (
              <div className="sierra">
                <h1>WEST</h1>
                <MultiSelect
                  options={Sierra}
                  value={selectedSierra}
                  onChange={setSelectedSierra}
                  labelledBy={"Select"}
                />
              </div>
            );
          }}
        </Context.Consumer>
      </div>
    </div>
  );
};

export default ResortSelection;
