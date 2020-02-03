import React, { Fragment,useEffect,useState } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {authUserAction} from '../store/actions/userActions';
import Navbar from'./Navbar';

function Login(props){

    const dispatch=useDispatch();
    const user=useSelector(state=>state.user.user);
    const errorInfo=useSelector(state=>state.user.errorInfo);
    const error=useSelector(state=>state.user.error);
    const [email,updateEmail] =useState('');
    const [password,updatePassword] =useState('');
    const authUser=(newUser) =>dispatch(authUserAction(newUser));
    
    useEffect(()=>{
        if (user.token && error===false){
            
            props.history.push("/");
            
        }

    },[user])

    return(
        <Fragment>
            <Navbar></Navbar>
            <h2 className="login">Login Form</h2>

            <form
                     onSubmit={e=> {
                        e.preventDefault();
                           
                        const loginUser={
                                    email:email,
                                    password:password
                                    };
                                                             
                        const response=  authUser(loginUser);
                   //     props.history.push("/");

                            console.log(response);
                        


                    } 
                 }
            >
       
            
            <div className="imgcontainer">
                <img src="https://www.w3schools.com/howto/img_avatar2.png" alt="Avatar" className="avatar" />
            </div>

            <div className="container container-login">
             
                <input type="email"
                                className="form-control"
                                id="email"
                                aria-describedby="emailHelp"
                                placeholder="Enter your email"
                                onChange={e=>updateEmail(e.target.value)}
                                value={email} 
                                required
                />


                <input type="password"
                                className="form-control"
                                id="passwordConfirmation" 
                                placeholder="Enter your Password"
                                onChange={e=>updatePassword(e.target.value)}
                                value={password}
                                required
                />
                    
                <div className="col text-center">
                    <button type="submit" className="btn btn-primary btn-lg login">     Log in Now    </button>
                </div>
                <br />
                    { error===true && email && password ?         
                                                                                 
                        <div className= "alert alert-dismissible alert-danger"  >
                         
                            <button type="button" className="close" data-dismiss="alert">&times;</button>
                            <strong> Invalid user or password! </strong>                                         
                            </div>
                        :''
                    }  
                </div>


            </form>
                
        </Fragment>
        )
};

export default Login;