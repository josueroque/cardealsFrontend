import React, { Fragment,useEffect,useState } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {authUserAction} from '../store/actions/userActions';
import SideBar from './SideBar';
import {getMakesAction,getModelsAction} from '../store/actions/carsActions';
import { getAdsAction } from '../store/actions/adsActions';
import { Button,Container, FormGroup,Grid, Link } from '@material-ui/core';
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
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2), 
      },
    },
  }));

//prueba tabla
const useStyles1 = makeStyles(theme => ({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    },
  }));
  
  function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;
  
    const handleFirstPageButtonClick = event => {
      onChangePage(event, 0);
    };
  
    const handleBackButtonClick = event => {
      onChangePage(event, page - 1);
    };
  
    const handleNextButtonClick = event => {
      onChangePage(event, page + 1);
    };
  
    const handleLastPageButtonClick = event => {
      onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
  
    return (
      <div className={classes.root}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
  
  TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  };
  
  
  const useStyles2 = makeStyles({
    table: {
      minWidth: 500,
    },
  });


//prueba tabla
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
//prueba tabla
    const classes2 = useStyles2();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, ads.length - page * rowsPerPage);

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

//prueba tabla

    useEffect(()=>{
        getMakes();
        getAdverts({});
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
        
        <Container className="SearchResults">
        <TableContainer component={Paper}>
      <Table className={classes2.table} aria-label="custom pagination table">
        <TableBody>
          {(ads.length > 0
            ? ads.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : ads
          ).map(ad => (
           

            <TableRow key={ad._id} hover onClick={() => props.history.push('/detail/'+ad._id)} 
              state={ {adId:ad._id}}  >
              <TableCell>

              <img className="img-table" src={"http://ec2-18-222-129-172.us-east-2.compute.amazonaws.com:3000/images/" + ad.photo[0]} alt=""></img>
            
              </TableCell>
              
              <TableCell >
              {ad.make+' '+ad.model+' '+ad.year}
              </TableCell>
              <TableCell >
              {ad.transmition}
              </TableCell>
              <TableCell >
              {ad.city}
              </TableCell>
              <TableCell >
                {ad.currency} {ad.price}
              </TableCell>

 
    
             
              {/* <TableCell align="right"><img ></img></TableCell> */}
            </TableRow>

          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 10 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={ads.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>

        </Container>

       </Fragment>

       
    )
}

export default Search;