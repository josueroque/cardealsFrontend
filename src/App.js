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
            {/* <Route exact path="/country/:id"  component={Country}  /> */}
            <Route exact path="/edit/:id" component={EditAd}  />
            <Route exact path='/Sign in' component={Login}  />
            <Route exact path='/Sign out' component={Login}  />
            <Route exact path='/register' component={Register}  />
            <Route exact path='/' component={Home}  />
            <Route exact path='/Create Ad' component={NewAd}  />
            <Route exact path='/View list' component={AdList}  />
          </Switch>
         
      </Router>

    );
  }
  }

export default App;
