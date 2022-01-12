import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import CustomizedDialogs from '../Components/Portfolio/Dialog';
import memories from '../images/memories.png';
import memoriesLogo from '../images/memoriesLogo.png';
import napkin from '../images/napkin.jpg'
import napkinsIcon from '../images/napkinsIcon.jpg'
import memoriesText from '../images/memoriesText.png';
// import * as actionType from '../../constants/actionTypes';
import useStyles from './styles';


const Navbar = () =>{
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    // console.log('this is the user from navbar.js',user)

    const dispatch = useDispatch();
    // *we utilize this to deal with the change in our URL from '/auth' to '/'
      //* this will also help give us our google user icon as well in the navBar 
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();

  const logout = () => {
      dispatch({ type: 'LOGOUT' });
  
      history.push('/');
      // history.push('/auth');
  
      setUser(null);
    };

    // *this allows us to get our userId from authetentication
      // *in addition, this will allow our logout button to pop up so we don't have to refresh
    useEffect(() => {
        // *we are checking if the token exists
        const token = user?.token;
        
        setUser(JSON.parse(localStorage.getItem('profile')));
        if (token) {
          const decodedToken = decode(token);
    
          if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }
    
      }, [location]);




    
    
    return(
      <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to="/" className={classes.brandContainer}>
        {/* <img component={Link} to="/" src={'memoriesText'} alt="icon" height="45px" /> */}
        <img className={classes.image} src={napkinsIcon} alt="icon" height="100px" />
        
      </Link>
      <Toolbar className={classes.toolbar}>
        <CustomizedDialogs/>
        {user?.result ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
            <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
        )}
      </Toolbar>
    
    </AppBar>
    )
  }
  
  export default Navbar