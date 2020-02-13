import React, { Fragment,useEffect,useState } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {getMakesAction,getModelsAction} from '../store/actions/carsActions';
import SideBar from './SideBar';
import MultipleImageUpload from './MultipleImageUpload';
import { ClipLoader } from 'react-spinners';
import { css } from '@emotion/core';
import { saveAdAction } from '../store/actions/adsActions';
import { Container } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { FormGroup } from '@material-ui/core';
import { Button } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { Snackbar } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MuiAlert from '@material-ui/lab/Alert';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

let fileObj = [];
let fileArray = [];
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

function NewAd(props){
    const classes = useStyles();
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
    const [file,updateFile]=useState( [null]);
    const [ loading,updateLoading]=useState(false); 
    const [ afterSave,updateAfterSave]=useState(false);
    const dispatch=useDispatch();
    const getMakes=() =>dispatch(getMakesAction());
    const getModels=(make) =>dispatch(getModelsAction(make));
    const saveAd=(ad,token,files) =>dispatch(saveAdAction(ad,token,files));
   
    useEffect(()=>{
        getMakes();
        fileObj = [];
        fileArray = [];
    },[])

    useEffect(()=>{
        getModels(make);
    },[make])

    useEffect(()=>{
        updateFile(file );
    },[file])

    let years=[];
    for (let i=2020;i>1920;i--){
        years.push(i);
    }
    
    
    const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    `;
    
   const uploadMultipleFiles=(e)=> {
 //  console.log(e.target);
        fileObj.push(e.target.files);
        for (let i = 0; i < fileObj[0].length; i++) {
            fileArray.push(URL.createObjectURL(fileObj[0][i]));
        }
        updateFile(fileArray );
    }
    
    const wait=async(ms)=> {
        return new Promise(resolve => {
        setTimeout(resolve, ms);
        });
    }
    
    const saveNew=async(advert)=>{
        // try {       
            
            updateLoading(true);
            console.log(fileObj);
            saveAd(advert,user.token,fileObj);
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

    //console.log(fileObj);

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
     

        <Container className="Container">
     
        <form
        onSubmit={e=> {
                      e.preventDefault();
                      console.log(file);                      
                      updateLoading(true);
                    //   fileObj.map(file=>
                    //     updatePhoto(...photo, file.name)
                    //   );
                     
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
                        photo:photo,
                        user:user.email
                        }
                      let Ad=new FormData();
                      //Ad=createdAd;
                      console.log(file);
                   //   Ad.append('photo',file);
//                      Ad.append('photo[1]',file[1]);
                      console.log(file[0]);      
                      console.log(fileObj[0].length);      


                      for(let i=0 ;i<fileObj[0].length;i++){
                        Ad.append('photos',fileObj[0][i]);

                      }
                      Ad.append('photo',[]);
                      Ad.append('make',createdAd.make);
                      Ad.append('model',createdAd.model);
                      Ad.append('description',createdAd.description);
                      Ad.append('year',createdAd.year);    
                      Ad.append('type',createdAd.type);
                      Ad.append('transmition',createdAd.transmition);
                      Ad.append('price',createdAd.price);
                      Ad.append('country',createdAd.country);
                      Ad.append('city',createdAd.city)
                      Ad.append('user',user.email);
                      saveNew(Ad);
                  
                     }
                    }
                   
        >
        
        <h2 className="h2-Ad"> New Advert </h2>

        <FormGroup>

            <FormControl className={classes.formControl}> 
            <InputLabel id="demo-simple-select-label">Make</InputLabel>       
                <Select 
                name="make"
                onChange={e=>updateMake(e.target.value)}
                value={make}
                 required
                >
                    <MenuItem key="default">---Select a make---</MenuItem>
                {makes ? makes.map( make=>
                    <MenuItem key={make.name} value={make.name} >{make.name}</MenuItem>
                ):''}   
                </Select>
             </FormControl>       
             <FormControl className={classes.formControl}> 
             <InputLabel id="demo-simple-select-label">Model</InputLabel>              
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
              </FormControl>
              <FormControl>
                  <InputLabel id="demo-simple-select-label">Model</InputLabel>              
                    <Select  className="form-control"
                    
                    name="type"
                    onChange={e=>updateType(e.target.value)}
                    value={type}
                    required
                >
                    <MenuItem key={'default'} value="default" >---Select type of advert---</MenuItem>
                    <MenuItem key={'Sell'} value="sell" >Sell</MenuItem>
                    <MenuItem key={'Buy'} value="buy" >Buy</MenuItem>
                </Select>
                </FormControl>                    
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
                      onChange={e=>updateAmount(e.target.value)}
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
            {/* <input type="file" multiple value={afterSave===false? photo:''} accept="image/*" onChange={e=>updatePhoto(e.target.value)} className="form-control-file" id="photo" aria-describedby="fileHelp"></input>
            <small id="fileHelp" className="form-text text-muted">Select a photo</small> */}
            
            <div className="form-group multi-preview">
                    {(fileArray || []).map(url => (
                        <img className="img-preview" key={url} src={url} alt="..." />
                    ))}
            </div>

            <div className="form-group">
                    <input type="file"  accept="image/*" className="form-control" onChange={uploadMultipleFiles} multiple />
            </div>
            
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

export default NewAd;