import React, { Fragment,useEffect,useState } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {authUserAction} from '../store/actions/userActions';
import Navbar from './Navbar';
function newAd(props){
    const dispatch=useDispatch();
    const user=useSelector(state=>state.user.user);
    const error=useSelector(state=>state.user.error);
    // if (error===true){
    //     props.history.push('/login');
    // }
    return(
        <Navbar></Navbar>
        

    )
}

export default newAd;