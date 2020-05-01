import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../redux/actions/authActions";
import { useHistory } from "react-router-dom";

const NavBar = () => {
  const logged = useSelector((state) => state.loggedIn);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    localStorage.clear();
    dispatch(setLogout());
    history.push("/login");
  };
  return (
    <div className="navBar">
      <h1>Sleep Tracker</h1>
      <div>About</div>
      <div>Settings</div>
      <div onClick={handleLogout}>{logged ? "Log Out" : "Login"}</div>
    </div>
  );
};

export default NavBar;
