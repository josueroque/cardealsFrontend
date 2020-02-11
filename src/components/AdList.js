import React, { Fragment,useEffect,useState } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {getMakesAction,getModelsAction} from '../store/actions/carsActions';
import SideBar from './SideBar';
import { Container } from '@material-ui/core';
import { ClipLoader } from 'react-spinners';
import { css } from '@emotion/core';
import { getAdsAction } from '../store/actions/adsActions';

function AdList(){
    const user =useSelector(state=>state.user.user);
    const ads =useSelector(state=>state.ads.ads);
    const dispatch=useDispatch();
    const getAdverts=(user) =>dispatch(getAdsAction(user));    

    useEffect(()=>{
        console.log(user.email);
        getAdverts({user:user.email});
        console.log(ads);
    },[])
       console.log(ads.length);
    return(
        <Fragment>
        <SideBar></SideBar>
        <Container className="Container">
            <h2>Created Adverts</h2>
        </Container>
        </Fragment>
    )
}

export default AdList;
