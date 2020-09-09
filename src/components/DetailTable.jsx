import React, { useContext } from "react";
import { Context } from "../ContextState";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";

const TripInfoDetail = () => {
  const { detailTableData } = useContext(Context);

  console.log("DetailTable.jsx detailTableData is: ", detailTableData);

  return (
    <Table striped bordered hover>
      <thead></thead>
    </Table>
  );
};

export default TripInfoDetail;
