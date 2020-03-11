import React, { Fragment,useEffect,useState } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import SideBar from './SideBar';
import {Link} from 'react-router-dom';
import { getAdsAction } from '../store/actions/adsActions';
import Carousel from 'react-material-ui-carousel';
import Paper from '@material-ui/core/Paper';
import { Container } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';


function Home(props){
    const dispatch=useDispatch();
    const user=useSelector(state=>state.user.user);
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
                Latest adverts added
            </h1>
        <Carousel autoplay>
            { ads.length>0  ?
                ads.map(ad=>
               <Paper key={ad._id}>
               <Link className="Link"   to={{
                           pathname: `/detail/${ad._id}` , 
                           state:{  
                              adId:ad._id,
                              fromSearch:"False"
                                                         
                           }}}
               >                   
               <Card key={ad._id} className="column-Ads CardHome" >
                   <CardActionArea>
                   <CardMedia
                   className="CardMediaHome"
                       image={"http://ec2-3-15-65-154.us-east-2.compute.amazonaws.com/images/" + ad.photo[0]}
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

               </Paper>
                    
                    )
                
                :''
                                
                }

            </Carousel>
           </Container>
         </Container>
        </Fragment>

       
    )
}

export default Home;