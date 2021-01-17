
import React, { Component } from "react";
import { Link } from "react-router-dom";
import {withRouter} from 'react-router-dom';
import {LoginContext} from "./LoginContext";
// import logo from "./logo.png"

//Navbar that conditionally renders certain buttons based on whether or not user logged in
class Navbar extends Component {
  render() {
    var route;
    var text;

    if(this.props.location.pathname==="/watchlist"){
        route="/search";
        text= "SEARCH"
    }else{
        route="/watchlist";
        text= "VIEW WATCHLIST"
    }
    return (
      
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link to="/" className="navItem btn">
                <span className="navItem"><img className="logo" src={"asd"} alt="logo img" height="30px" style={{padding:0}}/><span style={{fontWeight: 700}}> Profit</span>
                <span style={{fontWeight: 200}}>Prophet</span></span>
              </Link>
            </li>
            <LoginContext.Consumer>
            {
              context => {
                return !context.loggedIn? (
                  <li className="nav-item active">
                    <Link to="/register" className="navItem btn">
                      <span className="navItem">REGISTER</span>
                    </Link>
                  </li>
                ):
                (
                    
                  <li className="nav-item active">
                    <Link to={route} className="navItem btn">
                      <span className="navItem">{text}</span>
                    </Link>
                  </li>
                  
                )
              }
            }
            </LoginContext.Consumer>
            <LoginContext.Consumer>
            {
              context => {
                return !context.loggedIn? (
                 <li className="nav-item">
                    <Link to="/login" className="navItem btn">
                      <span className="navItem">LOG IN</span>
                    </Link>
                  </li>
                ): null
              }
            }
            </LoginContext.Consumer>
          </ul>
          <div className="form-inline my-2 my-lg-0">
           <LoginContext.Consumer>
            {
              context => {
                return context.loggedIn? (
                <Link to="/" onClick={context.toggleLogout} style={{width: "100%", textAlign:"left"}} className="btn">
                <span className="navItem">LOG OUT &nbsp;</span>
                </Link>
                ): null
              }
            }
            </LoginContext.Consumer>
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar);