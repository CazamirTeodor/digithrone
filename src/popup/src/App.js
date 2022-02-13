import { MemoryRouter as Router, Route, Switch } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './App.css';
import LoginPage from './components/pages/LoginPage';
import MainPage from './components/pages/MainPage';
import SettingsPage from './components/pages/SettingsPage';
import WebsitesPage from './components/pages/WebsitesPage';
import HistoryPage from './components/pages/HistoryPage';

function App() {
  var isLoggedIn = false;
  var username = "TEODOR";
  return (
    <div className="App">
      <Router>
        <Route exact path="/">
          {isLoggedIn ? <MainPage username={username} /> : <LoginPage />}
        </Route>
        <Route path="/dashboard">
          <MainPage username="TEODOR" />
        </Route>
        <Route path="/settings" component={SettingsPage} />
        <Route path="/websites" component={WebsitesPage} />
        <Route path="/history" component={HistoryPage} />
      </Router>
    </div>
  );
}

export default App;
