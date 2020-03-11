import React, { Fragment,useEffect,useState } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {resetPasswordAction} from '../store/actions/userActions';
import { Container } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { FormGroup } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import SideBar from'./SideBar';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  

function ResetPassword(props){

    const dispatch=useDispatch();
    const error=useSelector(state=>state.user.error);
    const [validationMessage,updateValidationMessage]=useState('');
    const [password1,updatePassword1] =useState('');
    const [password2,updatePassword2] =useState('');
    const [afterMessage,updateAfterMessage]=useState(false);    
    const changePass=(request) =>dispatch(resetPasswordAction(request));

    return(
        <Fragment>
            <SideBar></SideBar>
            <form
                     onSubmit={e=> {
                        e.preventDefault();
                        if (password1!==password2){
                            updateValidationMessage('Passwords does not match!')
                            return;
                        }
                        
                        let requestId =props.match.params.id;
                        const response=  changePass({password:password1,id:requestId});
                        updateValidationMessage('');
                        console.log(response);
                        updateAfterMessage(true); 
                    } 
                 }
            >
       

            <Container className="loginContainer">
                 <FormGroup>
                 <h1 >Change your password</h1>
                    <TextField type="password"
                                id="password1"
                                aria-describedby="emailHelp"
                                placeholder="Enter your new password"
                                onChange={e=>updatePassword1(e.target.value)}
                                value={password1} 
                                required
                    />

                    <TextField type="password"
                                id="password2"
                                aria-describedby="emailHelp"
                                placeholder="Confirm your password"
                                onChange={e=>updatePassword2(e.target.value)}
                                value={password2} 
                                required
                    />


                </FormGroup>    
            {!afterMessage?
                <Grid container justify="center">
                    <Button className="centerButton" type="submit" variant="contained" color="primary">     Send   </Button>
                </Grid>
            :''
            }    
                <br />
                    { afterMessage===true   ?        
                                                                                 
                        <div className= "alert alert-dismissible alert-danger"  >
                         
                         <Alert severity="success">Your password has been changed!</Alert>                                       
                        </div>
                        :''
                    }  
                    { validationMessage!==''   ?        
                                                                                 
                        <div className= "alert alert-dismissible alert-danger"  >
                         
                            <Alert severity="error">{validationMessage}</Alert>                                       
                        </div>
                        :''
                    }  

            </Container>

            </form>
        
        </Fragment>
        )
};

export default ResetPassword;