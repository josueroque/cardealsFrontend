import React, { Fragment,useEffect,useState } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {getMakesAction,getModelsAction} from '../store/actions/carsActions';
import {getAdsAction} from '../store/actions/adsActions';
import SideBar from './SideBar';
import { ClipLoader } from 'react-spinners';
import { css } from '@emotion/core';
import { editAdAction } from '../store/actions/adsActions';
import { Container } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { FormGroup } from '@material-ui/core';
import { Button } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MuiAlert from '@material-ui/lab/Alert';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

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

function EditAd(props){
    const classes = useStyles();
    const user =useSelector(state=>state.user.user);
    const makes=useSelector(state=>state.cars.makes);
    const models=useSelector(state=>state.cars.models);
    const error=useSelector(state=>state.user.error);
    const ad=useSelector(state=>state.ads.ads[0]);
    const [make,updateMake]=useState(ad?ad.make:'');
    const [model,updateModel]=useState('');
    const [type,updateType]=useState('');
    const [year,updateYear]=useState(ad?ad.year:'');
    const [currency,updateCurrency]=useState('');
    const [amount,updateAmount]=useState('');
    const [description,updateDescription]=useState('');
    const [transmition,updateTransmition]=useState('');
    const [fieldsChanged,updateFieldsChanged]=useState('');
    const [ loading,updateLoading]=useState(false); 
    const [ afterSave,updateAfterSave]=useState(false);
    const dispatch=useDispatch();
    const getMakes=() =>dispatch(getMakesAction());
    const getModels=(make) =>dispatch(getModelsAction(make));
    const getAdverts=(id) =>dispatch(getAdsAction(id));   
    const editAd=(ad,id,token) =>dispatch(editAdAction(ad,id,token));
   
    useEffect(()=>{
        getMakes();
        if(props.location.state) {
        getAdverts({id:props.location.state.adId});
        }

    },[])

    useEffect(()=>{
       if(ad){
        updateMake(ad.make);
        getModels(make);
        updateYear(ad.year);
        updateTransmition(ad.transmition);
            if  (ad.sell===true) updateType('Sell') ;
            else updateType('Buy'); 
        updateAmount(ad.price);
        updateCurrency(ad.currency);
        updateDescription(ad.description);
     }
    },[ad])


    useEffect(()=>{
       if (ad) updateModel(ad.model );
    },[models])

    let years=[];
    for (let i=2020;i>1920;i--){
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
    
    const editAdvert=async(advert)=>{
         try {       
            
            updateLoading(true);
            editAd(advert,props.location.state.adId,user.token);
            await wait(1000);
            updateLoading(false);
            updateAfterSave(true);
            await wait(1000);
            updateLoading(false);
  
        }
       
        catch (error) {
            console.log(loading);
            console.log(error);
        }
    
    }  
    
    return(
       <Fragment>
        <SideBar></SideBar>            
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
     

        <Container className="Container-Create">
            <div>{props.state}</div>
        <form
        onSubmit={e=> {
                      e.preventDefault();
                      updateLoading(true);

                     let amountChanged=fieldsChanged==='amount'?true:false;
                      let createdAd={
                        make,
                        model,
                        description,
                        year,    
                        type,
                        transmition,
                        price:amount,
                        currency:currency,
                        country:'Honduras',
                        city:'Tergucigalpa',
                        amountChanged:amountChanged,
                        user:user.email

                        }
                
                      editAdvert(createdAd);
                  
                     }
                    }
                   
        >

        <h2 className="h2-Ad"> Edit Advert </h2>

        <FormGroup>

            <FormControl className={classes.formControl}> 
            <InputLabel id="demo-simple-select-label">Make</InputLabel>       
                <Select 
                name="make"
                onChange={e=>updateMake(e.target.value)}
                value={make}
                 required
                >
                    <MenuItem key="default">---Select a make--- </MenuItem>
                {makes ? makes.map( make=>
                    <MenuItem key={make.name} value={make.name} >{make.name}</MenuItem>
                ):''}   
                </Select>
             </FormControl>       
             <FormControl className={classes.formControl}> 
             <InputLabel id="demo-simple-select-label">Model</InputLabel>              
        {models.length>0 ?
                <Select 
                name="model"
                onChange={e=>updateModel(e.target.value)}
                value={model}
                 required

                >
                    <MenuItem key="default">---Select a model---</MenuItem>
                {models.length>0 ? models.map( model=>
                    <MenuItem key={model.name} value={model.name} >{model.name}</MenuItem>
                ):''}   
                </Select>
                :
                ''
            }                
              </FormControl>
              <FormControl>
                  <InputLabel id="demo-simple-select-label">Type</InputLabel>              
                    <Select  className="form-control"
                    
                    name="type"
                    onChange={e=>updateType(e.target.value)}
                    value={type}
                    required
                >
                    <MenuItem key={'default'} value="default" >---Select type of advert---</MenuItem>
                    <MenuItem key={'Sell'} value="Sell" >Sell</MenuItem>
                    <MenuItem key={'Buy'} value="Buy" >Buy</MenuItem>
                </Select>
                </FormControl>    
                <FormControl>
                  <InputLabel id="demo-simple-select-label">Year</InputLabel>                                   
                <Select  className="form-control"
                    
                    name="year"
                    onChange={e=>updateYear(e.target.value)}
                    value={year}
                    required
                >

                    <MenuItem key={'default'} value="default" >---Select year---</MenuItem>
                    {years.map(year=>
                            <MenuItem key={year} value={year}>{year} </MenuItem>
                        )

                    }
                </Select>    
                </FormControl>
                <Select  className="form-control"
                    
                    name="transmition"
                    onChange={e=>updateTransmition(e.target.value)}
                    value={transmition}
                    required
                >
                    <MenuItem key={'default'} value="default" >---Select type of transmition---</MenuItem>
                    <MenuItem key={'Sell'} value="manual" >Manual</MenuItem>
                    <MenuItem key={'Buy'} value="automatic" >Automatic</MenuItem>
                </Select>                     
                <div className="currencyGroup" >
                <Select   className="currency column"
                    
                    name="currency"
                    onChange={e=>updateCurrency(e.target.value)}
                    value={currency}
                    required
                >
                <MenuItem className="column" key={'default'} value="default" >---Select currency---</MenuItem>
                            <MenuItem key="$" value="$"> $ </MenuItem>
                            <MenuItem key="L" value="L"> L </MenuItem>
                </Select>
                
                <TextField className="amount column"
                      type="number" 
                      placeholder="Amount" 
                      id="amount"
                      value={amount}
                      onChange={(e) => {updateAmount(e.target.value);updateFieldsChanged('amount')}}
                      required
                />
                </div>
                <TextField className="form-control "
                      placeholder="Description" 
                      id="description"
                      value={description}
                      onChange={e=>updateDescription(e.target.value)}
                      required
                      multiline
                      rows="3"
                />
            
            {afterSave===true ?
                <div   >
                    <Alert severity={error===true?'warning':'success'}>{error===true ? 'An error occured, please check your data':'Advert saved succefully!'}</Alert>

                </div>            
            :
            <Grid container justify="center">
            <Button className="centerButton" type="submit" variant="contained" color="primary">    Save   </Button>
            </Grid>

            }
                                   
            </FormGroup>   
        </form>
        </Container>  
         </Fragment>
    }   
       
       </Fragment>
    )
}

export default EditAd;