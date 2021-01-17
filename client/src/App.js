import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';

import Home from './components/Home';
import About from "./components/About";
import Navbar from "./components/Navbar"
import Stock from "./components/Stock"
class App extends Component {
  constructor(props) {
    super(props);

    this.toggleLogin = (token) => {
      localStorage.setItem("jwtToken", token);
      this.setState(state => ({
        loggedIn: true,
        token: token
      }));
    };

    this.toggleLogout = () => {
      localStorage.removeItem("jwtToken");
      this.setState(state => ({
        loggedIn: false,
        token: null
      }));
    };
    
    let t = localStorage.jwtToken;


   
    this.state = {
      loggedIn:localStorage.jwtToken ? true : false,
      toggleLogin: this.toggleLogin,
      toggleLogout: this.toggleLogout,
      token: t
    }  
  }


  render() {
    return (
        <Router>
          <div className="App">
          <Navbar />
            <Switch>
              <Route exact path="/stock" component={Home} />
              <Route exact path="/stock/:symbol" component={Stock} />
              <Route exact path="/" component={About} />
            </Switch>
          </div>
        </Router>
    );
  }
}

export default App;