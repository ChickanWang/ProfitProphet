import react from 'react';

function Homepage() {

    return (
        <div>
        <div className="form">
          <h1>Register</h1>
          <br />
          <br />
          <br />
          <form>
            <div className="form-group textbox">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input type="email" className="form-control inputbox" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
            </div>
            <br />

            <div class="form-group textbox">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input type="password" className="form-control inputbox" id="exampleInputPassword1" placeholder="Password"/>
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
    )
}

export default Homepage;