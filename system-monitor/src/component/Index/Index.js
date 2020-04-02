import React, { Redirect , useState, useContext} from 'react';
import { Link } from 'react-router-dom';
import './Index.css';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import PollingContext from '../../context/PollingContext';
const Index = ({setIsPolling}) => {
    const {isPolling} = useContext(PollingContext);

    const handlePolling = () =>{
          
    }

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
            <div>
            <FormControlLabel
          checked={isPolling}
          onChange={handlePolling}
          onClick={handlePolling}
          control={<Switch color="primary" />}
          label="POLLING"
          labelPlacement="start"
        />
            </div>
        </React.Fragment>
    );
}

export default Index;