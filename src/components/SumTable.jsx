import React, { useContext, useState } from "react";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import { Context } from "../ContextState";
import DetailTable from "./DetailTable";

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
  // const [tableRowClick, setTableRowClick] = useState(false);
  // console.log("sumTableData from context is: ", sumTableData);
  const { detailTableData } = useContext(Context);

  const [detailsShown, setDetailsShown] = useState([]);

  console.log("SumTable.jsx detailTableData is: ", detailTableData);

  const slicedData = sumTableData.slice(2, sumTableData.length);

  // console.log("slicedData is: ", slicedData);

  const renderDetailTable = (resortName) => {
    console.log("**********renderDetailTable is triggered!**************");

    const shownState = detailsShown.slice();

    const index = shownState.indexOf(resortName);

    if (index > 0) {
      shownState.splice(index, 1);
      setDetailsShown(shownState);
    } else {
      shownState.push(resortName);
      setDetailsShown(shownState);
    }
    // setTableRowClick(true);
    // return (
    //   <div>
    //     <DetailTable />
    //   </div>
    // );
  };

  const renderTable = (data) => {
    console.log("data in renderTable is: ", data);
    return (
      <React.Fragment key={data.resort}>
        <tr>
          {/* {console.log("key in SumTable is: ", index)} */}
          {/* {tableRowClick === true && <DetailTable />} */}
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
        {detailsShown.includes(data.resort) && (
          <tr>
            <td>{detailTableData.resort}</td>
          </tr>
        )}
      </React.Fragment>
    );
  };

  // const noResult = "No Flight Found, Please search again.";

  const renderFlightRouteInfo = (flightRoute) => {
    if (flightRoute.true !== undefined && flightRoute.false !== undefined) {
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
    } else if (
      flightRoute.true !== undefined &&
      flightRoute.false === undefined
    ) {
      return (
        <tbody>
          <tr>
            <td>Direct: {flightRoute.true}</td>
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
            <td>Indirect: {flightRoute.false}</td>
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
      {/* <pre>props.sumWeatherInfo is: {props.onSumWeatherInfo}</pre> */}

      {/* <pre>props.sumFlightInfo is: {props.onSumFlightInfo}</pre> */}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Resort</th>
            <th>Fresh Snow during Trip Duration (mm)</th>
            <th>Flight ($)</th>
          </tr>
        </thead>
        {/* <tbody>{renderTable(sumTableData)}</tbody> */}
        {slicedData.map((dataItem, index) => {
          console.log("key property is: ", index);
          return <tbody key={index}>{renderTable(dataItem)}</tbody>;
        })}
      </Table>
    </div>
  );
};

export default SumTable;
