import React,{Component} from 'react';
import "./index.css";
import "bootswatch/dist/cerulean/bootstrap.min.css"; 
//import "../node_modules/jquery/dist/jquery.min.js";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import AdList from './components/AdList';
import NewAd from './components/NewAd';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


 
class App  extends Component {
  render(){ 
    return (
    
        <Router>
         
          <Switch>
            {/* <Route exact path="/country/:id"  component={Country}  /> */}
            <Route exact path='/login' component={Login}  />
            <Route exact path='/register' component={Register}  />
            <Route exact path='/' component={Home}  />
            <Route exact path='/NewAd' component={NewAd}  />
            <Route exact path='/AdList' component={AdList}  />
          </Switch>
         
      </Router>

    );
  }
  }

export default App;
