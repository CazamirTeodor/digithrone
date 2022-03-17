import React from 'react';
import { MemoryRouter as Router, Route, Redirect } from 'react-router-dom';
import LoginPage from './components/pages/LoginPage';
import MainPage from './components/pages/MainPage';
import SettingsPage from './components/pages/SettingsPage';
import CookiesPage from './components/pages/CookiesPage';
import HistoryPage from './components/pages/HistoryPage';
import Loader from './components/Loader';
import './App.css';

import { getData } from './components/Utils';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: undefined
    }
  }

  componentDidMount() {
    getData( (data) => {
      if ((data !== undefined) && ("logged_in" in data)) {
          this.setState({ data: data });
      }
      else{
        this.setState({ data: null });
      }
    });
  }



  render() {
    return (
      <div className="App">
        {
          this.state.data === undefined ?
            <Loader /> :
            <Router>
              <Route exact path="/">
                {this.state.data === null ? <LoginPage /> :
                  this.state.data.logged_in ? <Redirect to="/dashboard" /> : <LoginPage />}
              </Route>
              <Route path="/login" component={LoginPage} />
              <Route path="/dashboard">
                <MainPage data={this.state.data} />
              </Route>
              <Route path="/settings" component={SettingsPage} />
              <Route path="/cookies" component={CookiesPage} />
              <Route path="/history" component={HistoryPage} />
            </Router>

        }
      </div>
    );
  }
}

export default App;
