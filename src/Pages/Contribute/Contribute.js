import React, { useState } from "react";
import NewFoodCard from "./Components/NewFoodCard";
import AllFoodList from "./Components/AllFoodList";
import { MDBCol, MDBRow, MDBSpinner } from "mdb-react-ui-kit";

function Contribute() {
  const [finishedLoading, setFinishedLoading] = useState(false);
  const [foodItems, setFoodItems] = useState([]);
  return (
    <MDBRow>
      <MDBCol size="12">
        <NewFoodCard showSpinner={!finishedLoading} foodItems={foodItems} />
      </MDBCol>
      <MDBCol size="12">
        <AllFoodList
          notifyLoaded={setFinishedLoading}
          setFoodItems={setFoodItems}
        />
      </MDBCol>
    </MDBRow>
  );
}

export default Contribute;
