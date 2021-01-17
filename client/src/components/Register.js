import React, {useState} from 'react';
import '../App.css';
import AuthService from '../services/AuthService'

function Homepage() {
    const [user,setUser] = useState({email: "", password : ""});
    const [message,setMessage] = useState(null)

    const onChange = e => {
        setUser({...user,[e.target.name] : e.target.value});
    }

    const emptyForm = () => {
        setUser(() => {
            return {
                    username: '',
                    password: ''
            }
        })
    }

    const onSubmit = e =>{
        e.preventDefault();
        AuthService.register(user).then(data=>{
            const {message} = data;
            setMessage(message);
        });
      }

    return (
        <div>    
            <ul>
            <li><a href="">Register</a></li>
            <li><a href="">Login</a></li>
            </ul>

            <form onSumbit={onSubmit}>
                <div class="register">

                <h1>Register</h1>

                <h2>Username:</h2>

                <input type="text" class="textboxclass" />

                <h2>Password:</h2>

                <input type="text" class="textboxclass" />
                </div>
            </form>

            {/* {message ? <Message message={message}/> : null} */}
        </div>
    )
}

export default Homepage;