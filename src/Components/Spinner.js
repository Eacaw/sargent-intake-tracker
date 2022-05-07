import { MDBCol, MDBRow, MDBSpinner } from "mdb-react-ui-kit";
import React from "react";

function Spinner() {
  return (
    <MDBRow>
      <MDBCol size="5"></MDBCol>
      <MDBCol size="2">
        <MDBSpinner className="mx-2 margin-lrg" color="secondary"></MDBSpinner>
      </MDBCol>
      <MDBCol size="5"></MDBCol>
    </MDBRow>
  );
}

export default Spinner;
