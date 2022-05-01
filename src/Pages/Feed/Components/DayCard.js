import {
  MDBCard,
  MDBCardFooter,
  MDBCardHeader,
  MDBCardTitle,
} from "mdb-react-ui-kit";
import React, { useState } from "react";
import DonutGraphRow from "./DonutGraphRow";
import FoodItemBar from "./FoodItemBar";

function DayCard(props) {
  const date = new Date(props.card.date.seconds * 1000);

  function getDateString() {
    return date.toLocaleString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  const foodItemHeaderBar = {
    icon: "🔑",
    foodItemId: "4KaklctSZPKEgV7cXANc",
    colour: "primary",
  };

  return (
    <div className="margin-med" style={{ width: "90%" }}>
      <MDBCard
        border="primary
      "
      >
        <MDBCardHeader>
          <MDBCardTitle className="margin-sml">{getDateString()} </MDBCardTitle>
        </MDBCardHeader>
        <DonutGraphRow
          foodItems={props.card.foodItems}
          limits={props.limits.filter((limit) => limit.index === date.getDay())}
        />
        <MDBCardFooter>
          <FoodItemBar key={"headerBar"} foodItem={foodItemHeaderBar} />
          {props.card.foodItems &&
            props.card.foodItems.map((foodItem, idx) => {
              return <FoodItemBar key={idx} foodItem={foodItem} />;
            })}
        </MDBCardFooter>
      </MDBCard>
    </div>
  );
}

export default DayCard;
