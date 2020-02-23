import React, { Fragment,useEffect,useState } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import SideBar from './SideBar';
import {Link} from 'react-router-dom';
import { getAdsAction } from '../store/actions/adsActions';
import { Button,Container,Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

function Deactivate(props){
    const dispatch=useDispatch();
    const user=useSelector(state=>state.user.user);
    const error=useSelector(state=>state.user.error);
    const getAdverts=(user) =>dispatch(getAdsAction(user)); 
    const ads =useSelector(state=>state.ads.ads);   
    useEffect(()=>{
        getAdverts({user:user.email,limit:5})
    },[])

    return(

       <Fragment>
        <SideBar></SideBar> 
        <Container className="Deactivate">
        </Container>
        <Grid container justify="center">
        <Button className="centerButton" type="submit" variant="contained" color="primary">    Save   </Button>
        </Grid>
        </Fragment>

       
    )
}

export default Deactivate;