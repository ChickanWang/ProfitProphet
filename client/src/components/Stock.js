import React, { Component } from "react";
import { useParams } from "react-router-dom";
import {LoginContext} from "./LoginContext";
class Item extends Component{
    constructor(props){

        super(props);

        this.state = {
            startprice: "",
            output:"",

    }
  }
  componentDidMount(){
    var symbol= this.props.match.params.symbol
    var datetime= new Date().toJSON();
    // console.log(datetime)
    const userData = {
        datetime,
        symbol,
      };
      // console.log(userData);
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData)
      }
  
    fetch("/predict", requestOptions).then(response=>response.json()).then((data)=>{
      // console.log(data.result.Results.WebServiceOutput0[0]["Scored Labels"])
      // console.log(data.results.Results.WebServiceOutput0[0])
      // console.log (data.results.Results.WebServiceOutput0)
      // console.log(data)
      this.setState({output: data.result.Results.WebServiceOutput0[0]["Scored Labels"],  startprice: data.currentprice})
      // console.log(this.state.output)
    }).catch(error=>{
        // this.context.toggleLogout()
        // this.props.history.push("/login");
    })
  }
  render(){
    return <div className="container-fluid">
        
    <div className="row" style={{"padding":"30px"}} >
      <div className="results">
        <p>{this.state.output} {this.state.startprice}</p>
      <iframe src={'https://wallmine.com/widgets/chart/'+this.props.match.params.symbol} async frameborder='0' allowtransparency='true' scrolling='no' style={{width: "100%", height: "450px"}}></iframe>      </div>
    </div>
  </div>
  }
}
Item.contextType = LoginContext
export default Item;