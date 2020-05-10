import React from "react";
import ReactDOM from "react-dom";
import { GoogleLogin } from "react-google-login";

const responseGoogle = (response) => {
  console.log(response);
};

const GLogin = () => {
  ReactDOM.render(
    <GoogleLogin
      clientId="399318981538-8eudhb11tcao498l94vojqoil44spmrn.apps.googleusercontent.com
    "
      buttonText="Login"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={"single_host_origin"}
    />,
    document.getElementById("googleButton")
  );
};

export default GLogin;
