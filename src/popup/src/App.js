/*global chrome*/
import React from 'react';
import { MemoryRouter as Router, Route, Redirect } from 'react-router-dom';
import LoginPage from './components/pages/LoginPage';
import MainPage from './components/pages/MainPage';
import SettingsPage from './components/pages/SettingsPage';
import WebsitesPage from './components/pages/WebsitesPage';
import HistoryPage from './components/pages/HistoryPage';
import './App.css';

class App extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      data : null
    }
  }

  componentDidMount() {
    chrome.storage.local.get(['loggedIn'], (data) => {
      console.log("I have been called");
      if (data.loggedIn !== undefined)
        this.setState({
          loggedIn: data.loggedIn
        });
    });
  }

 

  render() {
    console.log("LoggedIn: ", this.state.loggedIn);

    if (this.state.data == null)
        return <div className="App"/>
    else
    return (
      <div className="App">
        <Router>
          <Route exact path="/">
            {this.state.loggedIn ? <Redirect to="/dashboard"/> : <LoginPage/>}
          </Route>

          <Route path="/login" component={LoginPage}/>
          <Route path="/dashboard" component={MainPage}/>
          <Route path="/settings" component={SettingsPage} />
          <Route path="/websites" component={WebsitesPage} />
          <Route path="/history" component={HistoryPage} />
        </Router>
      </div>
    );
  }
}

export default App;
