import React from 'react';
import { Link } from 'react-router-dom';
import './Index.css';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
const Index = ({isPolling,handlePolling}) => {
 

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
          control={<Switch color="primary" />}
          label="POLLING"
          labelPlacement="start"
        />
            </div>
        </React.Fragment>
    );
}

export default Index;