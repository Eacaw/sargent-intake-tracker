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
  const [backgroundColor, setBackgroundColor] = useState("light");
  const [foodIcon, setFoodIcon] = useState("⚪");

  useEffect(() => {
    if (!props.foodItemData) {
      fetchFoodItemData(props.foodItem.foodItemId).then((foodItemData) => {
        setFoodItemData(foodItemData);
        setBackgroundColor(props.foodItem.colour);
        setFoodIcon(props.foodItem.icon);
      });
    } else {
      setFoodItemData(props.foodItemData);
      setBackgroundColor(props.foodItemData.colour);
    }
  }, []);

  const isHeaderBar = foodItemData.name === "Name";
  const disableTrashCan = props.disableTrashCan || isHeaderBar;

  return (
    <MDBRow>
      <MDBCol size={props.disableTrashCan ? 12 : 11} className="g-0">
        <MDBCard
          background={backgroundColor}
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
              margin: "4px",
              verticalAlign: "middle",
              fontSize: "13px",
            }}
          >
            <MDBCol size="6">
              <MDBRow>
                <MDBCol size="2">{foodIcon}</MDBCol>
                <MDBCol
                  size="10"
                  style={{
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                  }}
                >
                  {foodItemData.name}
                </MDBCol>
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
        {disableTrashCan ? null : <BiTrash style={{ marginLeft: "5px" }} />}
      </MDBCol>
    </MDBRow>
  );
}

export default FoodItemBar;
