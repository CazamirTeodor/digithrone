/*global chrome*/
import React from 'react';
import { MemoryRouter as Router, Route, Redirect } from 'react-router-dom';
import LoginPage from './components/pages/LoginPage';
import MainPage from './components/pages/MainPage';
import SettingsPage from './components/pages/SettingsPage';
import WebsitesPage from './components/pages/WebsitesPage';
import HistoryPage from './components/pages/HistoryPage';
import Loader from './components/Loader';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: undefined
    }
  }

  componentDidMount() {
    chrome.storage.local.get(['data'], (result) => {
      if (result.data !== undefined){
        if (result.data.logged_in !== undefined){
          this.setState({data: result.data});
        }
      }
      else
        this.setState({data : null});
    });
  }



  render() {
    console.log(this.state.data);
    return (
      <div className="App">
        {
          this.state.data === undefined ?
            <Loader /> :
            <Router>
              <Route exact path="/">
                { this.state.data === null ? <LoginPage/> :
                  this.state.data.logged_in ? <Redirect to="/dashboard" /> : <LoginPage />}
              </Route>
              <Route path="/login" component={LoginPage} />
              <Route path="/dashboard">
                <MainPage data={this.state.data}/>
              </Route>
              <Route path="/settings" component={SettingsPage} />
              <Route path="/websites" component={WebsitesPage} />
              <Route path="/history" component={HistoryPage} />
            </Router>

        }
      </div>
    );
  }
}

export default App;
