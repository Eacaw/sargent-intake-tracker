import {
  collection,
  getFirestore,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { MDBCol, MDBRow, MDBSpinner } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import AddTodayNote from "./Components/AddTodayNote";
import DayCard from "./Components/DayCard";

function Feed(props) {
  const [showSpinner, setShowSpinner] = useState(true);
  const db = getFirestore();

  const cardDataRef = collection(db, "day-card-data");
  const limitsRef = collection(db, "maximum-intake-by-day");
  const foodItemsRef = collection(db, "food-items");

  let q = query(
    cardDataRef,
    orderBy("date", "desc"),
    where("userId", "==", props.userId)
  );
  let q2 = query(limitsRef, orderBy("index", "asc"));
  let q3 = query(foodItemsRef, orderBy("name", "asc"));

  const [cards] = useCollectionData(q);
  const [limits] = useCollectionData(q2);
  const [foodItems] = useCollectionData(q3);

  const [topDate, setTopDate] = useState(false);
  let todayWithTime = new Date();
  let today = new Date(
    todayWithTime.getFullYear(),
    todayWithTime.getMonth(),
    todayWithTime.getDate()
  );

  // Handle showing a spinner when still loading data
  useEffect(() => {
    if (cards && foodItems && limits) {
      if (cards[0] && cards[0].date.seconds === today.getTime() / 1000) {
        setTopDate(true);
      }
      setShowSpinner(false);
    }
  }, [cards, foodItems, limits]);

  return showSpinner ? (
    <div className="center-align-cards">
      <MDBSpinner className="mx-2 margin-lrg" color="secondary"></MDBSpinner>
    </div>
  ) : (
    <div className="center-align-cards">
      <MDBRow>
        {topDate ? null : (
          <MDBCol size="12">
            <AddTodayNote userId={props.userId} />
          </MDBCol>
        )}
        {cards &&
          cards.map((card, idx) => {
            return (
              <MDBCol key={idx} size="12">
                <DayCard
                  key={card.date.seconds}
                  userId={props.userId}
                  card={card}
                  limits={limits}
                  foodItems={foodItems}
                />
              </MDBCol>
            );
          })}
      </MDBRow>
    </div>
  );
}

export default Feed;

// /user-data/jqSgLtPb50YRzDtkh4iCvhm3j2x1

// /food-items/Tm6RrlsDnbv8JAzpf5nS
// /food-items/NXYhREAYJ7BDTsrF5nzH
// /food-items/gXebrlCSMI3kPQVZqSal
