import { getAuth, signOut } from "firebase/auth";
import { MDBBtn } from "mdb-react-ui-kit";
import React from "react";

function Feed() {
  const auth = getAuth();
  function logout() {
    signOut(auth);
    window.location.href = "/login";
  }

  return <MDBBtn onClick={logout}>Signout</MDBBtn>;
}

export default Feed;
