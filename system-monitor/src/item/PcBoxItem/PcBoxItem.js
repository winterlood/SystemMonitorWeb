import React from "react";
import "./PcBoxItem.css";

const PcBoxItem = ({ id, powerStatus, posR, handleToggleModal, ramData, cpuData, startTime, endTime, type }) => {
    const PCStatusBox = () => {
        if (type) {
            if (powerStatus === "ON" || powerStatus === "On") {
                return (
                    <div
                        onClick={() => handleToggleModal(id, cpuData, ramData, startTime, endTime)}
                        className="pc-grid-item on"
                    ></div>
                );
            } else {
                // return <div className="pc-grid-item off"></div>;
                return (
                    <div
                        onClick={() => handleToggleModal(id, cpuData, ramData, startTime, endTime)}
                        className="pc-grid-item off"
                    ></div>
                );
            }
        } else {
            return <div className="pc-grid-item no-pc"></div>;
        }
    };
    return (
        <React.Fragment>
            <div className="pc-grid-item-col">
                <PCStatusBox />
            </div>
        </React.Fragment>
    );
};

export default PcBoxItem;
