import React, { Component } from "react";
class Item extends Component{
    constructor(props){

        super(props);

        this.state = {
            startprice: "",
            output:"",
            np: "",
            nnu:"",
            nne:"",
            pp: "",
            pnu:"",
            pne:"",
            symbol: ""
    }
  }
  componentDidMount(){
    this.setState({symbol: this.props.match.params.symbol})
    var symbol= this.props.match.params.symbol
    var datetime= new Date().toJSON();
    const userData = {
        datetime,
        symbol,
      };
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData)
      }
  
    fetch("/predict", requestOptions).then(response=>response.json()).then((data)=>{
      this.setState({output: data.result.Results.WebServiceOutput0[0]["Scored Labels"].toFixed(2),  startprice: data.currentprice})
    }).catch(error=>{
    })

    fetch(`/news?symbol=${symbol}`).then(response=>response.json()).then((data)=>{
      this.setState({np: data.Positive.toFixed(2), nnu: data.Neutral.toFixed(2), nne: data.Negative.toFixed(2)})
    }).catch(error=>{
    })

    fetch(`/discussion?symbol=${symbol}`).then(response=>response.json()).then((data)=>{
      this.setState({pp: data.Positive.toFixed(2), pnu: data.Neutral.toFixed(2), pne: data.Negative.toFixed(2)})
    }).catch(error=>{
    })

  }
  render(){
    return (
      <div className="blacktext">
        <div className="jumbotron jumbotronmargin bg-light container">
          <div className="row">
            <div className="col-sm-6 blacktext" >
              <h1 className="display-4">{this.state.symbol}</h1>
              <p>Next Hour's Predicted Price: ${this.state.output}</p>
              <div className="results">
                  <iframe src={'https://wallmine.com/widgets/chart/'+ this.props.match.params.symbol} async frameborder='0' allowtransparency='true' scrolling='no' style={{width: "100%", height: "450px"}}></iframe>     
              </div>
            </div>
            <div className="col-sm-6 bg-light" >
            <div className="card blacktext mb-3">
              <div className="card-header bg-light">Sentiment analysis</div>
              <div className="card-body">
                <h5 className="card-title">From News Outlets:</h5>
                <p className="card-text">Bullish: {this.state.np}%</p>
                <p className="card-text">Neutral: {this.state.nnu}%</p>
                <p className="card-text">Bearish: {this.state.nne}%</p>
                <br/>
                <h5 className="card-title">From Discussion Boards:</h5>
                <p className="card-text">Bullish: {this.state.pp}%</p>
                <p className="card-text">Neutral: {this.state.pnu}%</p>
                <p className="card-text">Bearish: {this.state.pne}%</p>
              </div>
            </div>
            </div>
          </div>

        </div>
      </div>
    )
  }
}
export default Item;