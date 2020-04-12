import React from "react";
import "./PcDetailInfo.css";
import { Spinner, Progress, Button } from "reactstrap";
import { getFilteredTime, getFilteredDate, plus30minute } from "util/time";
const PcDetailInfo = ({
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

    const GetRamNotice = () => {
        if (ramData >= 90) {
            return (
                <div className="usage-over-90">
                    <p>PC가 뜨겁습니다!</p>
                </div>
            );
        } else if (ramData >= 70) {
            return (
                <div className="usage-over-70">
                    <p>누군가가 열심히 작업하고 있습니다</p>
                </div>
            );
        } else if (ramData >= 50) {
            return (
                <div className="usage-over-50">
                    <p>과제를 하고있나요?</p>
                </div>
            );
        } else if (ramData >= 30) {
            return (
                <div className="usage-over-30">
                    <p>그렇게 많은 전기세는 안나오겠군요</p>
                </div>
            );
        } else if (ramData >= 10) {
            return (
                <div className="usage-over-10">
                    <p>쓰고있는건가요?</p>
                </div>
            );
        } else {
            return (
                <div className="usage-over-0">
                    <p>정보가 없네요</p>
                </div>
            );
        }
    };

    const GetCpuNotice = () => {
        if (cpuData >= 90) {
            return (
                <div className="usage-over-90">
                    <p>PC가 뜨겁습니다!</p>
                </div>
            );
        } else if (cpuData >= 70) {
            return (
                <div className="usage-over-70">
                    <p>누군가가 열심히 작업하고 있습니다</p>
                </div>
            );
        } else if (cpuData >= 50) {
            return (
                <div className="usage-over-50">
                    <p>과제를 하고있나요?</p>
                </div>
            );
        } else if (cpuData >= 30) {
            return (
                <div className="usage-over-30">
                    <p>그렇게 많은 전기세는 안나오겠군요</p>
                </div>
            );
        } else if (cpuData >= 10) {
            return (
                <div className="usage-over-10">
                    <p>쓰고있는건가요?</p>
                </div>
            );
        } else {
            return (
                <div className="usage-over-0">
                    <p>정보가 없네요</p>
                </div>
            );
        }
    };
    return (
        <div className="PcDetailInfo">
            <div className="pc-detail-wrapper">
                <div className="collapse-item-wrapper">
                    <div className="collapse-item-box">
                        <div className="info-text-box">
                            <p>RAM 실시간 사용량</p>
                        </div>
                        <div className="value-text-box">
                            <span>{ramData}%</span>
                        </div>
                        <div className="data-progress-box">
                            <Progress value={ramData} />
                        </div>
                        <div>
                            <GetRamNotice />
                        </div>
                    </div>
                </div>

                <div className="collapse-item-wrapper">
                    <div className="collapse-item-box">
                        <div className="info-text-box">
                            <p>CPU 실시간 사용량</p>
                        </div>
                        <div className="value-text-box">
                            <span>{cpuData}%</span>
                        </div>
                        <div className="data-progress-box">
                            <Progress value={cpuData} />
                        </div>
                        <div>
                            <GetCpuNotice />
                        </div>
                    </div>
                </div>

                <div className="collapse-item-wrapper">
                    <div className="collapse-item-box">
                        <div className="info-text-box">
                            <p>PC 사용 시작 시간</p>
                        </div>
                        <div className="value-text-box">
                            <span>{getFilteredTime(startTime)}</span>
                        </div>
                    </div>
                </div>

                <div className="collapse-item-wrapper">
                    <div className="collapse-item-box">
                        <div className="info-text-box">
                            <p>PC 사용 종료 시간</p>
                        </div>
                        <div className="value-text-box">
                            <span>{getFilteredTime(endTime)}</span>
                        </div>
                    </div>
                </div>
                <ButtonState />
                <div className="collapse-item-wrapper">
                    <div className="collapse-item-box">
                        <div className="info-text-box">
                            <p>현재 서버와의 연결 로그</p>
                        </div>
                        <div className="value-text-box">
                            <span>{getFilteredTime(endTime)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default PcDetailInfo;
