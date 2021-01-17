import react from 'react';

function Homepage() {

    return (
        <div>
                    
                    <ul>
                    <li><a href="">Register</a></li>
                    <li><a href="">Login</a></li>
                    </ul>

            <form>
            <div class="register">

            <h1>Register</h1>

            <h2>Username:</h2>

            <input type="text" class="textboxclass" />

            <h2>Password:</h2>

            <input type="text" class="textboxclass" />
            </div>

            </form>
        </div>
    )
}

export default Homepage;