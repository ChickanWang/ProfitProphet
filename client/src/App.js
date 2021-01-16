import logo from './logo.svg';
import './App.css';
import PhilTest from './components/PhilTest.js';
<<<<<<< HEAD
import Homepage from './components/Homepage.js'
=======
import Home from './components/Home.js';
// import SteveTest from './components/SteveTest.js'
>>>>>>> 77fa9512b7eaa26c08dad2f7c38fc3aad4ce0229
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div>
      <Switch>
        <Route path="/phil" component={PhilTest} exact />
<<<<<<< HEAD
        <Route path="/" component={Homepage} exact />
=======
        <Route path="/home" component={Home} exact />
        {/* <Route path="/steve" component={SteveTest} exact /> */}
>>>>>>> 77fa9512b7eaa26c08dad2f7c38fc3aad4ce0229
      </Switch>
    </div>
  );
}

export default App;
