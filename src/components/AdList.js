import React, { Fragment,useEffect,useState } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {getMakesAction,getModelsAction} from '../store/actions/carsActions';
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
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

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

function AdList(props){
    const user =useSelector(state=>state.user.user);
    const ads =useSelector(state=>state.ads.ads);
    const models=useSelector(state=>state.cars.models);    
    const [open, setOpen] = useState(false);
    const dispatch=useDispatch();
    const [deleteId,updateDeleteId]=useState('') ; 
    const getAdverts=(user) =>dispatch(getAdsAction(user));    
    const deleteAd=(id) =>dispatch(deleteAdAction(id));
    const getModels=(make) =>dispatch(getModelsAction(make));    
    const editAd=(ad,id,token) =>dispatch(editAdAction(ad,id,token));

    useEffect(()=>{
      //  console.log(user.email);
        getAdverts({user:user.email});
     //   console.log(ads);
    },[])
    

    useEffect(()=>{
        getAdverts({user:user.email});

    },[deleteId])
         

    const classes = useStyles();

    const handleCloseYes = async(e) => {
        try {
        console.log(e);    
        await deleteAd(e);
        updateDeleteId(null);
       // setOpen(false);

        } catch (error) {
            console.log(error);
        }

     };

     const editAdvert=async(id,advert)=>{
       try {
         //console.log('prueba');

         await editAd(advert,id,user.token);
         updateDeleteId(id);
       } catch (error) {
         console.log(error);
       }
     }
  //  console.log(ads);
  //  console.log(ads);
    return(
        <Fragment>
        <SideBar></SideBar>
        <Container className="Container-list">

        <h1>My Adverts</h1>
        
       {ads ?
        <div className="adsCardsGroup" >
            { ads.length>0  ?
          
  
               ads.map(ad=>
               
               <div className="column-Ads" key={ad._id}>
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
                   <Link   to={{
                           pathname: `/edit/${ad._id}` , 
                           state:{  
                              adId:ad._id,
                           //   models:models,
                           //   model:ad.model
                                                           
                           }}}
                    >         
                   <Button
                            variant="contained"
                            size="small"
                            color="primary"
                            className={classes.button}
                            startIcon={<EditIcon />}
                            onClick={()=>getModels(ad.make)}
                        >
                            Edit
                    </Button> 
                    </Link>
                    {/* <Dialog id={deleteId} open={true} ></Dialog>  */}
                    
                   <Button
                            variant="contained"
                            size="small"
                            color="secondary"
                            className={classes.button}
                            startIcon={<DeleteIcon />}
                           // onClick={()=>updateDeleteId(ad._id)}
                         //  onClick={() => { updateDeleteId(ad._id)} }
                          
                          onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) handleCloseYes(ad._id) } }
                        >
                            Delete
                    
                    </Button>                   
                    <PopupState variant="popover" popupId="demo-popup-menu">
                        {popupState => (
                          <React.Fragment>
                            <Button variant="contained"  startIcon={<EditIcon />} size="small" color="default" {...bindTrigger(popupState)}>
                              SET
                            </Button>
                            <Menu {...bindMenu(popupState)}>
                              <MenuItem onClick={() => { popupState.close(); editAdvert(ad._id,{active:false});}}>Sold</MenuItem>
                              <MenuItem onClick={() => { popupState.close(); editAdvert(ad._id,{reserved:true});}}>Reserved</MenuItem>
                            </Menu>
                          </React.Fragment>
                        )}
                     </PopupState>
                    {/* <Dialog
                    id={ad._id}
                    open={deleteId?true:false}
                    ></Dialog> */}
                    
               </CardActions>
               </Card>
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

export default AdList;
