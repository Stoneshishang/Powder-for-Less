import React from "react";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";

const SumTable = (props) => {
  // if (props.onSumFlightInfo !== undefined) {
  //   console.log(
  //     "   SumTable props.SumWeatherInfo is: ",
  //     props.onSumWeatherInfo,
  //   );
  //   const flightInfoObj = JSON.parse(props.onSumFlightInfo);
  //   console.log("   SumTable props.SumFlightInfo is: ", flightInfoObj);
  // }

  const renderTable = (weather, flight, index) => {
    return (
      <tr key={index}>
        <td></td>
      </tr>
    );
  };

  return (
    <div>
      <pre>props.sumWeatherInfo is: {props.onSumWeatherInfo}</pre>

      <pre>props.sumFlightInfo is: {props.onSumFlightInfo}</pre>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Resort</th>
            <th>Snow Forecast (mm)</th>
            <th>Flight ($)</th>
          </tr>
        </thead>
        <tbody></tbody>
      </Table>
    </div>
  );
};

export default SumTable;
