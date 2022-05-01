import "./App.css";

// Pages Import
import { Login, Feed, Home, Register } from "./Pages/Pages";

// Common Components Imports
import Navbar from "./Components/Navbar";

// Firebase Imports
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { BrowserRouter, Route, Routes } from "react-router-dom";

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
  return (
    <div>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/feed" element={<Feed />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
