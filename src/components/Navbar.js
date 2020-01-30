import React, { Fragment,useEffect,useState } from 'react';
import {Link} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import Login from './Login';

function Navbar(){
    return(
        <Fragment>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <Link to={ {pathname: `/`}} > 
                <a className ="navbar-brand" href="">CarDeals</a>
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarColor01">
                <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                <Link to={ {pathname: `/login`}} > 
                    <a className="nav-link" href="">Sign in<span className="sr-only">(current)</span></a>
                </Link>  
                </li>
                <li className="nav-item">
                <Link to={ {pathname: `/Register`}} > 
                    <a className="nav-link" href="">Register</a>
                </Link>    
                </li>
                <li className="nav-item">
                <Link to={ {pathname: `/Register`}} > 
                    <a className="nav-link" href="">Search</a>
                </Link>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">About</a>
                </li>
                </ul>
                {/* <form className="form-inline my-2 my-lg-0">
                <input className="form-control mr-sm-2" type="text" placeholder="Search" />
                <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
                </form> */}
            </div>
            </nav>    
 </Fragment>
    )
}

export default Navbar;