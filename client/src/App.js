import logo from './logo.svg';
import './App.css';
import PhilTest from './components/PhilTest.js';
import Home from './components/Home.js';
// import SteveTest from './components/SteveTest.js'
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div>
      <Switch>
        <Route path="/phil" component={PhilTest} exact />
        <Route path="/home" component={Home} exact />
        {/* <Route path="/steve" component={SteveTest} exact /> */}
      </Switch>
    </div>
  );
}

export default App;
