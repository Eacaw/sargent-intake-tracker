import { getAuth, signOut } from "firebase/auth";
import {
  MDBBtn,
  MDBContainer,
  MDBDropdown,
  MDBDropdownItem,
  MDBDropdownLink,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBNavbar,
  MDBNavbarBrand,
} from "mdb-react-ui-kit";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AiOutlineMenu } from "react-icons/ai";

function Navbar() {
  const auth = getAuth();
  const [user] = useAuthState(auth);
  function logout() {
    signOut(auth);
    window.location.href = "/login";
  }

  return (
    <MDBNavbar fixed expand="lg" light bgColor="light">
      <MDBContainer fluid>
        <MDBNavbarBrand href="#">Sargent Intake Tracker</MDBNavbarBrand>
        {user ? (
          <MDBDropdown
            group
            className="shadow-0"
            style={{ textAlign: "center" }}
          >
            <MDBDropdownToggle
              color="light"
              style={{ border: "1px solid #e0e0e0", borderRadius: "20px" }}
            ></MDBDropdownToggle>
            <MDBDropdownMenu style={{ textAlign: "right" }}>
              <MDBDropdownItem>
                <MDBDropdownLink href="/feed">Feed</MDBDropdownLink>
              </MDBDropdownItem>
              <MDBDropdownItem>
                <MDBDropdownLink href="/add-new-food">Add food</MDBDropdownLink>
              </MDBDropdownItem>
              <MDBDropdownItem>
                <MDBDropdownLink onClick={logout}>Log out</MDBDropdownLink>
              </MDBDropdownItem>
            </MDBDropdownMenu>
          </MDBDropdown>
        ) : null}
      </MDBContainer>
    </MDBNavbar>
  );
}

export default Navbar;
