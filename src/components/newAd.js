import React, { Fragment,useEffect,useState } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {getMakesAction,getModelsAction} from '../store/actions/carsActions';
import Navbar from './Navbar';
import MultipleImageUpload from './MultipleImageUpload';
import { ClipLoader } from 'react-spinners';
import { css } from '@emotion/core';
import { saveAdAction } from '../store/actions/adsActions';

function NewAd(props){
    const user =useSelector(state=>state.user.user);
    const makes=useSelector(state=>state.cars.makes);
    const models=useSelector(state=>state.cars.models);
    const error=useSelector(state=>state.user.error);
    const [make,updateMake]=useState('');
    const [model,updateModel]=useState('');
    const [type,updateType]=useState('');
    const [year,updateYear]=useState('');
    const [currency,updateCurrency]=useState('');
    const [amount,updateAmount]=useState('');
    const [description,updateDescription]=useState('');
    const [transmition,updateTransmition]=useState('');
    const [photo,updatePhoto]=useState('');
    const [ loading,updateLoading]=useState(false); 
    const [ afterSave,updateAfterSave]=useState(false);
    const dispatch=useDispatch();
    const getMakes=() =>dispatch(getMakesAction());
    const getModels=(make) =>dispatch(getModelsAction(make));
    const saveAd=(ad,token) =>dispatch(saveAdAction(ad,token));
   
    useEffect(()=>{
        getMakes();
    },[])

    useEffect(()=>{
        getModels(make);
    },[make])

    let years=[];
    for (let i=1920;i<2020;i++){
        years.push(i);
    }

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
    
    const saveNew=async(advert)=>{
        // try {       
            
            updateLoading(true);

            saveAd(advert,user.token);
            await wait(1000);
            updateLoading(false);
            updateAfterSave(true);
            await wait(1000);
            updateLoading(false);
  
        // }
       
    
        // catch (error) {
        //     console.log(loading);
        //     console.log(error);
        // }
    
    }  
console.log(afterSave);
console.log(photo);


    return(
       <Fragment>
        <Navbar></Navbar>            
            {loading===true ?
                <Fragment> 
                <h3 >Guardando...</h3>
                <div className='sweet-loading'>
                    <ClipLoader
                    css={override}
                    sizeUnit={"px"}
                    size={150}
                    color={'#123abc'}
                    loading={loading}
                    />
                                   
                </div> 
                </Fragment>
        :          
        <Fragment>
        <h2> New Advert </h2>

        <div className="container container-Ad">
     
        <form
        onSubmit={e=> {
                      e.preventDefault();
                      updateLoading(true);
                      let createdAd={
                        make,
                        model,
                        description,
                        year,    
                        type,
                        transmition,
                        price:{currency,amount},
                        country:'Honduras',
                        city:'Tergucigalpa',
                        photo

                        }
                      saveNew(createdAd);
                  
                     }
                    }
                   
        >
        <div className="row col-md-6 form-group form-group-Ad">

                     
                <select 
                className="form-control"
                name="make"
                onChange={e=>updateMake(e.target.value)}
                value={make}
                 required
                >
                    <option key="default">---Select a make---</option>
                {makes ? makes.map( make=>
                    <option key={make.name} value={make.name} >{make.name}</option>
                ):''}   
                </select>
   

                <select className="form-control"
                name="model"
                onChange={e=>updateModel(e.target.value)}
                value={model}
                 required

                >
                    <option key="default">---Select a model---</option>
                {models.length>0 ? models.map( model=>
                    <option key={model.name} value={model.name} >{model.name}</option>
                ):''}   
                </select>
              
                <select  className="form-control"
                    
                    name="type"
                    onChange={e=>updateType(e.target.value)}
                    value={type}
                    required
                >
                    <option key={'default'} value="default" >---Select type of advert---</option>
                    <option key={'Sell'} value="sell" >Sell</option>
                    <option key={'Buy'} value="buy" >Buy</option>
                </select>
                    
                <select  className="form-control"
                    
                    name="year"
                    onChange={e=>updateYear(e.target.value)}
                    value={year}
                    required
                >
                    <option key={'default'} value="default" >---Select year---</option>
                    {years.map(year=>
                            <option key={year} value={year}>{year} </option>
                        )

                    }
                </select>    
                
                <select  className="form-control"
                    
                    name="transmition"
                    onChange={e=>updateTransmition(e.target.value)}
                    value={transmition}
                    required
                >
                    <option key={'default'} value="default" >---Select type of transmition---</option>
                    <option key={'Sell'} value="manual" >Manual</option>
                    <option key={'Buy'} value="automatic" >Automatic</option>
                </select>                    
                
                <select  className="form-control col-md-4 "
                    
                    name="currency"
                    onChange={e=>updateCurrency(e.target.value)}
                    value={currency}
                    required
                >
                    <option key={'default'} value="default" >---Select currency---</option>
                            <option key="$" value="$"> $ </option>
                            <option key="L" value="L"> L </option>
                </select>
                
                <input className="form-control col-md-4 inputAmount"
                      type="text" 
                      placeholder="Amount" 
                      id="amount"
                      value={amount}
                      onChange={e=>updateAmount(e.target.value)}
                      required
                />

                <textarea className="form-control "
                      placeholder="Description" 
                      id="description"
                      value={description}
                      onChange={e=>updateDescription(e.target.value)}
                      required
                />
            {/* <input type="file" multiple value={afterSave===false? photo:''} accept="image/*" onChange={e=>updatePhoto(e.target.value)} className="form-control-file" id="photo" aria-describedby="fileHelp"></input>
            <small id="fileHelp" className="form-text text-muted">Select a photo</small> */}
            
            <MultipleImageUpload></MultipleImageUpload>
            <input type="submit" className="btn btn-primary btn-lg btn-block btn-Ad" value="Save"/> 
                                   
            </div>   
        </form>
        </div>  
         </Fragment>
    }   
       
       </Fragment>
    )
}

export default NewAd;