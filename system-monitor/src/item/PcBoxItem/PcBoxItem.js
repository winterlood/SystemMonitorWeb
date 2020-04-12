import React from "react";
import "./PcBoxItem.css";

const PcBoxItem = ({ id, powerStatus, posR, toggle }) => {
    const PCStatusBox = () => {
        if (posR) {
            if (powerStatus === "ON" || powerStatus === "On") {
                return <div onClick={() => toggle(id)} className="pc-grid-item on"></div>;
            } else {
                return <div className="pc-grid-item off"></div>;
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
