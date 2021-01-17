import React, { useState} from 'react';
import { useHistory } from 'react-router-dom';
import "../App.css";

function Home2(){
    const [stock, setstocks] = useState("")
    const [message, setmessage] = useState("")
    const history = useHistory();

    function handleStockChange(e){
        setstocks(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault();
        history.push(`/home/${stock}`);
    }

    return (
        <div className="form2">
            <form onSubmit={handleSubmit}>
                <div className="form-group formbox">
                    <label htmlFor="formGroupExampleInput">Enter Stock Symbol</label>
                    <div className="sidebyside">
                        <input type="text" name="stock" id="stock" className="form-control textbox" value={stock} onChange={handleStockChange} placeholder="e.g MSFT"/>
                        <button type="submit" className="btn btn-primary mb-1 gobutton">Go!</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Home2;