import React, { Fragment,useEffect,useState } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {saveRequestAction} from '../store/actions/userActions';
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
  

function ResetRequest(props){

    const dispatch=useDispatch();
    const error=useSelector(state=>state.user.error);
    const [email,updateEmail] =useState('');
    const [afterMessage,updateAfterMessage]=useState(false);    
    const saveReq=(request) =>dispatch(saveRequestAction(request));

    return(
        <Fragment>
            <SideBar></SideBar>
            

            <form
                     onSubmit={e=> {
                        e.preventDefault();
                        const response=  saveReq({email:email});
                        console.log(response);
                        updateAfterMessage(true); 
                    } 
                 }
            >
       


            <Container className="loginContainer">
                 <FormGroup>
                 <h1 >Request password reset</h1>
                    <TextField type="email"
                                id="email"
                                aria-describedby="emailHelp"
                                placeholder="Enter your email"
                                onChange={e=>updateEmail(e.target.value)}
                                value={email} 
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
                         
                         <Alert severity="success">Your request has been created!</Alert>                                       
                        </div>
                        :''
                    }  
            </Container>

            </form>
        
        </Fragment>
        )
};

export default ResetRequest;