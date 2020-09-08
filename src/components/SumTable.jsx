import React, { useContext } from "react";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import _ from "lodash";
import { Context } from "../ContextState";

const SumTable = () => {
  // if (props.onSumFlightInfo !== undefined) {
  //   console.log(
  //     "   SumTable props.SumWeatherInfo is: ",
  //     props.onSumWeatherInfo,
  //   );
  //   const flightInfoObj = JSON.parse(props.onSumFlightInfo);
  //   console.log("   SumTable props.SumFlightInfo is: ", flightInfoObj);
  // }
  const { sumTableData } = useContext(Context);

  console.log("sumTableData from context is: ", sumTableData);

  const slicedData = sumTableData.slice(2, sumTableData.length);

  console.log("slicedData is: ", slicedData);

  const renderTable = (data) => {
    return (
      <tr>
        {/* {console.log("key in SumTable is: ", index)} */}
        <td>{data.resort}</td>
        <td>{data.weather}</td>
        <td>
          <table>{renderFlightRouteInfo(data.flight)}</table>
        </td>
      </tr>
    );
  };

  // const noResult = "No Flight Found, Please search again.";

  const renderFlightRouteInfo = (flightRoute) => {
    if (_.has(flightRoute, "true" && "false") === true) {
      return (
        <tbody>
          <tr>
            <td>Direct: {flightRoute.true}</td>
          </tr>
          <tr>
            <td>Indirect: {flightRoute.false}</td>
          </tr>
        </tbody>
      );
    } else if (_.has(flightRoute, "true")) {
      return (
        <tbody>
          <tr>
            <td>Direct: {flightRoute.true}</td>
          </tr>
        </tbody>
      );
    } else if (_.has(flightRoute, "false")) {
      return (
        <tbody>
          <tr>
            <td>Indirect: {flightRoute.false}</td>{" "}
          </tr>
        </tbody>
      );
    } else {
      return (
        <tbody>
          <tr>
            <td>No Flight Found, Please search again.</td>
          </tr>
        </tbody>
      );
    }
  };

  return (
    <div>
      {/* <pre>props.sumWeatherInfo is: {props.onSumWeatherInfo}</pre> */}

      {/* <pre>props.sumFlightInfo is: {props.onSumFlightInfo}</pre> */}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Resort</th>
            <th>Snow Forecast (mm)</th>
            <th>Flight ($)</th>
          </tr>
        </thead>
        {/* <tbody>{renderTable(sumTableData)}</tbody> */}
        {slicedData.map((dataItem, index) => {
          return <tbody key={index}>{renderTable(dataItem)}</tbody>;
        })}
      </Table>
    </div>
  );
};

export default SumTable;
