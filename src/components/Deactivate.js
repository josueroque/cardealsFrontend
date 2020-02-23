import React, { Fragment,useEffect,useState } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import SideBar from './SideBar';
import {Link} from 'react-router-dom';
import { getAdsAction } from '../store/actions/adsActions';
import { Button,Container,Grid } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {deleteUserAction} from '../store/actions/userActions';
import {logoutUserAction} from '../store/actions/userActions';
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



function Deactivate(props){
    const dispatch=useDispatch();
    const user=useSelector(state=>state.user.user);
    const error=useSelector(state=>state.user.error);
    const getAdverts=(user) =>dispatch(getAdsAction(user)); 
    const ads =useSelector(state=>state.ads.ads);   
    const deleteUser=(user,id,token) =>dispatch(deleteUserAction(user,id,token));
    const logOut=(userRedux) =>dispatch(logoutUserAction(userRedux));
    
    const deleteThisUser=async(id)=>{
        try {
            await deleteUser(user,user.id,user.token);
            await logOut(user);
            props.history.push('/');
                  
        } catch (error) {
            console.log(error);            
        }
    }
    return(

       <Fragment>
        <SideBar></SideBar> 
        <Container className="Deactivate">
        </Container>
        <br/> <br/> 
        <div   >
            <Alert severity='warning'> 'Your account will permanent deleted and your adverts and all your activity will be lost!'</Alert>
        </div> 

        <br/> <br/>   
        <Grid container justify="center">
        <Button 
            className="centerButton"
            type="submit"
            variant="contained"
            color="primary"
            onClick={() => { if (window.confirm('Are you sure you wish to delete your account?')) deleteThisUser(user._id) } }
            >
            Deactivate  
        </Button>
        </Grid>
        </Fragment>

       
    )
}

export default Deactivate;