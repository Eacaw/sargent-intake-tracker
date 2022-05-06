import { MDBBtn, MDBCol, MDBRow } from "mdb-react-ui-kit";
import React, { useRef, useState } from "react";
import { iconMap } from "./utilities/icons";
import Select from "react-select";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { FaPlus, FaRegCheckCircle, FaRegTimesCircle } from "react-icons/fa";

function ConsumedItemInput(props) {
  const [selectedMeal, setSelectedMeal] = useState("");
  const [selected, setSelected] = useState(null);

  const reactSelectRef = useRef(null);

  const options = [];

  props.foodItems.forEach((foodItem) => {
    if (foodItem.name !== "Name") {
      options.push({
        value: foodItem.name,
        label: foodItem.name,
      });
    }
  });

  function selectMeal(meal) {
    setSelectedMeal(meal);
  }

  function getSelectedMealColor() {
    switch (selectedMeal) {
      case "Breakfast":
        return "info";
      case "Lunch":
        return "warning";
      case "Dinner":
        return "secondary";
      case "Snack":
        return "danger";
      default:
        return "primary";
    }
  }

  function displaySelectedMealColor(meal) {
    if (meal === selectedMeal) {
      return "info";
    } else {
      return "light";
    }
  }

  async function submitNewFoodItemToCard(selectedFoodItem) {
    props.updateCardDoc({
      foodItemId: await getFoodItemId(selectedFoodItem),
      icon: iconMap[selectedMeal.toLowerCase()],
      colour: getSelectedMealColor(),
    });
    setSelected(null);
    setSelectedMeal("");
    reactSelectRef.current.setValue("");
  }

  async function getFoodItemId(foodItemName) {
    const db = getFirestore();
    let q = query(
      collection(db, "food-items"),
      where("name", "==", foodItemName)
    );

    let foodItemSnapshot;
    let foodItemId;
    let foodItemData;
    try {
      foodItemSnapshot = await getDocs(q);
      foodItemSnapshot.forEach((doc) => {
        foodItemId = doc.id;
        foodItemData = doc.data();
      });
    } catch (error) {
      // No doc found
    }

    return foodItemId;
  }

  return (
    <div>
      <MDBRow>
        <MDBCol size="2"></MDBCol>
        <MDBCol size="2">
          <MDBBtn
            floating
            color={displaySelectedMealColor("Breakfast")}
            onClick={() => {
              setSelectedMeal("Breakfast");
            }}
          >
            {iconMap.breakfast}
          </MDBBtn>
        </MDBCol>
        <MDBCol size="2">
          <MDBBtn
            floating
            color={displaySelectedMealColor("Lunch")}
            onClick={() => {
              setSelectedMeal("Lunch");
            }}
          >
            {iconMap.lunch}
          </MDBBtn>
        </MDBCol>
        <MDBCol size="2">
          <MDBBtn
            floating
            color={displaySelectedMealColor("Dinner")}
            onClick={() => {
              setSelectedMeal("Dinner");
            }}
          >
            {iconMap.dinner}
          </MDBBtn>
        </MDBCol>
        <MDBCol size="2">
          <MDBBtn
            floating
            color={displaySelectedMealColor("Snack")}
            onClick={() => {
              setSelectedMeal("Snack");
            }}
          >
            {iconMap.snack}
          </MDBBtn>
        </MDBCol>
        <MDBCol size="2"></MDBCol>
      </MDBRow>
      <MDBRow>
        <MDBCol size="12">
          <br />
        </MDBCol>
      </MDBRow>
      <MDBRow>
        <MDBCol size="12">
          <Select
            ref={reactSelectRef}
            options={options}
            onChange={(event) => {
              setSelected(event.value);
            }}
          />
        </MDBCol>
      </MDBRow>
      <MDBRow>
        <MDBCol size="12">
          <br />
        </MDBCol>
      </MDBRow>
      <MDBRow>
        <MDBCol size="8"></MDBCol>
        <MDBCol size="2">
          <MDBBtn
            floating
            color="success"
            onClick={() => {
              if (selected && selectedMeal) {
                submitNewFoodItemToCard(selected);
                props.toggleShow();
              }
            }}
          >
            <FaRegCheckCircle />
          </MDBBtn>
        </MDBCol>
        <MDBCol size="2">
          <MDBBtn floating color="danger" onClick={props.toggleShow}>
            <FaRegTimesCircle />
          </MDBBtn>
        </MDBCol>
      </MDBRow>
    </div>
  );
}

export default ConsumedItemInput;
