import {
  collection,
  getDocs,
  getFirestore,
  query,
  setDoc,
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
  MDBModalFooter,
  MDBModalHeader,
  MDBModalTitle,
  MDBRow,
} from "mdb-react-ui-kit";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import ConsumedItemInput from "./ConsumedItemInput";
import DonutGraphRow from "./DonutGraphRow";
import FoodItemBar from "./FoodItemBar";
import { iconMap } from "./utilities/icons";

function DayCard(props) {
  const date = new Date(props.card.date.seconds * 1000);
  const [basicModal, setBasicModal] = useState(false);

  const toggleShow = () => setBasicModal(!basicModal);

  const cardCollection = "day-card-data";

  const db = getFirestore();
  const cardDataRef = collection(db, cardCollection);
  let q = query(
    cardDataRef,
    where("userId", "==", props.userId),
    where("date", "==", props.card.date)
  );

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

                <MDBModalFooter></MDBModalFooter>
              </MDBModalContent>
            </MDBModalDialog>
          </MDBModal>
        </MDBCardFooter>
      </MDBCard>
    </div>
  );
}

export default DayCard;
