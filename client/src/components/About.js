import React, { useEffect, useState} from 'react';
import "../App.css";
import "../Home.css"
import Pickture from  "../Stock.png"

function About(props){

    const onStart = e => {
        props.history.push('/stock')
    }

    return (
        <div className="row"> 
            <div className="offset-1 col-md-5 whitetext" style={{paddingTop:"200px"}}>
                    <h1 className="h1">ProfitProphet</h1>
                    <h4>Boost your portfolio with curated stock recommendations</h4> 
                    <p className="p">
                        Fill your pockets with profit prophet with accurate stock forecasts
                        <br/>
                        using the latest and greatest ML technologies from Azure!
                        </p>
                    <span><button className="butn" onClick={onStart}>View Top Predictions</button></span>
            </div>

            <div className="col-md-6" style={{padding:"70px", paddingTop:"150px"}}>
                <img style={{width:"100%"}}src={Pickture} alt=""></img>
            </div>

        </div>
    )
}


export default About;