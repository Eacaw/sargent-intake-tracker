import { MDBBtn, MDBCol, MDBRow, MDBTypography } from "mdb-react-ui-kit";
import React from "react";
import {
  collection,
  addDoc,
  getFirestore,
  serverTimestamp,
} from "firebase/firestore";
import { getAnalytics, logEvent } from "firebase/analytics";

function AddTodayNote(props) {
  const db = getFirestore();
  const analytics = getAnalytics();

  async function onAddTodayNote(e) {
    e.preventDefault();
    logEvent(analytics, "Day_Card_Added", { user: props.userId });
    let todayWithTime = new Date();
    let today = new Date(
      todayWithTime.getFullYear(),
      todayWithTime.getMonth(),
      todayWithTime.getDate()
    );

    const docRef = await addDoc(collection(db, "day-card-data"), {
      date: today,
      foodItems: [],
      limits: "comingSoon",
      userId: props.userId,
    });
  }

  return (
    <MDBRow>
      <MDBCol>
        <MDBTypography note className="add-today-note" noteColor="info">
          Looks like you haven't added a card for today, add one now!
          <MDBBtn
            className="add-today-note-btn"
            color="secondary"
            onClick={onAddTodayNote}
          >
            Add Today's Card
          </MDBBtn>
        </MDBTypography>
      </MDBCol>
    </MDBRow>
  );
}

export default AddTodayNote;
