import React, { Fragment,useEffect,useState } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {saveUserAction} from '../store/actions/userActions';
import SideBar from'./SideBar';
import { ClipLoader } from 'react-spinners';
import { css } from '@emotion/core';
import { Container } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { FormGroup } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  
  const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2), 
      },
    },
  }));


function Register(props){
    
    const [ loading,updateLoading]=useState(false); 
    const [ afterSave,updateAfterSave]=useState(false);
    const [internalError,updateInternalError]=useState('');
    const dispatch=useDispatch();
    const error=useSelector(state=>state.user.error);
    const errorInfo=useSelector(state=>state.user.errorInfo);
    const [name,updateName] =useState('');
    const [nickname,updateNickname] =useState('');
    const [email,updateEmail] =useState('');
    const [password,updatePassword] =useState('');
    const [passwordConfirmation,updatePasswordConfirmation] =useState('');
    const saveUser=(newUser) =>dispatch(saveUserAction(newUser));

    useEffect(()=>{
        if (error===true && errorInfo){
            let err=errorInfo.substring(0,76);
           switch (err){
            case 'E11000 duplicate key error collection: Cardeals.users index: nickname_1 dup ':
                updateInternalError('Nickname already exists!')
                break;
            case 'E11000 duplicate key error collection: Cardeals.users index: email_1 dup key':
                updateInternalError('Email already exists!')
                break;

            default:
                updateInternalError('An error has ocurred if it persists please contact technical support');
                break;    
           }
                console.log(internalError);    
        }
    },[errorInfo])

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
  

        }
       
    
        catch (error) {
            console.log(error);
        }
    
    }  


    return(
        <Fragment>
            <SideBar className="SideBar"></SideBar>
            <Container border={0} className="Container-Register">
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
                                                                                   
                                        <div    >
                                               <Alert severity={error===true?'error':'success'  }>{error===true ? internalError:'You have been registered succefully!'}</Alert>  
                                        </div>
                                        :''
                                    }                                     
                                        
                                                                
                        <FormGroup>
                            <TextField type="text"
                                id="name" 
                                placeholder="Type your name" 
                                onChange={e=>updateName(e.target.value)}
                                value={name}
                                required />
                            <TextField type="text"
                                 className="form-control"
                                 id="nickname" 
                                 placeholder="Type your nickname"
                                 onChange={e=>updateNickname(e.target.value)}
                                 value={nickname}
                                 required />
                           <TextField type="text"
                                className="form-control"
                                id="email"
                                aria-describedby="emailHelp"
                                placeholder="Enter email"
                                onChange={e=>updateEmail(e.target.value)}
                                value={email} 
                                required/>
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                            {/* <label for="exampleInputPassword1">Password</label> */}
                            <TextField type="password"
                                 className="form-control"
                                 id="password" 
                                 placeholder="Password"
                                 onChange={e=>updatePassword(e.target.value)}
                                 value={password}
                                 required />
                            {/* <label for="exampleInputPassword1">Confirm your password</label> */}
                            <TextField type="password"
                                className="form-control"
                                id="passwordConfirmation" 
                                placeholder="Confirm your Password"
                                onChange={e=>updatePasswordConfirmation(e.target.value)}
                                value={passwordConfirmation}
                                required/>
                  
                        { password!==passwordConfirmation && passwordConfirmation !=='' ?         
                                                                                   
                            <div   >
                                         <Alert severity="warning">The passwords does not match!</Alert>
                            </div>
                            :''
                         }                       
                       
                       </FormGroup>
                    <Grid container justify="center">
                    <Button className="centerButton" type="submit" variant="contained" color="primary">     Submit    </Button>
                    </Grid>
                </form>   
            </Container> 

        </Fragment>
    )
}

export default Register;