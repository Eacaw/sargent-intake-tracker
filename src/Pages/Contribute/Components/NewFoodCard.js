import { addDoc, collection, getFirestore } from "firebase/firestore";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBCardHeader,
  MDBCardTitle,
  MDBInput,
  MDBSpinner,
} from "mdb-react-ui-kit";
import React, { useEffect, useRef, useState } from "react";
import nutritionix_small from "./nutritionix_small.png";
import { getAnalytics, logEvent } from "firebase/analytics";

function NewFoodCard(props) {
  const analytics = getAnalytics();

  const nameRef = useRef();
  const proteinInput = useRef();
  const carbsInput = useRef();
  const fatInput = useRef();
  const caloriesInput = useRef();
  const [isNotUnique, setIsNotUnique] = useState(false);
  const [name, setName] = useState("");

  const db = getFirestore();
  const foodItemsRef = collection(db, "food-items");

  useEffect(() => {
    if (foodNameExists(name)) {
      setIsNotUnique(true);
    } else {
      setIsNotUnique(false);
    }
  }, [name]);

  function foodNameExists(name) {
    if (props.foodItems) {
      return props.foodItems.find((foodItem) => {
        return foodItem.name === name;
      });
    }
  }

  async function addNewFoodItemDoc() {
    const newFoodItem = {
      name,
      protein: parseFloat(proteinInput.current.value),
      carbs: parseFloat(carbsInput.current.value),
      fat: parseFloat(fatInput.current.value),
      calories: parseFloat(caloriesInput.current.value),
    };
    await addDoc(foodItemsRef, newFoodItem);
    logEvent(analytics, "New_Food_Added", {
      user: props.userId,
      foodItem: newFoodItem,
    });
    proteinInput.current.value = null;
    carbsInput.current.value = null;
    fatInput.current.value = null;
    caloriesInput.current.value = null;
    nameRef.current.value = null;
    setName("");
  }

  return props.showSpinner ? (
    <div className="center-align-cards">
      <MDBSpinner className="mx-2 margin-lrg" color="secondary"></MDBSpinner>
    </div>
  ) : (
    <div className="margin-med" style={{ width: "90%" }}>
      <MDBCard border="1px solid #e0e0e0">
        <MDBCardHeader>
          <MDBCardTitle className="margin-sml">
            Add a new food item:{" "}
          </MDBCardTitle>
          <MDBCardBody>
            <MDBInput
              label="Name"
              className="new-food-input-form-components"
              onChange={(event) => setName(event.target.value)}
              inputRef={nameRef}
            />
            <MDBInput
              label="Protein"
              type="number"
              className="new-food-input-form-components"
              inputRef={proteinInput}
            />
            <MDBInput
              label="Carbs"
              type="number"
              className="new-food-input-form-components"
              inputRef={carbsInput}
            />
            <MDBInput
              label="Fat"
              type="number"
              className="new-food-input-form-components"
              inputRef={fatInput}
            />
            <MDBInput
              label="Calories"
              type="number"
              className="new-food-input-form-components"
              inputRef={caloriesInput}
            />
            <MDBBtn
              label="Submit"
              className="new-food-input-form-components"
              disabled={isNotUnique}
              onClick={() => addNewFoodItemDoc()}
            >
              {isNotUnique ? "Please use a unique name" : "Submit"}
            </MDBBtn>
          </MDBCardBody>
          <MDBCardFooter style={{ textAlign: "center" }}>
            Helpful resources:
            <a href="https://www.nutritionix.com/" target="_blank">
              <img src={nutritionix_small} alt="nutritionix logo" width="90%" />
            </a>
          </MDBCardFooter>
        </MDBCardHeader>
      </MDBCard>
    </div>
  );
}

export default NewFoodCard;
