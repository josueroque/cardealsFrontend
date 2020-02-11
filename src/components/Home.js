import React, { Fragment,useEffect,useState } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {authUserAction} from '../store/actions/userActions';
import SideBar from './SideBar';
function Home(props){
    const dispatch=useDispatch();
    const user=useSelector(state=>state.user.user);
    const error=useSelector(state=>state.user.error);
    // if (error===true){
    //     props.history.push('/login');
    // }
    return(
        <SideBar></SideBar>
        
    )
}

export default Home;