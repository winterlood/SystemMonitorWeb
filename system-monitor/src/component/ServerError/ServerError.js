import React from "react";
import "./ServerError.css";
const ServerError = (props) => {
    const { response } = props;
    return (
        <div className="ServerError">
            <div className="error-header">서버에 에러가 발생하였습니다</div>
            <div className="error-item">
                <span id="error-label">ERROR CODE : </span>
                <span id="error-value"> {response.status}</span>
            </div>
            <div className="error-item">
                <span id="error-label">ERROR TIMESTAMP : </span>
                <span id="error-value"> {response.timestamp}</span>
            </div>
            <div className="error-item">
                <span id="error-label">ERROR MESSAGE : </span>
                <span id="error-value"> {response.message}</span>
            </div>
        </div>
    );
};

export default ServerError;
