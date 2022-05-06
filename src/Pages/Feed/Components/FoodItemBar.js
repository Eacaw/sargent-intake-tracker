import {
  MDBCard,
  MDBCol,
  MDBRow,
  MDBTable,
  MDBTableBody,
} from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { fetchFoodItemData } from "./utilities/data";
import { BiTrash } from "react-icons/bi";

function FoodItemBar(props) {
  const [foodItemData, setFoodItemData] = useState({});

  useEffect(() => {
    fetchFoodItemData(props.foodItem.foodItemId).then((foodItemData) => {
      setFoodItemData(foodItemData);
    });
  }, []);

  const isHeaderBar = foodItemData.name === "Name";

  return (
    <MDBRow>
      <MDBCol size="11" className="g-0">
        <MDBCard
          background={props.foodItem.colour}
          className="text-white mb-3"
          style={{
            width: "100%",
            height: "30px",
            margin: "0 auto",
            verticalAlign: "middle",
          }}
        >
          <MDBRow
            style={{
              textAlign: "left",
              margin: "2px",
              verticalAlign: "middle",
              fontSize: "13px",
            }}
          >
            <MDBCol size="6">
              <MDBRow>
                <MDBCol size="2">{props.foodItem.icon}</MDBCol>
                <MDBCol size="10">{foodItemData.name}</MDBCol>
              </MDBRow>
            </MDBCol>
            <MDBCol size="6">
              <MDBRow>
                <MDBCol size="3" className="g-0">
                  {foodItemData.protein}
                </MDBCol>
                <MDBCol size="3" className="g-0">
                  {foodItemData.carbs}
                </MDBCol>
                <MDBCol size="3" className="g-0">
                  {foodItemData.fat}
                </MDBCol>
                <MDBCol size="3" className="g-0">
                  {foodItemData.calories}
                </MDBCol>
              </MDBRow>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBCol>
      <MDBCol size="1" className="g-0">
        {isHeaderBar ? null : <BiTrash style={{ marginLeft: "5px" }} />}
      </MDBCol>
    </MDBRow>
  );
}

export default FoodItemBar;
