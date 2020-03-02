import React,{Component} from 'react';
import "./index.css";
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import AdList from './components/AdList';
import NewAd from './components/NewAd';
import EditAd from './components/EditAd';
import Search from './components/Search';
import Detail from './components/Detail';
import Favorites from './components/Favorites';
import UserList from './components/UserList';
import Deactivate from './components/Deactivate';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


class App  extends Component {

  render(){ 
    return (

        <Router>
      
          <Switch>

            <Route exact path='/edit/:id' component={EditAd}  />
            <Route exact path='/detail/:id' component={Detail}  />
            <Route exact path='/Login' component={Login}  />
            <Route exact path='/Logout' component={Login}  />
            <Route exact path='/register' component={Register}  />
            <Route exact path='/CreateAd' component={NewAd}  />
            <Route exact path='/Viewlist' component={AdList}  />
            <Route exact path='/Userlist' component={UserList}  />
            <Route exact path='/Search' component={Search}  />
            <Route exact path='/Myfavorites' component={Favorites}  />
            <Route exact path='/Deactivateaccount' component={Deactivate}  />
            <Route exact path='/' component={Home}  />
          </Switch>
          
      </Router>
      
    );
  }
  }

export default App;
