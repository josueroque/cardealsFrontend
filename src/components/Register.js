import React, { Fragment,useEffect,useState } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {saveUserAction} from '../store/actions/userActions';
import Navbar from'./Navbar';
import Login from './Login';
import { ClipLoader } from 'react-spinners';
import { css } from '@emotion/core';

function Register(props){
    
    const [ loading,updateLoading]=useState(false); 
    const [ afterSave,updateAfterSave]=useState(false);
    const dispatch=useDispatch();
    const user=useSelector(state=>state.user);
    const error=useSelector(state=>state.user.error);
    const [messageHandler,updateHandler]=useState({});
    const [name,updateName] =useState('');
    const [nickname,updateNickname] =useState('');
    const [email,updateEmail] =useState('');
    const [password,updatePassword] =useState('');
    const [passwordConfirmation,updatePasswordConfirmation] =useState('');
    const saveUser=(newUser) =>dispatch(saveUserAction(newUser));

    // useEffect(()=>{
    //     if (error===true){
           
    //         updateAfterSave(true);
    //     }
    // },[error])

    const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    `;

    const wait=async(ms)=> {
        return new Promise(resolve => {
        setTimeout(resolve, ms);
        });
    }
    
    const saveNew=async(userData)=>{
        try {       
            
            updateLoading(true);
            saveUser(userData);
            await wait(1000);
            updateLoading(false);
            updateAfterSave(true);
            await wait(1000);
            updateLoading(false);
  
            // await wait(2000);
            // updateAfterSave(false);
            // props.history.push("/login");

        }
       
    
        catch (error) {
            console.log(error);
        }
    
    }  

    return(
        <Fragment>
            <Navbar></Navbar>
            <div className="container">
                <form
                    onSubmit={e=> {
                            e.preventDefault();
                            if (password===passwordConfirmation){    
                              updateLoading(true);
                              updateAfterSave(false);
                            const user={name:name,
                                        nickname:nickname,
                                        email:email,
                                        password:password
                                        };
                                                                 
                                saveNew(user);
                            }


                        } 
                     }
                >
                    <fieldset>
                        <h1>Register</h1>
                        {loading===true  ? 
                                    <h3 >Saving...</h3>
                                    :
                                    ''
                                }
                                <div className='sweet-loading'>
                                    <ClipLoader
                                    css={override}
                                    sizeUnit={"px"}
                                    size={150}
                                    color={'#123abc'}
                                    loading={loading}
                                    />
                                   
                                </div>    
                                   
                                    { afterSave===true ?         
                                                                                   
                                        <div className= {error===true? "alert alert-dismissible alert-danger":"alert alert-dismissible alert-success"}  >
                                            <button type="button" className="close" data-dismiss="alert">&times;</button>
                                            <strong>{error===true ? 'Error: please check your information and try again!':'You have been registered succefully!'}  </strong>                                         
                                        </div>
                                        :''
                                    }                                     
                                        
                                                                
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
                                 id="nickname" 
                                 placeholder="Type your nickname"
                                 onChange={e=>updateNickname(e.target.value)}
                                 value={nickname}
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
                        { password!==passwordConfirmation && passwordConfirmation !=='' ?         
                                                                                   
                            <div className= "alert alert-dismissible alert-danger"  >
                            <button type="button" className="close" data-dismiss="alert">&times;</button>
                            <strong> The passwords doesn't match!  </strong>                                         
                            </div>
                            :''
                         }                       
                       
                    </fieldset>
                    <div className="col text-center">
                    <button type="submit" className="btn btn-primary btn-lg">     Submit    </button>
                    </div>
                </form>   
            </div> 

        </Fragment>
    )
}

export default Register;