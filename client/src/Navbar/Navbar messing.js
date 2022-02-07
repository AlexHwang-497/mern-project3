import React, { useState, useEffect } from 'react';
import { AppBar,Divider, Typography, Toolbar, Avatar, Button, Container } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import CustomizedDialogs from '../Components/Portfolio/Dialog';
import memories from '../images/memories.png';
import memoriesLogo from '../images/memoriesLogo.png';
import napkin from '../images/napkin.jpg'
import napkinsIcon from '../images/napkinsIcon.jpg'
import memoriesText from '../images/memoriesText.png';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
// import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import NoteTwoToneIcon from '@material-ui/icons/NoteTwoTone';
import BorderColorTwoToneIcon from '@material-ui/icons//BorderColorTwoTone';
// import StickyNote2TwoToneIcon from '@material-ui/icons/StickyNote2TwoTone';
// import AddTaskIcon from '@material/icons-material/AddTask';
// import AddTaskIcon from '@material-ui/icons/AddTaskIcon';
// '@material-ui/icons/Visibility';
// import * as actionType from '../../constants/actionTypes';
import useStyles from './styles';
import CreatePortfolio from '../Components/Portfolio/Dialog';


const Navbar = () =>{
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    console.log('[Navbar.user',user)

    const dispatch = useDispatch();
    // *we utilize this to deal with the change in our URL from '/auth' to '/'
      //* this will also help give us our google user icon as well in the navBar 
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();

  const logout = () => {
      dispatch({ type: 'LOGOUT' });
  
      history.push('/auth');
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
      <AppBar className={classes.appBar} position="static" color="inherit" style={{ background: '#091F3C' }}>
      
        <Link to="/" className={classes.brandContainer}>
          <Typography><img className={classes.image} src={napkinsIcon} alt="icon" height="75px" /></Typography>
          
        
          <Container align="">
            <Toolbar  className={classes.toolbar}>
              {user?.result ? (
                <div className={classes.profile}>
                  <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>
                  {user?.result.name.charAt(0)}
                  </Avatar>
                  <Typography  className={classes.userName} variant="h6">{user?.result.name}</Typography>
                  
                  <Typography className={classes.userName} variant="h6"><CreatePortfolio/></Typography>
                  {/* <Button  className={classes.logout} ><CreatePortfolio/></Button> */}
                  <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                </div>
              ) : (
                <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
              )}
            </Toolbar>
        </Container>
        </Link> 
    </AppBar>
    )
  }
  
  export default Navbar