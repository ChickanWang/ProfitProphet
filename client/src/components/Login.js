import React, { Component } from "react";
import { Link } from "react-router-dom";
import {LoginContext} from "./LoginContext";
import '../App.css';

// User Login Page
class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)

  }
  
  // Form Change Handler
  onChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  };
  
  // Submit login info, try to log in
  onSubmit(e) {
    const {toggleLogin} = this.context;
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
      errors:{}
    };

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    }

    //NEED TO MODIFY THIS 
    // Request token for corresponding user account from backend
    fetch('/api/login', requestOptions)
        .then(response => {
          const r = response.json()
          return r
        })
        .then(data => {

          this.setState({ errors: data })
          if(data.success===true){
              toggleLogin(data.token)
                this.props.history.push("/search");
          }
        })

  };


  render() {
    if(this.context.loggedIn){
      this.props.history.push("/home");
    }
    const { errors } = this.state;
    return (
      <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <a class="navbar-brand" href="#">Profit Prophet</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav mr-auto">
              <li className="nav-item">
                      <Link to="/login" className="nav-link text-muted">Login</Link>
                  </li>
                  <li className="nav-item">
                      <Link to="/register" className="nav-link text-muted">Register</Link>
                  </li>
              </ul>
          </div>
        </nav>
      </div>
    );
  }
}

Login.contextType = LoginContext
export default Login;