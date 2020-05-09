import React from "react";
import "./PcDetailInfo.css";
import { Spinner, Progress, Button } from "reactstrap";

const PcDetailInfo = ({
    nowSelectedPc,
    ramData,
    cpuData,
    nowOffButtonRunning,
    nowDelayButtonRunning,
    id,
    pcDelay,
    pcOffEvent,
    startTime,
    endTime,
}) => {
    const OffButtonState = () => {
        if (nowOffButtonRunning) {
            return (
                <div>
                    현재 서버와 통신중입니다....
                    <Spinner size="sm" color="secondary" />
                </div>
            );
        } else {
            return (
                <Button color="danger" id="offButton" onClick={() => pcOffEvent(id)}>
                    종료하기
                </Button>
            );
        }
    };

    const DelayButtonState = () => {
        if (nowDelayButtonRunning) {
            return (
                <div>
                    현재 서버와 통신중입니다....
                    <Spinner size="sm" color="secondary" />
                </div>
            );
        } else {
            return (
                <Button color="primary" id="offButton" onClick={() => pcDelay(id)}>
                    30분 연장하기
                </Button>
            );
        }
    };

    const ButtonState = () => {
        if (nowDelayButtonRunning || nowOffButtonRunning) {
            return (
                <div>
                    현재 서버와 통신중입니다....
                    <Spinner size="sm" color="secondary" />
                </div>
            );
        } else {
            return (
                <React.Fragment>
                    <div className="collapse-item-wrapper">
                        <DelayButtonState />
                    </div>
                    <div className="collapse-item-wrapper">
                        <OffButtonState />
                    </div>
                </React.Fragment>
            );
        }
    };

    return (
        <div className="PcDetailInfo">
            <div className="pc-detail-body">
                <div className="pc-detail-time-row">
                    <div class="pc-col-left">
                        <span id="item">{nowSelectedPc.endTime} &nbsp;</span>
                    </div>
                    <div class="pc-col-left">
                        <span id="notice">{nowSelectedPc.powerStatus === "ON" ? "종료예정" : "종료되었음"}&nbsp;</span>
                    </div>
                </div>
                <div className="pc-detail-usage-row">
                    <div className="pc-col-left">
                        <span id="notice">CPU사용량&nbsp;</span>
                    </div>
                    <div className="pc-col-right">
                        <span id="item">{nowSelectedPc.cpuData}%</span>
                    </div>
                </div>
                <Progress value={nowSelectedPc.cpuData} />

                <div className="pc-detail-usage-row">
                    <div className="pc-col-left">
                        <span id="notice">RAM사용량&nbsp;</span>
                    </div>
                    <div className="pc-col-right">
                        <span id="item">{nowSelectedPc.ramData}%</span>
                    </div>
                </div>
                <Progress value={nowSelectedPc.ramData} />
            </div>
        </div>
    );
};
export default PcDetailInfo;
