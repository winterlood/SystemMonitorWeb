import React, { useState, useEffect } from "react";
import ScrollButton from "../ScrollButton/ScrollButton";
import { Container, Spinner, Alert } from "reactstrap";
import "./TotalPc.css";
import ClickableText from "../ClickableText/ClickableText";

import { GET, GET_TOTAL_PCS } from "services/rest";

//items
import PcItem from "item/PcListItem/PcListItem";

const smallPaddingStyle = {
    padding: "5px",
};

const TotalPc = ({ isPolling, handlePolling }) => {
    const [onPcs, setOnPcs] = useState(null);
    const [offPcs, setOffPcs] = useState(null);

    ///////////////////////////////////////////////////////////////////
    //                                                               //
    //          AJAX                                                 //
    const getPcs = async () => {
        const data = await GET(GET_TOTAL_PCS);
        if (data !== null) {
            var pcsData = data.pcs;

            const filterOn = pcsData.filter((it) => it.powerStatus === "ON" || it.powerStatus === "On");
            setOnPcs(filterOn.map((item) => <PcItem {...item} />));

            const filterOff = pcsData.filter((it) => it.powerStatus === "OFF" || it.powerStatus === "Off");
            setOffPcs(filterOff.map((item) => <PcItem {...item} />));
        } else {
            alert("Error!");
        }
    };
    //                                                              //
    //                                                              //
    //////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////
    //                                                               //
    //          LIFE CYCLE                                           //

    useEffect(() => {
        getPcs();
    }, [1]);

    useEffect(() => {
        if (isPolling) {
            const intervals = setInterval(() => {
                getPcs();
            }, 30000);
            return () => clearInterval(intervals);
        } else {
            console.log("Polling is stopped");
        }
    }, [isPolling]);

    //                                                              //
    //                                                              //
    //////////////////////////////////////////////////////////////////

    const RenderPollingState = () => {
        if (isPolling) {
            return (
                <Alert style={smallPaddingStyle} color="success">
                    <div className="polling-state-wrapper">
                        <div className="text-box">실시간 업데이트 중입니다</div>
                        <div className="spinner-box">
                            <Spinner size="sm" color="secondary" />
                        </div>
                    </div>
                </Alert>
            );
        } else {
            return (
                <Alert style={smallPaddingStyle} color="secondary">
                    <div className="polling-state-wrapper">
                        <div className="text-box">실시간 업데이트가 중지되었습니다.</div>
                        <div className="spinner-box">
                            <ClickableText handlePolling={handlePolling} text={"다시켜기"} />
                        </div>
                    </div>
                </Alert>
            );
        }
    };

    return (
        <React.Fragment>
            <ScrollButton scrollStepInPx="50" delayInMs="16.66" />
            <Container>
                <div>
                    <RenderPollingState />
                </div>
            </Container>
            <Container>
                {onPcs}
                {offPcs}
            </Container>
        </React.Fragment>
    );
};

export default TotalPc;
