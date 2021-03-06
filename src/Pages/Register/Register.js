import { getAuth } from "firebase/auth";
import {
  doc,
  getDoc,
  getFirestore,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import RegisterCard from "./Components/RegisterCard";

function Register() {
  const [user] = useAuthState(getAuth());
  const [refreshedUser, setRefreshedUser] = useState(null);
  const usersCollection = "user-data";

  const db = getFirestore();

  async function setUserDoc(user) {
    let userDoc;
    try {
      userDoc = await getDoc(doc(db, usersCollection, user.uid));
    } catch (error) {
      // No user doc found, create one
    }
    await setDoc(doc(db, usersCollection, refreshedUser.uid), {
      email: refreshedUser.email,
      previouslogin: userDoc.data()
        ? userDoc.data().lastLogin
        : serverTimestamp(),
      lastLogin: serverTimestamp(),
      isAdmin: userDoc.data() ? userDoc.data().isAdmin : false,
    });
    moveToFeed();
  }

  function moveToFeed() {
    window.location.href = "/feed";
  }

  useEffect(() => {
    if (user) {
      user.reload().then(() => {
        setRefreshedUser(getAuth().currentUser);
      });
    }
  }, [user]);

  useEffect(() => {
    if (refreshedUser) {
      // Store a user doc in the db if it doesn't exist
      setUserDoc(refreshedUser);
    }
  }, [refreshedUser]);
  return (
    <div className="center-align-cards top-padding-navbar border-rounded">
      <RegisterCard />
    </div>
  );
}

export default Register;
