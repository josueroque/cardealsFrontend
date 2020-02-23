import React, { Fragment,useEffect,useState } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import SideBar from './SideBar';
import {Link} from 'react-router-dom';
import { getAdsAction } from '../store/actions/adsActions';
import Carousel from 'react-material-ui-carousel';
import Paper from '@material-ui/core/Paper';
import { Button,Container } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
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
        
        </Fragment>

       
    )
}

export default Deactivate;