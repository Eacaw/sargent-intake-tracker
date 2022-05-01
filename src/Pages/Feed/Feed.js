import { getAuth } from "firebase/auth";
import {
  collection,
  getFirestore,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { MDBCol, MDBRow, MDBSpinner } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import DayCard from "./Components/DayCard";

function Feed() {
  const [showSpinner, setShowSpinner] = useState(true);
  const [user] = useAuthState(getAuth());
  const [userId, setUserId] = useState(null);
  const db = getFirestore();

  const cardDataRef = collection(db, "day-card-data");
  const limitsRef = collection(db, "maximum-intake-by-day");

  let q = query(cardDataRef, orderBy("date", "desc"));
  let q2 = query(limitsRef, orderBy("index", "asc"));

  const [cards] = useCollectionData(q);
  const [limits] = useCollectionData(q2);

  useEffect(() => {
    if (cards) {
      setShowSpinner(false);
    }
  }, [cards]);

  return showSpinner ? (
    <div className="center-align-cards">
      <MDBSpinner className="mx-2 margin-lrg" color="secondary"></MDBSpinner>
    </div>
  ) : (
    <div className="center-align-cards">
      <MDBRow>
        {cards &&
          cards.map((card, idx) => {
            return (
              <MDBCol key={idx} size="12">
                <DayCard key={idx} card={card} limits={limits} />
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
