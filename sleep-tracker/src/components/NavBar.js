import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../redux/actions/authActions";
import { useHistory } from "react-router-dom";
import SleepRec from "./SleepRec";
import { StyledLink } from "../styles/authStyles";
import { AppBar, Toolbar, IconButton, Menu } from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";

const NavBar = () => {
  const logged = useSelector((state) => state.loggedIn);
  const dispatch = useDispatch();
  const history = useHistory();
  const [drawer, setDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    dispatch(setLogout());
    history.push("/login");
  };

  const handleDrawer = (e) => {
    setAnchorEl(e.currentTarget);
    setDrawer(!drawer);
  };
  return (
    <div className="nav-wrapper">
      <div className="nav-bar">
        <AppBar position="static" style={{ background: "#121212" }}>
          <Toolbar
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <IconButton
              onClick={handleDrawer}
              edge="start"
              aria-label="menu"
              style={{ color: "#e0e0e0" }}
            >
              <MenuIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={drawer} onClose={handleDrawer}>
              <StyledLink onClick={() => setDrawer(!drawer)} to="/analyzer">
                <SleepRec logged={logged} className="link" />
              </StyledLink>

              <StyledLink
                onClick={() => setDrawer(!drawer)}
                className="login"
                style={{ color: "black" }}
              >
                Settings
              </StyledLink>
              <br />
              <br />
              <StyledLink
                style={{ color: "black" }}
                to="/login"
                className="login"
                onClick={handleLogout}
              >
                {logged ? "Log Out" : "Login"}
              </StyledLink>
            </Menu>
            <h2
              onClick={() => history.push("/homepage")}
              style={{ textAlign: "center" }}
            >
              Sleep Tracker
            </h2>
          </Toolbar>
        </AppBar>
      </div>
      <div className="navBar">
        <h1>Sleep Tracker</h1>
        <StyledLink to="/analyzer" className="link">
          <SleepRec logged={logged} className="link" />
        </StyledLink>
        <StyledLink className="login">Settings</StyledLink>
        <StyledLink to="/login" className="login" onClick={handleLogout}>
          {logged ? "Log Out" : "Log in"}
        </StyledLink>
      </div>
    </div>
  );
};

export default NavBar;
