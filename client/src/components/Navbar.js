
import React, { Component } from "react";
import { Link } from "react-router-dom";
import {withRouter} from 'react-router-dom';
import {LoginContext} from "./LoginContext";
import '../App.css'
import Logo from "../Logo.png"

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

        <nav class="navbar navbar-toggleable-md navbar-light bg-faded">


          <div class="d-md-flex d-block flex-row mx-md-auto mx-0">

                  <div class="navbar-nav">

                    <Link to="/" className="navItem btn">

                    <span className="navItem" ><span style={{fontWeight: 700}}> Profit</span>
                    <span style={{fontWeight: 200}}>Prophet</span><img className="logo" src={Logo} alt="logo img" height="30px" style={{padding:0}}/></span>


                    </Link>

                  </div>


          </div>
        </nav>

    );
  }
}

export default withRouter(Navbar);