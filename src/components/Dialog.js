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

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


export default function Dialog(props){
    const user =useSelector(state=>state.user.user);
    const ads =useSelector(state=>state.ads.ads);
    const [open, setOpen] = useState(false);
    const dispatch=useDispatch();
    const [deleteId,updateDeleteId]=useState('');
    const getAdverts=(user) =>dispatch(getAdsAction(user));    
    const deleteAd=(id) =>dispatch(deleteAdAction(id));   

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
      
        setOpen(false);
    };

    const handleCloseYes = () => {
        try {
        console.log(props.id);    
     //   await deleteAd(e);
//        updateDeleteId(e);
        setOpen(false);

        } catch (error) {
            
        }

    };
return(
<div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open alert dialog
      </Button>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous location data to
            Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Agree {props.id}
          </Button>
        </DialogActions>
      </Dialog>
    </div>   

)
}