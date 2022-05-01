import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBCardTitle,
  MDBInput,
} from "mdb-react-ui-kit";
import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

function RegisterCard() {
  const [user] = useAuthState(getAuth());

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function createNewUser() {
    console.log("Registers");
    createUserWithEmailAndPassword(getAuth(), email, password)
      .then((userCredential) => {
        console.log("gotCredentials");
        user = userCredential.user;
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          alert("Email already in use");
        }
      });
  }

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
        <MDBCardTitle>Register</MDBCardTitle>
        <MDBCardText>Please fill out your details:</MDBCardText>
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
          onClick={createNewUser}
          className="margin-xsml"
        >
          Register
        </MDBBtn>
        <MDBBtn
          rounded
          size="sm"
          color="primary"
          href="/login"
          className="margin-xsml"
        >
          Login
        </MDBBtn>
      </MDBCardBody>
    </MDBCard>
  );
}

export default RegisterCard;
