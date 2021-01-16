import logo from './logo.svg';
import './App.css';
import PhilTest from './components/PhilTest.js';
import Homepage from './components/Homepage.js'
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div>
      <Switch>
        <Route path="/phil" component={PhilTest} exact />
        <Route path="/" component={Homepage} exact />
      </Switch>
    </div>
  );
}

export default App;
