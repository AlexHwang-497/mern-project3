import React from 'react'
import {Container} from '@material-ui/core'
// *this will allow us to use LINK
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import FetchStockPrice from './StockData/FetchStockPrices';

import useStyles from './styles' 
import Navbar from './Navbar/Navbar';
import Home from '../src/Home/Home';
import Auth from './Auth/Auth';
import PostDetails from './Components/PostDetails/PostDetails';
import TreasuryRates from './StockData/TreasuryRates';
import CreatePortfolio from './Components/Portfolio/CreatePortfolioForm';
import { useSelector } from "react-redux";
import CustomizedDialogs from './Components/Portfolio/Dialog';
import BasicTabs from './Components/PostDetails/PostDetailsTabs';
import './index.css'



import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';



const theme = createMuiTheme({
    typography: {
        fontFamily: [
            'Chilanka',
            'cursive',
        ].join(','),
    },});
    // *<Grow>; provides simple animation
    //*<Container maxWidth='xl'></Container>; changing this to xL will give us more posts on our page
    // *<Route path="/" exact component={() => <Redirect to="/posts" />} />; what the redirect does here is, it is going to redirect us to '/posts'
    const App = () => {
    // const { authData } = useSelector((state) => state);
    const {authData} = useSelector((state) => state.auth);
    const ids = authData?._id
    console.log('[App.authData',authData)
    console.log('[App._id',ids)
    const user = JSON.parse(localStorage.getItem('profile'));
    console.log('[App.user',user)
    return (
        <BrowserRouter>
            <Container maxWidth=''>
                <Navbar/>
                {/* <Switch>
                    <Route path="/" exact component={() => (!user ? <Auth /> : <Home />)} />
                    
                    <Route path="/posts" exact component={Home} />
                    <Route path="/posts" exact component={() => (user ? <Home /> : <Redirect to="/auth" />)} />
                    <Route path="/posts/search" exact component={Home} />
                    <Route path="/posts/:id" exact component={BasicTabs} />
                    <Route path="/portfolio/:id" exact component={BasicTabs} />
                    <Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to="/posts" />)} />
                </Switch> */}

                <Switch>
                    <Route path="/" exact component={() => (!user ? <Auth /> : <Redirect to="/posts" />)} />
                    
                    <Route path="/posts" exact component={Home} />
                    <Route path="/posts/search" exact component={Home} />
                    <Route path="/posts/:id" exact component={BasicTabs} />
                    <Route path="/portfolio/:id" exact component={BasicTabs} />
                    <Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to="/posts" />)} />
                </Switch>
                {/* <Route path="/posts" exact component={() => (user ? <Home /> : <Redirect to="/auth" />)} /> */}
                
                
            </Container>
        </BrowserRouter>
    )
}
export default App