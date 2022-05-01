import logo from "./logo.svg";
import "./App.css";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
import { useState } from "react";

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
  const [count, setCount] = useState(0);

  function logButtonClick() {
    setCount(count + 1);
    logEvent(analytics, "buttonClicked", {
      name: "button_clicked",
      value: count,
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Sargent Intake tracker coming soon!</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={logButtonClick}>Clicked {count} times</button>
      </header>
    </div>
  );
}

export default App;
