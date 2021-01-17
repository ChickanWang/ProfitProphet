import React from "react"
import '../App.css';

function Stock(props) {
    return (
        <div className="">
            {props.item.symbol?<div className="">
            {props.item.symbol}
            {props.item.cp}
            {props.item.pp}
            {props.item.news}
            {props.item.disc}
            </div>:null}
        </div>
    )
}

export default Stock