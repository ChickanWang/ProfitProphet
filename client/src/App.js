import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';

import {LoginContext} from "./components/LoginContext";
import Home2 from './components/Home2';
import Login from "./components/Login";
import Register from "./components/Register";
// import Search from "./components/Search";
// import Watchlist from "./components/Watchlist";
import Navbar from "./components/Navbar"
import Stock from "./components/Stock"
// import Item from "./components/Item";
// import NotFound from "./components/NotFound";
class App extends Component {
  constructor(props) {
    super(props);

    //Context methods to log in and out, saving/removing from localstorage
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
      <LoginContext.Provider value={this.state}>
        <Router>
          <div className="App">
          <Navbar />
            <Switch>
              <Route exact path="/home2" component={Home2} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/stock/:symbol?" component={Stock} />
              {/* <Route exact path="/search" component={Search} />
              <Route exact path="/watchlist" component={Watchlist} />
              <Route exact path="/item/:upc?" component={Item} />
              <Route path="/" component={NotFound} />  */}
            </Switch>
          </div>
        </Router>
      </LoginContext.Provider>
    );
  }
}

export default App;