import React from "react";
import { Container } from "reactstrap";
import "./ClassItem.css";
const ClassItem = () => {
    const classId = "D404";
    const classOnCount = "3";
    const classOffCount = "44";
    return (
        <div className="ClassItem">
            <div className="class-item-wrapper">
                <div className="class-id-box-outer">
                    <div className="class-id-box-inner">{classId}</div>
                </div>
                <div className="class-update-log-outer">
                    <div className="class-update-log-inner">update : 2020-04-01-13-24-52</div>
                </div>

                <div className="class-power-status-wrapper">
                    <div className="class-on-box-outer">
                        <div className="class-on-inner">
                            <rect className="class-on-circle"></rect>
                            {classOnCount}
                        </div>
                    </div>
                    <div className="class-off-box-outer">
                        <div className="class-off-inner">
                            <rect className="class-off-circle"></rect>
                            {classOffCount}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClassItem;
