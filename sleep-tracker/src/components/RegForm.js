import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { Button } from "../styles/authStyles";
import { handleRegister } from "../redux/actions/authActions";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import GoogleLogin from "react-google-login";
import Axios from "axios";
import { v4 } from "uuid";

const RegForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClick = () => {
    setShowPassword(!showPassword);
  };

  const submit = (values) => {
    dispatch(handleRegister(values));
    history.push("/login");
  };

  const { handleSubmit, register, errors } = useForm();

  const responseGoogle = (response) => {
    const user = {
      email: response.profileObj.email,
      password: response.profileObj.googleId,
      first_name: response.profileObj.givenName,
      last_name: response.profileObj.familyName,
    };

    Axios.post(
      `https://sleep-tracker2020.herokuapp.com/api/auth/register`,
      user
    )
      .then((res) => history.push("/login"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="form-container">
      <GoogleLogin
        clientId="399318981538-8eudhb11tcao498l94vojqoil44spmrn.apps.googleusercontent.com"
        buttonText="Sign Up With Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
        // approvalPrompt="force"
        // responseType="id_token"
      />
      <form style={{ color: "white" }} onSubmit={handleSubmit(submit)}>
        <div className="names">
          <div>
            <input
              className="input-form"
              name="first_name"
              placeholder="first name"
              ref={register({
                required: "Required",
                pattern: {
                  value: /^[A-Za-z]+$/i,
                  message: "invalid name format",
                },
              })}
            ></input>

            {errors.first_name && <p>{errors.first_name.message}</p>}
          </div>
          <div>
            <input
              className="input-form"
              name="last_name"
              placeholder="last name"
              ref={register({
                required: "Required",
                pattern: {
                  value: /^[A-Za-z]+$/i,
                  message: "invalid name format",
                },
              })}
            ></input>
            {errors.last_name && (
              <p style={{ color: "#e0e0e0" }}>{errors.last_name.message}</p>
            )}
          </div>
        </div>
        <div>
          <input
            className="input-form full-length"
            name="email"
            placeholder="email"
            ref={register({
              required: "Required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "invalid email address",
              },
            })}
          ></input>
          {errors.email && (
            <p style={{ color: "#e0e0e0" }}>{errors.email.message}</p>
          )}
        </div>
        <div>
          <input
            className="input-form full-length"
            name="password"
            placeholder="password"
            ref={register({ required: "Required", minLength: 5 })}
            type={showPassword ? "text" : "password"}
          ></input>
          {showPassword ? (
            <Visibility onClick={handleClick} className="visibility" />
          ) : (
            <VisibilityOff onClick={handleClick} className="visibility" />
          )}
          {errors.password && (
            <p style={{ color: "#e0e0e0" }}>
              password must be at least 5 characters
            </p>
          )}
        </div>

        <Button type="submti" className="reg-button">
          Sign up!
        </Button>
      </form>
    </div>
  );
};

export default RegForm;
