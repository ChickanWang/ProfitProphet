import React from "react"
import '../App.css';

function Stock(props) {
    //use stock name to get: 1. current price 2. predicted price 3. news rating 4. people ratings 5. iframme
    return (
        <div className="">
            {props.item.stock?<div className="">
            {props.item.stock}
            </div>:null}
        </div>
    )
}

export default Stock