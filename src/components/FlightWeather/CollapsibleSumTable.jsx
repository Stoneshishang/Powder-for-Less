import React, { useContext } from "react";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import { Context } from "../../ContextState";
import "./CollapsibleSumTable.css";

const CollapsibleSumTable = (props) => {
  const { sumTableData, setLoading } = useContext(Context);
  const { detailTableData, setDetailTableData } = useContext(Context);

  const slicedData = sumTableData.slice(2, sumTableData.length);

  let selectedResortInDetailedTableData;
  console.log("slicedData is: ", slicedData);

  const renderDetailTable = (resortName) => {
    console.log("**********renderDetailTable is triggered!**************");
    // console.log("renderDetailTable is: ", detailTableData);
    const shownState = detailTableData.slice();
    // console.log("shownState is: ", shownState);
    // console.log("resortName is: ", resortName);
    const index = shownState.indexOf(resortName);
    // console.log("index is: ", index);
    if (index >= 0) {
      shownState.splice(index, 1);
      setDetailTableData(shownState);
    } else {
      shownState.push(resortName);
      setDetailTableData(shownState);
    }
  };

  const renderTable = (data) => {
    selectedResortInDetailedTableData = detailTableData.find(
      ({ resort }) => resort === data.resort,
    );

    setLoading(false);

    // console.log("data in renderTable is: ", data);
    return (
      <React.Fragment key={data.resort}>
        {/* {setLoading(false)} */}
        <tr>
          <td>{data.resort}</td>
          <td>{data.weather}</td>
          <td>
            <table>{renderFlightRouteInfo(data.flight)}</table>
          </td>
          <td>
            <button onClick={() => renderDetailTable(data.resort)}>
              view detailed weather
            </button>
          </td>
        </tr>
        {detailTableData.includes(data.resort) && (
          <React.Fragment>
            {/* {console.log("detailsShown data.resort is: ", data.resort)}
            {console.log("detailTableData is: ", detailTableData)} */}

            <tr>
              {selectedResortInDetailedTableData.date.map((date, index) => (
                <td key={index}>{date}</td>
              ))}
            </tr>
            <tr>
              {selectedResortInDetailedTableData.weather.map(
                (weather, index) => (
                  <td key={index}>{weather}</td>
                ),
              )}
            </tr>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  };

  const renderFlightRouteInfo = (flightRoute) => {
    if (flightRoute.true !== undefined && flightRoute.false !== undefined) {
      return (
        <tbody>
          <tr>
            <td>
              Direct: {flightRoute.true.price} -- {flightRoute.true.airline}
            </td>
          </tr>
          <tr>
            <td>
              Indirect: {flightRoute.false.price} -- {flightRoute.false.airline}
            </td>
          </tr>
        </tbody>
      );
    } else if (
      flightRoute.true !== undefined &&
      flightRoute.false === undefined
    ) {
      return (
        <tbody>
          <tr>
            <td>
              Direct: {flightRoute.true.price} -- {flightRoute.true.airline}
            </td>
          </tr>
        </tbody>
      );
    } else if (
      flightRoute.true === undefined &&
      flightRoute.false !== undefined
    ) {
      return (
        <tbody>
          <tr>
            <td>
              Indirect: {flightRoute.false.price} -- {flightRoute.false.airline}
            </td>
          </tr>
        </tbody>
      );
    } else if (flightRoute === "DRIVE") {
      return (
        <tbody>
          <tr>
            <td>You live within driving distance, Please drive!</td>
          </tr>
        </tbody>
      );
    } else {
      return (
        <tbody>
          <tr>
            <td>No Flight Found, Please change your input and search again.</td>
          </tr>
        </tbody>
      );
    }
  };

  return (
    <div>
      {props.isLoading && (
        <Spinner animation="border" variant="primary" className="spinner" />
      )}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Resort</th>
            <th>Fresh Snow during Trip Duration (mm)</th>
            <th>Flight ($)</th>
          </tr>
        </thead>

        {slicedData.map((dataItem, index) => {
          return <tbody key={index}>{renderTable(dataItem)}</tbody>;
        })}
      </Table>
    </div>
  );
};

export default CollapsibleSumTable;
