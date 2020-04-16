import React, { Fragment,useEffect,useState } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import SideBar from './SideBar';
import {Link} from 'react-router-dom';
import { Container } from '@material-ui/core';
import { getAdsAction,deleteAdAction } from '../store/actions/adsActions';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

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
 
    const allAds=useSelector(state=>state.ads.ads);
    const dispatch=useDispatch();
    const getAdverts=(user) =>dispatch(getAdsAction(user));    
    
    useEffect(()=>{

          if (props.location.state){
       
          getAdverts({user:props.location.state.userEmail});
          } 
          else{

           getAdverts({id:[1,2]});
          }
          
    },[])
   
 const classes = useStyles();

     return(
        <Fragment>
        <SideBar></SideBar>
        <Container className="ContainerUserList">

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
                                                           
                           }}}
               >                   
              <Card className="column-Ads" className="{classes.root}">
                   <CardActionArea>
                   <CardMedia
                   className={classes.media}
                      image={"https://carsdealshn.josueroque.com/images/" + ad.photo[0]}
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
