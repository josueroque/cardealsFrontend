import React, { Fragment,useEffect,useState } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {getMakesAction,getModelsAction} from '../store/actions/carsActions';
import {getAdsAction} from '../store/actions/adsActions';
import {editUserAction} from '../store/actions/userActions';
import SideBar from './SideBar';
import { ClipLoader } from 'react-spinners';
import { css } from '@emotion/core';
import { editAdAction } from '../store/actions/adsActions';
import { Container } from '@material-ui/core';
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
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import Menu from '@material-ui/core/Menu';
import {Link} from 'react-router-dom';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import DeleteIcon from '@material-ui/icons/Delete';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownAlt from '@material-ui/icons/ThumbDownAlt';
let fileObj = [];
let fileArray = [];
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  
  const useStyles = makeStyles({
    root: {
      width: 300,
      height:180
    },
    media: {
      height: 180,
    },
    button: {
      // margin: theme.spacing(1),
    },
  });

function Detail(props){
    const classes = useStyles();
    const user =useSelector(state=>state.user.user);
    const makes=useSelector(state=>state.cars.makes);
    const models=useSelector(state=>state.cars.models);
    const error=useSelector(state=>state.user.error);
    const ad=useSelector(state=>state.ads.ads[0]);
    const [make,updateMake]=useState(ad?ad.make:'');
    const [like,updateLike]=useState(true);
    const [model,updateModel]=useState('');
    const [type,updateType]=useState('');
    const [year,updateYear]=useState(ad?ad.year:'');
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
    const getAdverts=(id) =>dispatch(getAdsAction(id));   
    const editUser=(user,id,token) =>dispatch(editUserAction(user,id,token));
  //  console.log(props);
   useEffect(()=>{
   if (user.favorites){ 
    if (props.location.state){

        if(user.favorites.includes(props.location.state.adId)){
            updateLike(false);
        }
        else{
            updateLike(true);
        }
     }
     else if (props.match.params.id){
        if(user.favorites.includes(props.match.params.id)){
            updateLike(false);
        }
         else{
            updateLike(true);
         } 
     }
    }
    },[])


    useEffect(()=>{
        
      
     if (props.location.state){

     //    console.log(props.location.state.adId);
        getAdverts({id:props.location.state.adId});
       }
       else if (props.match.params.id){
     //   console.log(props.match.params.id);
        getAdverts({id:props.match.params.id});
       }
    },[])



    useEffect(()=>{
       // console.log(ad);
       if(ad){
        updateMake(ad.make);
        getModels(make);
//        updateModel(ad.model);
        updateYear(ad.year);
        updateTransmition(ad.transmition);
        //console.log(ad.sell);
        if (ad.sell===true) updateType('Sell') ;
        else updateType('Buy'); 
        updateAmount(ad.price);
        updateCurrency(ad.currency);
        updateDescription(ad.description);
        updatePhoto(ad.photo);
     }
    },[ad])
    
    
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
    
    const addFavorite=async(adId) =>{
     //   console.log(user.favorites);
     //   console.log(user);
        let favorites;
        let likeState;
      if (like===true){
        if (user.favorites){ 
            favorites={favorites:[...user.favorites,adId]};
            likeState=false;
        }
        else{
            favorites={favorites:[...[],adId]};
            likeState=false;
        }
      }
      else{
        favorites=user.favorites.filter(fav=>
            fav!==adId
        );
        favorites={favorites:favorites};
        likeState=true;
    //    console.log(favorites);
      }
       
//        await editUser({...user,favorites:[]},user._id,user.token);
     await editUser({...user,favorites:favorites.favorites},user._id,user.token);
  
     updateLike(likeState);
    }

   // console.log(props);

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
     

        <Container className="Container-Detail">
            <div>{props.state}</div>
        <form
        onSubmit={e=> {
                      e.preventDefault();
                  
                     }
                    }
                   
        >
        
        <h2 className="h2-Ad"> Advert Detail</h2>

        <FormGroup>

            <div className="DetailField"> 
                <h3 className="h3Detail">Make</h3>       
                <h3 className="h3Detail DetailValue">{ ad? ad.make:''}</h3>        
            </div>       
            <div className="DetailField"> 
                <h3 className="h3Detail">Model</h3>       
                <h3 className="h3Detail DetailValue">{ ad? ad.model:''}</h3>        
            </div> 
            <div className="DetailField"> 
                <h3 className="h3Detail">Type</h3>       
                <h3 className="h3Detail DetailValue">{ ad? ad.sell===true ?'Sell':'Buy':''}</h3>        
            </div>  
            <div className="DetailField"> 
                <h3 className="h3Detail">Year</h3>       
                <h3 className="h3Detail DetailValue">{ ad? ad.year:''}</h3>        
            </div>   
            <div className="DetailField"> 
                <h3 className="h3Detail">Price</h3>       
                <h3 className="h3Detail DetailValue">{ ad? ad.currency+' '+ad.price:''}</h3>        
            </div>   
            <div className="DetailField"> 
                <h3 className="h3Detail">Transmition</h3>       
                <h3 className="h3Detail DetailValue">{ ad? ad.transmition:''}</h3>        
            </div> 
            <div className="DetailField"> 
                <h3 className="h3Detail">Description</h3>       
                <h3 className="h3Detail DetailValue">{ ad? ad.description:''}</h3>        
            </div>                   
            <Grid >    
                    <Button
                            variant="contained"
                            size="small"
                            color="primary"
                            className="centerButton"
                            startIcon={like===true? <ThumbUpIcon />:<ThumbDownAlt/>}
                            onClick={()=>addFavorite(ad._id)}
                        >
                            {like===true?'Like':'Dislike'}
                    </Button> 
                    
                    
                </Grid>    
        </FormGroup>   
        </form>

        {ad ?
        <div className="imgDetailGroup" >
            { ad.photo.length>0  ?
          
  
               ad.photo.map(actualAd=>
               
               
               <div className="imgDetail" key={ad._id} className="{classes.root}">
                  <img className="imgDetail" src={"http://localhost:3001/images/" + actualAd} alt="">
                  </img>              
               </div>
        

               
               )
            
            :''
        
               
            }
        </div>
        :
        ''  
        }  

        </Container>  

        </Fragment>
    }   
       
       </Fragment>
    )
}

export default Detail;