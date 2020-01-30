import React, { Fragment,useEffect,useState } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {saveUserAction} from '../store/actions/userActions';
import Navbar from'./Navbar';


function Register(){
    
    const dispatch=useDispatch();
    const user=useSelector(state=>state.user.user);
    const [name,updateName] =useState('');
    const [surname,updateSurname] =useState('');
    const [email,updateEmail] =useState('');
    const [password,updatePassword] =useState('');
    const [passwordConfirmation,updatePasswordConfirmation] =useState('');
    const saveUser=(newUser) =>dispatch(saveUserAction(newUser));

    useEffect(()=>{
    },[])

    return(
        <Fragment>
            <Navbar></Navbar>
            <div className="container">
                <form
                    onSubmit={e=> {
                                
                            e.preventDefault();
                            //  updateLoading(true);
                            
                            const user={name:name,
                                        surname:surname,
                                        email:email,
                                        password:password
                                        };
                            saveUser(user);
                
                    
                        }   
                    } 
                >
                    <fieldset>
                        <h1>Register</h1>
                        <div className="form-group row">
                            {/* <label for="exampleInputEmail1">Email address</label> */}
                            <input type="text"
                                className="form-control"
                                id="name" 
                                placeholder="Type your name" 
                                onChange={e=>updateName(e.target.value)}
                                value={name}
                                required />
                            <input type="text"
                                 className="form-control"
                                 id="surname" 
                                 placeholder="Type your surname"
                                 onChange={e=>updateSurname(e.target.value)}
                                 value={surname}
                                 required />
                            <input type="email"
                                className="form-control"
                                id="email"
                                aria-describedby="emailHelp"
                                placeholder="Enter email"
                                onChange={e=>updateEmail(e.target.value)}
                                value={email} 
                                required/>
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                            {/* <label for="exampleInputPassword1">Password</label> */}
                            <input type="password"
                                 className="form-control"
                                 id="password" 
                                 placeholder="Password"
                                 onChange={e=>updatePassword(e.target.value)}
                                 value={password}
                                 required />
                            {/* <label for="exampleInputPassword1">Confirm your password</label> */}
                            <input type="password"
                                className="form-control"
                                id="passwordConfirmation" 
                                placeholder="Confirm your Password"
                                onChange={e=>updatePasswordConfirmation(e.target.value)}
                                value={passwordConfirmation}
                                required/>
                        </div>
                    </fieldset>
                    <div className="col text-center">
                    <button type="submit" class="btn btn-primary btn-lg">     Submit    </button>
                    </div>
                </form>   
            </div> 
        </Fragment>
    )
}

export default Register;