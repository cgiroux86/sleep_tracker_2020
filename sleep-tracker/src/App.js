import React from "react";
import "./App.scss";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import NavBar from "./components/NavBar";
import Register from "./components/Register";
import Login from "./components/Login";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import AddEntry from "./components/AddEntry";
import Analyzer from "./components/Analyzer";
import RegForm from "./components/RegForm";
import { PrivateRoute } from "./components/PrivateRoute";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <NavBar />
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <PrivateRoute exact path="/homepage" component={Homepage} />
          <PrivateRoute exact path="/add-entry" component={AddEntry} />
          <PrivateRoute exact path="/analyzer" component={Analyzer} />
          <PrivateRoute exact path="/regform" component={RegForm} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
