import { MDBCard, MDBCol, MDBRow, MDBTooltip } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { BiTrash } from "react-icons/bi";
import Spinner from "../../../Components/Spinner";
import { fetchFoodItemData } from "./utilities/data";

function FoodItemBar(props) {
  const [foodItemData, setFoodItemData] = useState({});
  const [backgroundColor, setBackgroundColor] = useState("light");
  const [foodIcon, setFoodIcon] = useState("⚪");
  const [showSpinner, setShowSpinner] = useState(true);

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
    setShowSpinner(false);
  }, []);

  function onDeleteFoodItem() {
    props.deleteFoodItemFromCard(props.index);
  }

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
          {showSpinner ? (
            <Spinner />
          ) : (
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
          )}
        </MDBCard>
      </MDBCol>
      <MDBCol size="1" className="g-0">
        {disableTrashCan ? null : (
          <BiTrash style={{ marginLeft: "5px" }} onClick={onDeleteFoodItem} />
        )}
      </MDBCol>
    </MDBRow>
  );
}

export default FoodItemBar;
