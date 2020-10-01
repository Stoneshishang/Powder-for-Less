import React from "react";
import MultiSelect from "react-multi-select-component";
import "./ResortSelection.css";

import { Context } from "../../ContextState";

// few other multiselect choices
// https://www.npmjs.com/package/react-select
// https://www.npmjs.com/package/bootstrap-multiselect

const ResortSelection = () => {
  const MidWest = [
    {
      label: "Boyne Mountain",
      value: { lat: 45.163557, lon: -84.930053 },
      airport: "TVC",
    },
    {
      label: "Boyne Highland",
      value: { lat: 45.470979, lon: -84.935531 },
      airport: "TVC",
    },
    {
      label: "Pine Knob",
      value: { lat: 42.745835, lon: -83.369018 },
      airport: "DTW",
    },
  ];

  const Rockies = [
    {
      label: "Valle Nevado, Chile",
      value: { lat: -33.347118, lon: -70.253 },
      airport: "SLC",
    },
    {
      label: "Alta Snowbird, UT",
      value: { lat: 40.578996, lon: -111.635285 },
      airport: "SLC",
    },
    {
      label: "Arapahoe Basin Ski Area, CO",
      value: { lat: 39.632573, lon: -105.872859 },
      airport: "DEN",
    },
    // { label: "Aspen Snowmass, CO", value: "snowmass",  },
    // { label: "Big Sky Resort, MT", value: "big-sky" },
    // { label: "Brighton Resort, UT", value: "brighton" },
    {
      label: "Jackson Hole, WY",
      value: { lat: 43.596489, lon: -110.845369 },
      airport: "JAC",
    },
  ];

  const Sierra = [
    { label: "Squaw Valley, CA", value: "Squaw" },
    { label: "Mammoth Mounatain, CA", value: "Mammoth" },
    { label: "Alpine Meadows", value: "Apline Meadows" },
  ];

  return (
    // Render the MultiSelected Boxes by resorts region.
    <div className="resort-selection">
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
