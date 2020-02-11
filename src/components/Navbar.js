import React, { Fragment,useEffect,useState } from 'react';
import {Link} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import {logoutUserAction} from '../store/actions/userActions';

function Navbar(){
    const dispatch=useDispatch(); 
    const user=useSelector(state=>state.user.user);
    const logOut=(userRedux) =>dispatch(logoutUserAction(userRedux));

    return(
        <Fragment>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        
            <Link to={ {pathname: `/`}} className ="navbar-brand" > 
                  Cardeals
            </Link>
                 
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarColor01">
                <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                
                    <div>
                    <Link to={ {pathname: `/login`}} className="nav-link"  onClick={user.token ? ()=>logOut(user) :()=>{}}  >     
                    {!user.token ?    
                        'Sign in'
                    :
                       'Sing out'
                
                    } 
                    <span className="sr-only">(current)</span>
                    </Link> 
                    </div>
                
                </li>

                <li className="nav-item">
    
                   
                    <Link to={ {pathname: `/Register`}}  className="nav-link"> Register </Link>  
                    
                
                
                </li>
                <li className="nav-item">
                
                    <a className="nav-link" href="">Search</a>
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
              
            {user.token ? 
                <h5>User: {user.name} {user.nickname} </h5>
                : ''
            }
 </Fragment>
    )
}

export default Navbar;