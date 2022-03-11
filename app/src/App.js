import logo from './logo.svg';
import './App.css';
<<<<<<< HEAD
=======
import Home from './containers/Home';
import Issue from './containers/Issue';
import Chat from './containers/Chat';
import Dashboard from './containers/Dashboard';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

>>>>>>> master

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/issue" component={Issue}/>
            <Route exact path="/chat" component={Chat}/>
            <Route exact path="/dashboard" component={Dashboard}/>
        </Switch>
    </Router>
  </div>
  );
}

export default App;
