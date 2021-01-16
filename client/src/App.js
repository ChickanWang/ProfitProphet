import logo from './logo.svg';
import './App.css';
import PhilTest from './components/PhilTest.js';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div>
      <Switch>
        <Route path="/phil" component={PhilTest} exact />
      </Switch>
    </div>
  );
}

export default App;
