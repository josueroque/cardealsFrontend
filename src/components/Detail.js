import React, { Fragment,useEffect,useState } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {getAdsAction} from '../store/actions/adsActions';
import {editUserAction} from '../store/actions/userActions';
import SideBar from './SideBar';
import { ClipLoader } from 'react-spinners';
import { css } from '@emotion/core';
import { Container } from '@material-ui/core';
import { FormGroup } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import {Link} from 'react-router-dom';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownAlt from '@material-ui/icons/ThumbDownAlt';
  


function Detail(props){
    const user =useSelector(state=>state.user.user);
    const ad=useSelector(state=>state.ads.ads[0]);
    const [like,updateLike]=useState(true);
    const [ loading,updateLoading]=useState(false); 
    const dispatch=useDispatch();
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

        getAdverts({id:props.location.state.adId});
       }
       else if (props.match.params.id){

        getAdverts({id:props.match.params.id});
       }
    },[])
   
 
    const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    `;
    
   
    const addFavorite=async(adId) =>{
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
      }
       
     await editUser({...user,favorites:favorites.favorites},user._id,user.token);
  
     updateLike(likeState);
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
                <h3 className="h3Detail">Type </h3>       
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
                <h3 className="h3Detail DetailValue ">{ ad? ad.description:''}</h3>        
            </div>     
            <div className="DetailField"> 
                <h3 className="h3Detail">Posted by</h3>
               {ad?
                <Link className="h3Detail DetailValue "  to={{
                           pathname: `/Userlist` , 
                           state:{  
                              userEmail:ad.user,
                              userNickname:ad.userNickname
                           }}}
                    >  
                    { ad? ad.userNickname:''}  
                    </Link>    
                    :''
                    }   
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
                        <img className="imgDetail" src={"https://carsdeals.netlify.app/images/" + actualAd} alt="">
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