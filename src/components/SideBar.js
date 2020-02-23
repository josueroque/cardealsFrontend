import React,{Fragment} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {logoutUserAction} from '../store/actions/userActions';
import clsx from 'clsx';
import {Link} from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import LockOpen from '@material-ui/icons/LockOpen';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Search from '@material-ui/icons/Search';
import Info from '@material-ui/icons/Info';
import AssignmentInd from '@material-ui/icons/AssignmentInd';
import Button from '@material-ui/core/Button';
const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function Sidebar() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const dispatch=useDispatch(); 
  const user=useSelector(state=>state.user.user);
  const logOut=(userRedux) =>dispatch(logoutUserAction(userRedux));


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const selectIcon=(action)=>{

        switch  (action){
            case 'Sign in': 
                return '<LockOpen />';
            case 'Register': 
                return '<AssignmentInd />';
            case 'Search':
                return '<Search />';
            case 'About':
                return '<Info />';
            case 'Sign out':
                return '<ExitToApp />';
            default: 
                return '';    
        }
  }
  return (
    <Fragment>
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
   

         
        <Toolbar>

         

          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
            
          </IconButton>
          <Link to={ {pathname: `/`}} className="Link" >  
          <Typography variant="h6" noWrap>
            Cardeals
          </Typography>
          </Link>
        
         <Button color="inherit" className="RightMenu">Sign in</Button> 
         <Button color="inherit" >Register</Button>
         <Link to={ {pathname: `/Search`}} className="Link" >           
            <Button color="inherit" >Search</Button> 
         </Link>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {[`${!user.token ? 'Sign in':'Sign out'}`, 'Register', 'Search', 'About'].map((text, index) => (
          
          <Link key ={text} to={ {pathname: `/${text.replace(/\s/g,'')}`}}  className="Link-menu"  onClick={text==='Sign out' ?  ()=>logOut(user) :()=>{}}>  
           <ListItem button  >
              <ListItemIcon key ={text}>  {text==='Sign in' && <LockOpen></LockOpen> ||
                               text==='Sign out' && <ExitToApp></ExitToApp> || 
                               text==='Register' && <AssignmentInd></AssignmentInd> ||
                               text==='Search' && <Search></Search> ||
                               text==='About' && <Info></Info> 
                             

              } 
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
             </Link> 
          ))}
        </List>
        
        <Divider />
        {user.token ?    
        <List>

          {['Create ad', 'View list','My favorites','Deactivate account'].map((text, index) => (
         <Link key={text} to={ {pathname: `/${text.replace(/\s/g,'')}`}}  className="Link-menu" >           
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon/> :  <ExitToApp/>}</ListItemIcon>
              <ListItemText primary={text}/>
            </ListItem>
            </Link>
          ))}
        </List>
                  :''
        }
      </Drawer>

    </div>
     
      <h5>
        {user.token? 'Welcome '+ user.nickname:''}
      </h5>
   
    </Fragment>
  );
}
