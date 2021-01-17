import React, { Component } from "react";
import { Link } from "react-router-dom";
import {LoginContext} from "./LoginContext"

class Register extends Component {
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
  
  componentDidMount(){
      this._isMounted = true;
  }
  componentWillUnmount() {
      this._isMounted = false;
  }
  // Form Change handler
  onChange(e){
      this.setState({ [e.target.id]: e.target.value });
  };

  // Create new user account from form/state data
  onSubmit(e){
      e.preventDefault();
      const newUser = {
        email: this.state.email,
        password: this.state.password,

      }

      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newUser)
      }
      
      // Make request to backend to create account
      console.log(requestOptions)
      fetch('/api/register', requestOptions)
      .then(response => {
      const r = response.json()
          if(response.ok){
              this.props.history.push("/login");
          }
          return r
      })
      .then(data => {
          if(this._isMounted){
              this.setState({ errors: data })
          }
      })
  };

  render() {
    // Redirect if already logged in
    if(this.context.loggedIn){
      this.props.history.push("/search");
    }
      const { errors } = this.state;
      return (
        <div>
        <div className="form">
          <h1>Register</h1>
          <br />
          <br />
          <br />
          <form onSubmit={this.onSubmit}>
            <div className="form-group textbox">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input type="email" className="form-control inputbox" id="email" onChange={this.onChange}
                    value={this.state.email}
                    aria-describedby="emailHelp" placeholder="Enter email"/>
            </div>
            <br />

            <div class="form-group textbox">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input type="password" onChange={this.onChange}
                    value={this.state.password}
                    className="form-control inputbox" id="password" placeholder="Password"/>
            </div>
            <br />
            <br />
            <br />
            <button type="submit" className="btn btn-outline-primary loginbutton">Register</button>
          <br />
          <br />
          <br />
          <br />
          <p>Already have an account? Log in!</p>
          <button type="button" onClick={()=>this.props.history.push("/login")} className="btn btn-outline-primary loginbutton">Log in</button>
          </form>
        </div>
      </div>
      );
    }
}

Register.contextType = LoginContext
export default Register;