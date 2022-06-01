import React from "react";
import { MemoryRouter as Router, Route, Redirect } from "react-router-dom";
import LoginPage from "./components/pages/LoginPage";
import MainPage from "./components/pages/MainPage";
import CookiesPage from "./components/pages/CookiesPage";
import Loader from "./components/Loader";
import "./App.css";

import { getData } from "./components/Utils";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: undefined,
    };
  }

  componentDidMount() {
    getData(["logged_in", "name", "backendUp", "prefferences"], (data) => {
      if (data?.logged_in) {
        this.setState({ data: data });
      } else {
        this.setState({ data: null });
      }
    });
  }

  render() {
    return (
      <div className="App">
        {this.state.data === undefined ? (
          <Loader />
        ) : (
          <Router>
            <Route exact path="/">
              {this.state.data === null ? (
                <LoginPage />
              ) : this.state.data.logged_in ? (
                <Redirect to="/dashboard" />
              ) : (
                <LoginPage />
              )}
            </Route>
            <Route path="/login" component={LoginPage} />
            <Route path="/dashboard">
              <MainPage data={this.state.data} />
            </Route>
            <Route path="/cookies" component={CookiesPage} />
          </Router>
        )}
      </div>
    );
  }
}

export default App;
