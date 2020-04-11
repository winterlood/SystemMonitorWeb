import React from "react";
import { Container } from "reactstrap";
import "./ClassItem.css";
const ClassItem = () => {
    return (
        <div className="ClassItem">
            <div className="class-item-wrapper">
                <div className="class-main"></div>
                <div className="class-side">
                    <div className="class-go-to-box">></div>
                </div>
            </div>
        </div>
    );
};

export default ClassItem;
