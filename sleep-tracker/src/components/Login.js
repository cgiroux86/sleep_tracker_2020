import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { VisibilityOff, Visibility } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import {
  LoginContainer,
  LoginForm,
  InputContainer,
  TextContainer,
  Button,
  LoginButtonContainer,
} from "../styles/authStyles";
import {
  handleLogin as login,
  setData,
  loginSuccess,
  getWeeks,
  setUser,
  loginFailure,
} from "../redux/actions/authActions";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import { getWeek, formatDate, getTotalWeeks } from "../utils/helpers";

const Login = () => {
  let [start, end] = getWeek(new Date());
  start = formatDate(start);
  end = formatDate(end);

  if (localStorage.getItem("logged") && localStorage.getItem("token")) {
    Axios.get(
      `https://sleep-tracker2020.herokuapp.com/api/users/dates/?start=${start}&end=${end}`,
      {
        headers: { Authorization: localStorage.getItem("token") },
      }
    )
      .then((res) => {
        console.log(res);
        dispatch(loginSuccess());
        dispatch(setData(res.data));
        dispatch(getWeeks(getTotalWeeks()));
        history.push("/homepage");
      })
      .catch((err) => console.log(err));
  }

  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();

  const [input, setInput] = useState({ ...state, showPassword: false });
  const [logged, setLogged] = useState(false);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handleClickShowPassword = (e) => {
    e.preventDefault();
    setInput({ ...input, showPassword: !input.showPassword });
  };

  const handleLogin = () => {
    const creds = { email: input.email, password: input.password };
    Axios.post("https://sleep-tracker2020.herokuapp.com/api/auth/login", creds)
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.data.token);
        dispatch(setUser(res.data.user));
        dispatch(loginSuccess());
        history.push("/homepage");
        return logged ? localStorage.setItem("logged", true) : null;
      })
      .catch((err) => dispatch(loginFailure("invalid credentials")));
  };

  const loggedInOut = () => {
    setLogged(!logged);
  };

  return (
    <LoginContainer>
      <TextContainer>
        <h1>Welcome back!</h1>
        <h3>You're one step closer to finding your ideal sleep schedule.</h3>
      </TextContainer>
      <LoginForm>
        <InputContainer>
          <FormControl className="navBar" variant="outlined">
            <InputLabel
              style={{ color: "#e0e0e0" }}
              htmlFor="outlined-adornment-email"
            >
              Email
            </InputLabel>
            <OutlinedInput
              style={{ color: "white", width: "560px" }}
              id="outlined-adornment-email"
              type="text"
              value={input.email}
              name="email"
              onChange={handleChange}
              autoFocus
            />
          </FormControl>
        </InputContainer>
        <InputContainer>
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
              type={input.showPassword ? "text" : "password"}
              value={input.password}
              name="password"
              onChange={handleChange}
              autoFocus
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    style={{ color: "#e0e0e0" }}
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {input.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>
          {state.error && <p style={{ color: "red" }}>{state.error}</p>}
        </InputContainer>
        <label>Stay logged in?</label>
        <input type="checkbox" onChange={loggedInOut}></input>
        <LoginButtonContainer>
          <Button onClick={handleLogin}>Login</Button>
        </LoginButtonContainer>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;
