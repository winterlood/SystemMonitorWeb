import React, { Redirect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import './Index.css';
import One from '../test/One';
import Two from '../test/Two';
const Index = () => {

    return (
        <React.Fragment>
            <div className="header-logo-box">
                <img src="/img/image_logo.png"></img>
            </div>
            <div className="header-link-box">
                <Link to="/total">TOTAL</Link>
            </div>
            <div className="header-link-box">
                <Link to="/two">CLASS</Link>
            </div>
            <div className="header-link-box">
                <Link to="/two">DEBUG</Link>
            </div>
        </React.Fragment>
    );
}

export default Index;