import React from "react";
import { Link } from "react-router-dom";
import "./ClassItem.css";
const ClassItem = ({ id, type }) => {
    const classId = id;
    const classOnCount = "3";
    const classOffCount = "44";
    const updateTime = "2020-04-01-13-24-52";
    return (
        <Link to={"/class/" + classId}>
            <div className="ClassItem">
                <div className="class-item-wrapper">
                    <div className="class-id-box-outer">
                        <div className="class-id-box-inner">{classId}</div>
                    </div>
                    <div className="class-update-log-outer">
                        <div className="class-update-log-inner">{updateTime}</div>
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
        </Link>
    );
};

export default ClassItem;
