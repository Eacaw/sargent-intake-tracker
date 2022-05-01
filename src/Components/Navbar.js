import { getAuth, signOut } from "firebase/auth";
import {
  MDBBtn,
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
} from "mdb-react-ui-kit";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

function Navbar() {
  const auth = getAuth();
  const [user] = useAuthState(auth);
  function logout() {
    signOut(auth);
    window.location.href = "/login";
  }

  return (
    <MDBNavbar sticky light bgColor="light">
      <MDBContainer fluid>
        <MDBNavbarBrand href="#">Sargent Intake Tracker</MDBNavbarBrand>
        {user ? <MDBBtn onClick={logout}>Log out</MDBBtn> : null}
      </MDBContainer>
    </MDBNavbar>
  );
}

export default Navbar;
