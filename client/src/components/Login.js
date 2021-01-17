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

    // console.log(requestOptions)
    //NEED TO MODIFY THIS 
    // Request token for corresponding user account from backend
    // console.log(requestOptions)
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
        <div className="form" onSubmit={this.onSubmit}>
          <h1>Login</h1>
          <br />
          <br />
          <br />
          <form onSubmit={this.onSubmit}>
            <div className="form-group textbox">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input type="email" className="form-control inputbox" onChange={this.onChange} value={this.state.email} id="email" aria-describedby="emailHelp" placeholder="Enter email"/>
            </div>
            <br />
            <br />
            <div class="form-group textbox">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input type="password" className="form-control inputbox" onChange={this.onChange} value={this.state.password} id="password" placeholder="Password"/>
            </div>
            <br />
            <br />
            <br />
            <button type="submit" className="btn btn-outline-primary loginbutton">Log in</button>
          <br />
          <br />
          <br />
          <br />
          <p>Don't have an account? Sign up today!</p>
          <button type="button" onClick={()=>this.props.history.push("/register")} className="btn btn-outline-primary loginbutton">Sign Up</button>
          </form>
        </div>
      </div>
    );
  }
}

Login.contextType = LoginContext
export default Login;