import React, { Fragment,useEffect,useState } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {getMakesAction,getModelsAction} from '../store/actions/carsActions';
import SideBar from './SideBar';
import {Link} from 'react-router-dom';
import { Container } from '@material-ui/core';
import { ClipLoader } from 'react-spinners';
import { css } from '@emotion/core';
import { getAdsAction,deleteAdAction } from '../store/actions/adsActions';
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
//import Dialog from '@material-ui/core/Dialog';
//import Dialog from './Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
const useStyles = makeStyles({
  root: {
    width: 300,
    height:320
  },
  media: {
    height: 200,
  },
  button: {
    // margin: theme.spacing(1),
  },
});

function AdList(props){
    const user =useSelector(state=>state.user.user);
    const ads =useSelector(state=>state.ads.ads);
    const [open, setOpen] = useState(false);
    const dispatch=useDispatch();
    const [deleteId,updateDeleteId]=useState('') ; 
    const getAdverts=(user) =>dispatch(getAdsAction(user));    
    const deleteAd=(id) =>dispatch(deleteAdAction(id));    
    // const theme = useTheme();
    // const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(()=>{
      //  console.log(user.email);
        getAdverts({user:user.email});
     //   console.log(ads);
    },[])
    

    useEffect(()=>{
        getAdverts({user:user.email});

    },[deleteId])
    
      

    const classes = useStyles();
    // const handleClickOpen = () => {
    //     setOpen(true);
    // };
    
    // const handleClose = () => {
      
    //     setOpen(false);
    // };

    const handleCloseYes = async(e) => {
        try {
        console.log(e);    
        await deleteAd(e);
        updateDeleteId(null);
       // setOpen(false);

        } catch (error) {
            
        }

     };
    console.log(ads);
  //  console.log(ads);
    return(
        <Fragment>
        <SideBar></SideBar>
        <Container className="Container-list">

        <h2>Created Adverts</h2>
        
       {ads ?
        <div className="adsCardsGroup" >
            { ads.length>0  ?
          
  
               ads.map(ad=>
               
               <div className="column-Ads" key={ad._id}>
               <Card  className={classes.root}>
                   <CardActionArea>
                   <CardMedia
                   className={classes.media}
                       image={"http://localhost:3001/images/" + ad.photo[0]}
                       title={ad.make+' '+ad.model}
                   />
                   <CardContent>

                   <Typography gutterBottom variant="h6" component="h4">
                       {ad.make+' '+ad.model + ' '+ad.year}
                   </Typography>
                       <Typography variant="body2" color="textSecondary" component="p">
                            {/* {ad._id}
                           {deleteId ?
                            <div className='delete-button' onClick={} />
                            :''} */}
                            </Typography>
                   </CardContent>
                   </CardActionArea>
                   <CardActions>
                   <Button
                            variant="contained"
                            size="small"
                            color="primary"
                            className={classes.button}
                            startIcon={<EditIcon />}
                        >
                            Edit
                    </Button> 
                    
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
