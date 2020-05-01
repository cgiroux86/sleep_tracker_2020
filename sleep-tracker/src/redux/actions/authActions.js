import {
  SET_USER,
  REGISTER_FAILURE,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  SET_DATA,
  GET_WEEKS,
  SET_FORMATTED,
  SET_LOGOUT,
} from "../types/authTypes";
import Axios from "axios";

export const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

export const registerFailure = (err) => {
  return {
    type: REGISTER_FAILURE,
    payload: err,
  };
};

export const handleRegister = (user) => (dispatch) => {
  Axios.post("https://sleep-tracker2020.herokuapp.com/api/auth/register", user)
    .then((res) => {
      dispatch(setUser(res.data[0]));
    })
    .catch((err) => dispatch(registerFailure(err)));
};

export const loginFailure = (err) => {
  return {
    type: LOGIN_FAILURE,
    payload: err,
  };
};

export const loginSuccess = () => {
  return {
    type: LOGIN_SUCCESS,
  };
};

export const handleLogin = (user) => (dispatch) => {
  Axios.post("https://sleep-tracker2020.herokuapp.com/api/auth/login", user)
    .then((res) => {
      localStorage.setItem("token", res.data.token);
      dispatch(setUser(res.data.user));
      dispatch(loginSuccess());
    })
    .catch((err) => dispatch(loginFailure(err)));
};

export const setData = (data) => {
  return {
    type: SET_DATA,
    payload: data,
  };
};

export const getWeeks = (weeks) => {
  return {
    type: GET_WEEKS,
    payload: weeks,
  };
};

export const setFormatted = (data) => {
  return {
    type: SET_FORMATTED,
    payload: data,
  };
};

export const setLogout = () => {
  return {
    type: SET_LOGOUT,
  };
};
