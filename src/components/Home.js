import React, { Fragment,useEffect,useState } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {authUserAction} from '../store/actions/userActions';
import SideBar from './SideBar';
import {Link} from 'react-router-dom';
import { getAdsAction } from '../store/actions/adsActions';
import Carousel from 'react-material-ui-carousel';
import Paper from '@material-ui/core/Paper';
import { Button,Container } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';

function Home(props){
    const dispatch=useDispatch();
    const user=useSelector(state=>state.user.user);
    const error=useSelector(state=>state.user.error);
    const getAdverts=(user) =>dispatch(getAdsAction(user)); 
    const ads =useSelector(state=>state.ads.ads);   
    useEffect(()=>{
        getAdverts({user:user.email,limit:5})
    },[])

    return(

       <Fragment>
        <SideBar></SideBar> 
        <Container className="Container-Home">
        <Container className="Container-Carousel">
            <h1>
                Lastest adverts added
            </h1>
        <Carousel autoplay>
                    { ads.length>0  ?
                    
            
                    ads.map(ad=>
               <Paper>
               <Link className="Link"   to={{
                           pathname: `/detail/${ad._id}` , 
                           state:{  
                              adId:ad._id,
                              fromSearch:"False"
                           //   models:models,
                           //   model:ad.model
                                                           
                           }}}
               >                   
               <Card className="column-Ads CardHome" >
                   <CardActionArea>
                   <CardMedia
                   className="CardMediaHome"
                       image={"http://ec2-18-222-129-172.us-east-2.compute.amazonaws.com:3000/images/" + ad.photo[0]}
                       title={'See more details'}
                   />
                   <CardContent>
                      <Typography gutterBottom variant="h6" component="h4">
                        {ad.make+' '+ad.model + ' '+ad.year}
                      </Typography>

                        <Typography variant="body2" color="textSecondary" component="p">
                        {/* {ad.description} */}
                        </Typography>
                        </CardContent>
                   </CardActionArea>

                </Card>   
                </Link>
                        {/* <Button className="CheckButton">
                            Check it out!
                        </Button> */}
               </Paper>
                    
                    )
                
                :''
            
                    
                }

        </Carousel>
        </Container>
        <Container className="Container-Home">
         {/* <h1>Search</h1> */}

        </Container>
        </Container>
        </Fragment>

       
    )
}

export default Home;