import React, { Fragment,useEffect,useState } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {authUserAction} from '../store/actions/userActions';
import SideBar from './SideBar';
import {getMakesAction,getModelsAction} from '../store/actions/carsActions';
import { getAdsAction } from '../store/actions/adsActions';
import Carousel from 'react-material-ui-carousel';
import Paper from '@material-ui/core/Paper';
import { Button,Container, FormGroup,Grid } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2), 
      },
    },
  }));

function Search(props){
    const classes = useStyles();
    const dispatch=useDispatch();
    const user=useSelector(state=>state.user.user);
    const error=useSelector(state=>state.user.error);
    const makes=useSelector(state=>state.cars.makes);
    const models=useSelector(state=>state.cars.models);
    const [amountFrom,updateAmountFrom]=useState('');
    const [amountTo,updateAmountTo]=useState('');
    const [make,updateMake]=useState('');
    const [model,updateModel]=useState('');
    const [description,updateDescription]=useState('');
    const ads =useSelector(state=>state.ads.ads);   
    const getMakes=() =>dispatch(getMakesAction());
    const getModels=(make) =>dispatch(getModelsAction(make));
    const getAdverts=(user) =>dispatch(getAdsAction(user));    
    useEffect(()=>{
        getMakes();
        
    },[])
    useEffect(()=>{
         

         getModels(make);

     },[make])
    return(

       <Fragment>
        <SideBar></SideBar> 
        <Container className="Container-Search">
        <h1>Search</h1>    
         <form
                    onSubmit={e=> {
                        e.preventDefault();
                        let filter;
                        if (make){
                             filter={make:make};   
                        }
                        if(model){
                             filter={...filter,model:model }
                        }
                        if(amountFrom && amountTo){ 
                            filter={...filter,amountFrom:amountFrom,amountTo:amountTo }
                        }
                       console.log(filter);    
                       getAdverts(filter);
                       console.log(ads);
                       }
                      }
                     
          
  
         >
         <FormGroup>
         <FormControl className={classes.formControl}> 
            <InputLabel id="demo-simple-select-label">Make</InputLabel>       
                <Select 
                name="make"
                onChange={e=>updateMake(e.target.value)}
                value={make}
                
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

          <FormControl className="currencyGroupSearch">
    
      
          <TextField className="amount-Search "
                      type="number" 
                      placeholder="Price from" 
                      id="amount"
                      value={amountFrom}
                      onChange={e=>updateAmountFrom(e.target.value)}
                      
                />
            </FormControl>   
            <FormControl>
            <TextField className="amount-Search "
                      type="number" 
                      placeholder="Price until" 
                      id="amount"
                      value={amountTo}
                      onChange={e=>updateAmountTo(e.target.value)}
                      
                />
            </FormControl>
            {/* <FormControl>
          
            <TextField className="form-control "
                      placeholder="Description" 
                      id="description"
                      value={description}
                      onChange={e=>updateDescription(e.target.value)}
                      
                      multiline
                      rows="3"
                />    
            </FormControl>        */}

         </FormGroup>
         <Grid container justify="center">
            <Button className="centerButton" type="submit" variant="contained" color="primary">    Go!   </Button>

          </Grid>
         </form>

        </Container>
       </Fragment>

       
    )
}

export default Search;