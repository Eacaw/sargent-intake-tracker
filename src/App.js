import "./App.css";

// Pages Import
import { Login, Feed, Home, Register, Contribute } from "./Pages/Pages";

// Common Components Imports
import Navbar from "./Components/Navbar";

// Firebase Imports
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyAS14w3U9TEs6F61tDfOaGeKHxbifyNSQw",
  authDomain: "sargent-intake-tracker.firebaseapp.com",
  projectId: "sargent-intake-tracker",
  storageBucket: "sargent-intake-tracker.appspot.com",
  messagingSenderId: "394703202327",
  appId: "1:394703202327:web:ada7b482404149c532d452",
  measurementId: "G-CL7Y8LKV05",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App() {
  const [user] = useAuthState(getAuth());
  const [refreshedUser, setRefreshedUser] = useState(null);
  const [userId, setUserId] = useState("");

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
      setUserId(refreshedUser.uid);
    }
  }, [refreshedUser]);

  return (
    <div>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/feed" element={<Feed userId={userId} />} />
          <Route path="/add-new-food" element={<Contribute />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
