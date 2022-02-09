import { MemoryRouter as Router, Route, Switch } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './App.css';
import LoginPage from './components/pages/LoginPage';
import MainPage from './components/pages/MainPage';
import SettingsPage from './components/pages/SettingsPage';
import WebsitesPage from './components/pages/WebsitesPage';

function App() {
  var isLoggedIn = false;
  var username = "TEODOR";
  return (
    <div className="App">
      <Router>
        <Route render={({ location }) => (
          <TransitionGroup>
            <CSSTransition
              key={location.key}
              timeout={600}
              classNames="fade">
              <Switch location={location}>
                <Route exact path="/">
                  {isLoggedIn? <MainPage username={username}/> : <LoginPage />}
                </Route>
                <Route path="/dashboard">
                  <MainPage username="TEODOR" />
                </Route>
                <Route path="/settings" component={SettingsPage}/>
                <Route path="/websites" component={WebsitesPage}/>
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )} />
      </Router>
    </div>
  );
}

export default App;
