import React, { Fragment,useEffect,useState } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {getMakesAction,getModelsAction} from '../store/actions/carsActions';
import {editUserAction} from '../store/actions/userActions';
import SideBar from './SideBar';
import {Link} from 'react-router-dom';
import { Container } from '@material-ui/core';
import { ClipLoader } from 'react-spinners';
import { css } from '@emotion/core';
import { getAdsAction,deleteAdAction } from '../store/actions/adsActions';
import { editAdAction } from '../store/actions/adsActions';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import { Grid } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles({
  root: {
    width: 300,
    height:320
  },
  media: {
    height: 180,
  },
  button: {
    // margin: theme.spacing(1),
  },
});

function UserList(props){
    const user =useSelector(state=>state.user.user);
    const [ads,updateAds] =useState([]);
    const allAds=useSelector(state=>state.ads.ads);
    const models=useSelector(state=>state.cars.models);    
    const [open, setOpen] = useState(false);
    const [like,updateLike]=useState(false);
    const dispatch=useDispatch();
    const [deleteId,updateDeleteId]=useState('') ; 
    const getAdverts=(user) =>dispatch(getAdsAction(user));    
    const deleteAd=(id) =>dispatch(deleteAdAction(id));
    const getModels=(make) =>dispatch(getModelsAction(make));    
    const editAd=(ad,id,token) =>dispatch(editAdAction(ad,id,token));
    const editUser=(user,id,token) =>dispatch(editUserAction(user,id,token));
    useEffect(()=>{
      //  console.log(user.email);
          if (props.location.state){
       
          getAdverts({user:props.location.state.userEmail});
          } 
          else{

           getAdverts({id:[1,2]});
          }
          
    },[])
   
 const classes = useStyles();

    const handleCloseYes = async(e) => {
        try {
     //   console.log(e);    
        await deleteAd(e);
        updateDeleteId(null);
       // setOpen(false);

        } catch (error) {
            console.log(error);
        }

     };

  //  console.log(ads);
 //  console.log(ads);
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
    
    updateLike(true);
   }

    return(
        <Fragment>
        <SideBar></SideBar>
        <Container className="Favorites-list">

        <h1>{props.location.state?`Adverts posted by ${props.location.state.userNickname}`:''}</h1>
        
       {allAds ?
        <div className="adsCardsGroup" >
            { allAds.length>0  ?
          
  
          allAds.map(ad=>
               
               <div className="column-Ads" key={ad._id}>
               <Link className="Link"   to={{
                           pathname: `/detail/${ad._id}` , 
                           state:{  
                              adId:ad._id,
                              fromSearch:"False"
                           //   models:models,
                           //   model:ad.model
                                                           
                           }}}
               >                   
               
               <Card className="column-Ads" className="{classes.root}">
                   <CardActionArea>
                   <CardMedia
                   className={classes.media}
                      image={"http://ec2-18-222-129-172.us-east-2.compute.amazonaws.com/images/" + ad.photo[0]}
                       title={ad.make+' '+ad.model}
                   />
                   <CardContent>

                   <Typography gutterBottom variant="h6" component="h4">
                       {ad.make+' '+ad.model + ' '+ad.year}
    
                   </Typography>
                   <Typography variant="body2" color="textSecondary" component="p">
                   {ad.reserved===true ? 'Reserved: yes':'Reserved: no '} {ad.active===true ? 'Sold: no':'Sold: yes'}
                   </Typography>
                   </CardContent>
                   </CardActionArea>
                   <CardActions>
               </CardActions>
               </Card>
               </Link>     
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
    )
}

export default UserList;
