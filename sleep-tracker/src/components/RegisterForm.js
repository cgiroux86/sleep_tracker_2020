import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@material-ui/core";

import { VisibilityOff, Visibility } from "@material-ui/icons";

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { handleRegister } from "../redux/actions/authActions";
import {
  Container,
  FormContainer,
  FContainer,
  NamesContainer,
  ButtonContainer,
} from "../styles/authStyles";
import { useHistory } from "react-router-dom";

const RegisterForm = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    showPassword: false,
  });

  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    console.log(state);
  });

  const handleChange = (prop) => (e) => {
    setValues({ ...values, [prop]: e.target.value });
  };

  const handleClickShowPassword = (e) => {
    e.preventDefault();
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      email: values.email,
      password: values.password,
      first_name: values.firstName,
      last_name: values.lastName,
    };
    dispatch(handleRegister(user));
    history.push("/login");
  };

  return (
    <>
      <Container>
        <ButtonContainer>
          <label style={{ color: "#e0e0e0" }}>stay logged in?</label>
          <input type="checkbox"></input>
          <div>
            <button
              style={{
                height: "30px",
                width: "200px",
                marginTop: "100px",
                backgroundColor: "#39869D",
                color: "#e0e0e0",
                borderRadius: "10px",
              }}
              onClick={handleSubmit}
            >
              Sign up
            </button>
          </div>
        </ButtonContainer>
        <FContainer>
          <FormControl className="navBar" variant="outlined">
            <InputLabel
              style={{ color: "#e0e0e0" }}
              htmlFor="outlined-adornment-password"
            >
              Password
            </InputLabel>
            <OutlinedInput
              style={{ width: "560px", color: "#e0e0e0" }}
              id="outlined-adornment-password"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    style={{ color: "#e0e0e0" }}
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>
        </FContainer>
        <FormContainer>
          <FormControl className="navBar" variant="outlined">
            <InputLabel
              style={{ color: "#e0e0e0" }}
              htmlFor="outlined-adornment-email"
            >
              Email
            </InputLabel>
            <OutlinedInput
              style={{ width: "560px" }}
              id="outlined-adornment-email"
              type="text"
              value={values.email}
              onChange={handleChange("email")}
            />
          </FormControl>
        </FormContainer>
        <NamesContainer>
          <div className="name-wrapper">
            <div>
              <FormControl
                className="navBar"
                variant="outlined"
                style={{ marginRight: "50px" }}
              >
                <InputLabel
                  style={{ color: "#e0e0e0" }}
                  htmlFor="outlined-adornment-firstName"
                >
                  First Name
                </InputLabel>
                <OutlinedInput
                  style={{ color: "white", width: "250px" }}
                  id="outlined-adornment-firstName"
                  type="text"
                  value={values.firstName}
                  onChange={handleChange("firstName")}
                />
              </FormControl>
            </div>
          </div>

          <div>
            <FormControl className="navBar" variant="outlined">
              <InputLabel
                style={{ color: "#e0e0e0", width: "250px" }}
                htmlFor="outlined=adornment-lastName"
              >
                Last Name
              </InputLabel>
              <OutlinedInput
                style={{ color: "white", width: "250px" }}
                id="outlined-adornment-lastName"
                type="text"
                value={values.lastName}
                onChange={handleChange("lastName")}
              />
            </FormControl>
          </div>
        </NamesContainer>
      </Container>
    </>
  );
};

export default RegisterForm;
