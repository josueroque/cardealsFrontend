import React, { Fragment,useEffect,useState } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {authUserAction} from '../store/actions/userActions';
import { Container } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { FormGroup } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import SideBar from'./SideBar';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  

function Login(props){

    const dispatch=useDispatch();
    const user=useSelector(state=>state.user.user);
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
            <SideBar></SideBar>
         
            

            <form
                     onSubmit={e=> {
                        e.preventDefault();
                           
                        const loginUser={
                                    email:email,
                                    password:password
                                    };
                                                             
                        const response=  authUser(loginUser);
                        //console.log(response);
                        
 

                    } 
                 }
            >
       


            <Container className="loginContainer">
                 <FormGroup>
                 <h1 >Sign In</h1>
                    <TextField type="email"
                                id="email"
                                aria-describedby="emailHelp"
                                placeholder="Enter your email"
                                onChange={e=>updateEmail(e.target.value)}
                                value={email} 
                                required
                />


                <TextField type="password"
                                id="passwordConfirmation" 
                                placeholder="Enter your Password"
                                onChange={e=>updatePassword(e.target.value)}
                                value={password}
                                required
                />
                </FormGroup>    
                <Grid container justify="center">
                    <Button className="centerButton" type="submit" variant="contained" color="primary">     Enter    </Button>
                </Grid>
                <Grid container justify="flex-end">
                     <Link   to={{
                            pathname: `/Reset`  
                            }}
                      > Forgot your password? </Link>         
                </Grid>

                <br />
                    { error===true && email && password ?         
                                                                                 
                        <div className= "alert alert-dismissible alert-danger"  >
                         
                         <Alert severity="error">Invalid user or password!</Alert>                                       
                            </div>
                        :''
                    }  
            </Container>

            </form>
        
        </Fragment>
        )
};

export default Login;