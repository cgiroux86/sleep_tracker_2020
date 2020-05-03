import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../redux/actions/authActions";
import { useHistory, Link } from "react-router-dom";
import SleepRec from "./SleepRec";
import { StyledLink } from "../styles/authStyles";

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
      <StyledLink to="/analyzer" className="link">
        <SleepRec logged={logged} className="link" />
      </StyledLink>
      <StyledLink className="login">Settings</StyledLink>
      <StyledLink to="/login" className="login" onClick={handleLogout}>
        {logged ? "Log Out" : "Login"}
      </StyledLink>
    </div>
  );
};

export default NavBar;
