import React, { useEffect, useState} from 'react';
import "../App.css";
import Stock from './Stock';

function Home(){
    // const [symbol, setsymbol] = useState([])
    const [stockcount, setstockcount] = useState(0)
    // const [cp, setcp] = useState([])
    // const [pp, setpp] = useState([])
    // const [news, setnews] = useState([])
    // const [disc, setdisc] = useState([])
    const [stocks, setstocks] = useState([])
    var wlstocks;

    const [isloaded, setloaded] = useState(false)

    useEffect(()=>{
        //login first, get user
        //get users watchlist symbols (push into stocks)

        setInterval(()=>{
            //for loop going over all of the symbols  
            //new scheme
            
            //var cp = yifinacne call
            //var prediciton = rprediction api call
            //var news = news api call
            // var disc = disc api call
            //make a dictionary item with all of them in it
            //push the item to the stock state

            //old scheme
            // yfinance api call, push back in the array
            
            // prediction api call, push back in the array

            // news api call, make an array of 3 values and push

            // disc api call, make an array of 3 values and push
            
        }, 600000)

        //maybe need to move into the interval?
        setstocks(true)

    }, [])

    useEffect(()=>{
        //rebuild the jsx that makes the stock item so it has all stocks
    }, stockcount)

    function addSymbol(e){
        //check if its a symbol, if its not then tell them -> maybe have a dropdown?

        //add the stock then the info for it
    }

    function makewl(){
        if(stocks){
            wlstocks = stocks.map(item => <Stock key={item.stock.symbol} item={item}/>);
        }
    }

    //maybe need to pull it in the return?
    makewl()

    return (
        <div>
            {isloaded? 
<div>
    {wlstocks}
</div>
                : <p>Loading</p>}
        </div>
    )
}

export default Home;