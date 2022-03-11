import logo from './logo.svg';
import './App.css';
import Home from './containers/home/Home';
import Home from './containers/Home';
import Issue from './containers/Issue';
import Chat from './containers/chat/Chat';
import Dashboard from './containers/dashboard/Dashboard';
import Register from './containers/register/Register';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/issue" component={Issue}/>
            <Route exact path="/chat" component={Chat}/>
            <Route exact path="/dashboard" component={Dashboard}/>
        </Switch>
    </Router>
  </div>
  );
}

export default App;
