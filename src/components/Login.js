import React, { Fragment } from 'react';
import Navbar from './Navbar';
function Login(){
    
    return(
        <Fragment>
            <Navbar></Navbar>
            <h2>Login Form</h2>

            <form action="/action_page.php" method="post" className="login">
            <div className="imgcontainer">
                <img src="https://www.w3schools.com/howto/img_avatar2.png" alt="Avatar" className="avatar" />
            </div>

            <div className="container">
                <label for="uname"><b>Username</b></label>
                <input type="text" placeholder="Enter Username" name="uname" required />

                <label for="psw"><b>Password</b></label>
                <input type="password"  placeholder="Enter Password" name="psw" required />
                    
                <button type="submit" className="login">Login</button>
                <label>
                <input type="checkbox" checked="checked" name="remember" /> Remember me
                </label>
            </div>

            {/* <div className="container" >
                <button type="button" className="cancelbtn">Cancel</button>
                <span className="psw">Forgot <a href="#">password?</a></span>
            </div> */}
            </form>
                
        </Fragment>
        )
};

export default Login;