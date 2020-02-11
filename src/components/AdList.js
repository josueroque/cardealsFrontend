import React, { Fragment,useEffect,useState } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {getMakesAction,getModelsAction} from '../store/actions/carsActions';
import Navbar from './Navbar';
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
        <Navbar></Navbar>
        <h2>Created Adverts</h2>
        <table className="table table-hover table-list">
            <thead>
                <tr className="table-primary">
                <th scope="col">Type</th>
                <th scope="col">Title</th>
                <th scope="col">Created at</th>
                <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
            { ads.length>0 ?
             ads.map(ad=> 
              
                <tr key={ad._id}>
                    <td>{ad.sell===true ?'Sell':'Buy'}</td>
                    <td>{ad.make+ad.model+ad.year}</td>
                    <td>{ad.createdAt}</td>
                    <td>
                    <button type="button" className="btn btn-warning btn-table">Edit</button>
                    <button type="button" className="btn btn-danger btn-table">Del</button>
                    </td>
                </tr> 
            
            )
                           
            :
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            }
            </tbody>
        </table> 
        </Fragment>
    )
}

export default AdList;
