import React, { useEffect, useState} from 'react';
import "../App.css";

function Home2(){
    const [stock, setstocks] = useState("")
    const [message, setmessage] = useState("")

    function handleStockChange(e){
        setstocks(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault();

        //check if stock exists
    }

    return (
        <div className="form2">
            <form onSubmit={handleSubmit}>
                <div className="form-group formbox">
                    <label htmlFor="formGroupExampleInput">Enter Stock Symbol</label>
                    <div className="sidebyside">
                        <input type="text" name="stock" id="stock" className="form-control textbox" value={stock} onChange={handleStockChange} placeholder="e.g MFST"/>
                        <button type="submit" className="btn btn-primary mb-2">Go!</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Home2;