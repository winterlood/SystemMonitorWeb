import React from 'react';
import './PcItem.css';
const PcItem = ({id,powerStatus,ramData,cpuData}) => {
    return(
        <React.Fragment>
            <div className="pc-item-wrapper">
                <div className="id-box">
                    <p>{id}</p>
                </div>
                <p>{powerStatus}</p>
                <p>{ramData}</p>
                <p>{cpuData}</p>
            </div>
        </React.Fragment>
    );
}

export default PcItem;