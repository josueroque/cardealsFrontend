import React,{Component} from 'react';
import "./index.css";
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import AdList from './components/AdList';
import NewAd from './components/NewAd';
import EditAd from './components/EditAd';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App  extends Component {
  render(){ 
    return (

        <Router>
      
          <Switch>

            <Route exact path="/edit/:id" component={EditAd}  />
            <Route exact path='/Signin' component={Login}  />
            <Route exact path='/Signout' component={Login}  />
            <Route exact path='/register' component={Register}  />
            <Route exact path='/CreateAd' component={NewAd}  />
            <Route exact path='/Viewlist' component={AdList}  />
            <Route exact path='/' component={Home}  />
          </Switch>
          
      </Router>
     
    );
  }
  }

export default App;
