import React, { Component } from "react";
import { useParams } from "react-router-dom";
import {LoginContext} from "./LoginContext";
import yfinance from "yfinance";
class Item extends Component{
    constructor(props){

        super(props);

        this.state = {
            output:"",

    }
  }
  componentDidMount(){
    var symbol= this.props.match.params.symbol
    var datetime= new Date().toJSON();
    console.log(datetime)
    const userData = {
        datetime,
        symbol,
      };
      console.log(userData);
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData)
      }
  
    fetch("/predict", requestOptions).then(response=>response.json()).then((data)=>{
      this.setState({output: data})
        
        
    }).catch(error=>{
        this.context.toggleLogout()
        this.props.history.push("/login");
    })
  }
  render(){
    return <div className="container-fluid">
        
    <div  className="row" style={{"padding":"30px"}} >
      <div className="results">
        {this.state.output}
      <iframe src={'https://wallmine.com/widgets/chart/'+this.props.match.params.symbol} async frameborder='0' allowtransparency='true' scrolling='no' style={{width: "100%", height: "450px"}}></iframe>      </div>
    </div>
  </div>
  }
}
Item.contextType = LoginContext
export default Item;