import {
  MDBCard,
  MDBCol,
  MDBRow,
  MDBTable,
  MDBTableBody,
} from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { fetchFoodItemData } from "./utilities/calculations";

function FoodItemBar(props) {
  const [foodItemData, setFoodItemData] = useState({});

  useEffect(() => {
    fetchFoodItemData(props.foodItem.foodItemId).then((foodItemData) => {
      setFoodItemData(foodItemData);
    });
  }, []);

  function getRandomBackgroundColor() {
    const colors = ["secondary", "success", "warning", "info"];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  return (
    <MDBCard
      background={
        props.foodItem.colour
          ? props.foodItem.colour
          : getRandomBackgroundColor()
      }
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
          margin: "0.1rem",
          verticalAlign: "middle",
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
  );
}

export default FoodItemBar;
