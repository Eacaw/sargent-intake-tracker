import {
  collection,
  getDocs,
  getFirestore,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  MDBBtn,
  MDBCard,
  MDBCardFooter,
  MDBCardHeader,
  MDBCardTitle,
  MDBCol,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBModalHeader,
  MDBModalTitle,
  MDBRow,
  MDBSpinner,
} from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { FaPlus } from "react-icons/fa";
import ConsumedItemInput from "./ConsumedItemInput";
import DonutGraphRow from "./DonutGraphRow";
import FoodItemBar from "./FoodItemBar";
import { fetchFoodItemData } from "./utilities/data";
import { iconMap } from "./utilities/icons";
import Spinner from "../../../Components/Spinner";
import { getAnalytics, logEvent } from "firebase/analytics";

function DayCard(props) {
  const analytics = getAnalytics();

  // Spinners
  const [showSpinner, setShowSpinner] = useState(true);
  const [showFoodSpinner, setShowFoodSpinner] = useState(false);
  const [showConsumedSpinner, setShowConsumedSpinner] = useState(false);
  // Modal
  const [basicModal, setBasicModal] = useState(false);
  const toggleShow = () => setBasicModal(!basicModal);
  // Data
  const [caloriesConsumed, setCaloriesConsumed] = useState(0);
  const [carbsConsumed, setCarbsConsumed] = useState(0);
  const [fatConsumed, setFatConsumed] = useState(0);
  const [proteinConsumed, setProteinConsumed] = useState(0);
  const [foodDataArr, setFoodDataArr] = useState([]);

  const date = new Date(props.card.date.seconds * 1000);

  async function setConsumedValues() {
    let foodItemsData = [];

    props.card.foodItems.forEach((foodItem) => {
      fetchFoodItemData(foodItem.foodItemId).then((foodData) => {
        foodItemsData.push(foodData);
        if (foodItemsData.length == props.card.foodItems.length) {
          setFoodDataArr(foodItemsData);
        }
      });
    });
  }

  useEffect(() => {
    if (props.card && showSpinner) {
      if (props.card.foodItems.length > 0) {
        setConsumedValues();
      }
      setShowSpinner(false);
    }
  }, [props.card, props.foodItems]);

  useEffect(() => {
    let calories = 0;
    let carbs = 0;
    let fat = 0;
    let protein = 0;

    foodDataArr.forEach((foodItem) => {
      calories += foodItem.calories;
      carbs += foodItem.carbs;
      fat += foodItem.fat;
      protein += foodItem.protein;
    });

    setCaloriesConsumed(calories);
    setCarbsConsumed(carbs);
    setFatConsumed(fat);
    setProteinConsumed(protein);
  }, [foodDataArr]);

  const cardCollection = "day-card-data";

  const db = getFirestore();
  const cardDataRef = collection(db, cardCollection);
  let q = query(
    cardDataRef,
    where("userId", "==", props.userId),
    where("date", "==", props.card.date)
  );

  const [cardData] = useCollectionData(q);

  useEffect(() => {
    setShowConsumedSpinner(true);
    if (cardData) {
      setConsumedValues();
      let calories = 0;
      let carbs = 0;
      let fat = 0;
      let protein = 0;

      foodDataArr.forEach((foodItem) => {
        calories += foodItem.calories;
        carbs += foodItem.carbs;
        fat += foodItem.fat;
        protein += foodItem.protein;
      });

      setCaloriesConsumed(calories);
      setCarbsConsumed(carbs);
      setFatConsumed(fat);
      setProteinConsumed(protein);
    }
    setShowConsumedSpinner(false);
  }, [cardData]);

  async function updateCardDoc(newConsumedItem) {
    let currentCardSnapshot;
    try {
      currentCardSnapshot = await getDocs(q);
      currentCardSnapshot.forEach(async (doc) => {
        await setDoc(doc.ref, {
          ...doc.data(),
          foodItems: [...doc.data().foodItems, newConsumedItem],
        });
      });
      logEvent(analytics, "Food_Item_Added", { user: props.userId });
    } catch (error) {
      console.log(error);
    }
  }

  function getDateString() {
    return date.toLocaleString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  const foodItemHeaderBar = {
    icon: iconMap.key,
    foodItemId: "4KaklctSZPKEgV7cXANc", // Dummy ID to represent the header row
    colour: "primary",
  };

  async function updateCardDocRemoved(newCard) {
    try {
      const currentCardSnapshot = await getDocs(q);
      if (currentCardSnapshot) {
        currentCardSnapshot.forEach(async (doc) => {
          await updateDoc(doc.ref, newCard).then(() => {
            setShowFoodSpinner(false);
            setShowConsumedSpinner(false);
          });
        });
      }
      logEvent(analytics, "Food_Item_Removed", { user: props.userId });
    } catch (error) {
      console.log(error.message);
    }
  }

  function deleteFoodItemFromCard(key) {
    setShowConsumedSpinner(true);
    setShowFoodSpinner(true);
    const removedItem = props.card.foodItems.splice(key, 1);

    const newFoodItems = [];

    props.card.foodItems.forEach((foodItem) => {
      if (foodItem !== removedItem[0]) {
        newFoodItems.push(foodItem);
      }
    });

    let newCard = { ...props.card, foodItems: newFoodItems };
    updateCardDocRemoved(newCard);
  }

  return (
    <div className="margin-med" style={{ width: "90%" }}>
      <MDBCard border="1px solid #e0e0e0">
        {showSpinner ? (
          <Spinner />
        ) : (
          <div>
            <MDBCardHeader>
              <MDBCardTitle className="margin-sml">
                {getDateString()}{" "}
              </MDBCardTitle>
            </MDBCardHeader>
            {showConsumedSpinner ? (
              <Spinner />
            ) : (
              <DonutGraphRow
                consumptionData={{
                  calories: caloriesConsumed,
                  carbs: carbsConsumed,
                  fat: fatConsumed,
                  protein: proteinConsumed,
                }}
                cardFoodItems={props.card.foodItems}
                limits={props.limits.filter(
                  (limit) => limit.index === date.getDay()
                )}
              />
            )}
            <MDBCardFooter>
              <FoodItemBar key={"headerBar"} foodItem={foodItemHeaderBar} />
              {showFoodSpinner ? (
                <Spinner />
              ) : (
                props.card.foodItems.map((foodItem, key) => {
                  return (
                    <FoodItemBar
                      key={key}
                      index={key}
                      foodItem={foodItem}
                      deleteFoodItemFromCard={deleteFoodItemFromCard}
                    />
                  );
                })
              )}
              {/* Add new item bar */}
              <MDBRow>
                <MDBCol size="10">
                  {/* Empty column to force button right */}
                </MDBCol>
                <MDBCol size="2">
                  <MDBBtn color="success" onClick={toggleShow} floating>
                    <FaPlus />
                  </MDBBtn>
                </MDBCol>
              </MDBRow>
              <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
                <MDBModalDialog>
                  <MDBModalContent>
                    <MDBModalHeader>
                      <MDBModalTitle>Add new consumed item</MDBModalTitle>
                      <MDBBtn
                        className="btn-close"
                        color="none"
                        onClick={toggleShow}
                      ></MDBBtn>
                    </MDBModalHeader>
                    <MDBModalBody>
                      <ConsumedItemInput
                        foodItems={props.foodItems}
                        updateCardDoc={updateCardDoc}
                        toggleShow={toggleShow}
                      />{" "}
                      {/* consumedItemInput */}
                    </MDBModalBody>
                  </MDBModalContent>
                </MDBModalDialog>
              </MDBModal>
            </MDBCardFooter>
          </div>
        )}
      </MDBCard>
    </div>
  );
}

export default DayCard;
