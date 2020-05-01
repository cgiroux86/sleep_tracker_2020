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
          <Route exact path="/homepage">
            <Homepage />
          </Route>
          <Route exact path="/add-entry">
            <AddEntry />
          </Route>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
