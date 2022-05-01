// import { Button, Card, CardContent, CardMedia } from "@mui/material";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBCardTitle,
  MDBCol,
  MDBInput,
  MDBRow,
} from "mdb-react-ui-kit";

function LoginCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();

  const signInWithGoogle = (event) => {
    event.preventDefault();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const signInWithEmail = (event) => {
    event.preventDefault();

    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      const user = userCredential.user;
    });
  };

  return (
    <MDBCard style={{ maxWidth: "22rem" }}>
      <MDBCardImage
        src="https://thumbs.dreamstime.com/b/low-poly-spring-summer-landscape-d-geometric-mountain-forest-illustration-pink-trees-dawn-sunrise-view-65717403.jpg"
        fluid
        alt="..."
        referrerPolicy="no-referrer"
        className="top-border-rounded"
      />

      <MDBCardBody>
        <MDBCardTitle>Login</MDBCardTitle>
        <MDBCardText>Please sign in with one of these options:</MDBCardText>

        <MDBInput
          label="Email"
          id="email"
          onInput={(e) => {
            setEmail(e.target.value);
          }}
          type="email"
          className="margin-xsml"
        />
        <MDBInput
          label="Password"
          id="password"
          onInput={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          className="margin-xsml"
        />
        <MDBBtn
          rounded
          size="sm"
          color="primary"
          href="/register"
          className="margin-xsml"
        >
          Register
        </MDBBtn>
        <MDBBtn
          rounded
          size="sm"
          color="primary"
          onClick={signInWithEmail}
          className="margin-xsml"
        >
          Login
        </MDBBtn>
        <MDBBtn
          rounded
          size="sm"
          color="primary"
          onClick={signInWithGoogle}
          className="margin-xsml"
        >
          <FaGoogle />
        </MDBBtn>
      </MDBCardBody>
    </MDBCard>
  );
}

export default LoginCard;
