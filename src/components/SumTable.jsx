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
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <td>3</td>
            <td colSpan="2">Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default SumTable;
