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

const inititalState = {
  id: null,
  email: "",
  password: "",
  first_name: "",
  last_name: "",
  error: "",
  loggedIn: false,
  data: [],
  weeks: [],
  formatted: [],
};

export const reducer = (state = inititalState, action) => {
  switch (action.type) {
    case SET_USER:
      console.log(action.payload);
      return {
        ...state,
        id: action.payload.id,
        email: action.payload.email,
        password: action.payload.password,
        first_name: action.payload.first_name,
        last_name: action.payload.last_name,
      };
    case REGISTER_FAILURE: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case LOGIN_FAILURE: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        loggedIn: true,
        error: "",
      };
    }
    case SET_DATA: {
      return {
        ...state,
        data: action.payload,
      };
    }
    case GET_WEEKS: {
      return {
        ...state,
        weeks: action.payload,
      };
    }
    case SET_FORMATTED: {
      return {
        ...state,
        formatted: action.payload,
      };
    }
    case SET_LOGOUT: {
      return {
        ...state,
        loggedIn: false,
      };
    }

    default:
      return state;
  }
};
