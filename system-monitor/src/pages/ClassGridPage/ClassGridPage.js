import React, { useState, useEffect } from "react";
import { Alert, Container, Button, Modal, ModalHeader, ModalBody, ModalFooter, Spinner } from "reactstrap";
import "./ClassGridPage.css";
import PcBoxItem from "item/PcBoxItem/PcBoxItem";

import PcModal from "module/PcModal/PcModal";
import { getFilteredDate, plus30minute } from "util/time";
import axios from "axios";

import Loading from "component/Loading/Loading";

const ClassGridPage = ({ isPolling, location, ShowNotification, createNotification }) => {
    const [classId, setClassId] = useState(location.pathname.split("/")[2]);
    const [modal, setModal] = useState(false);
    const [nowSelectedId, setNowSelectedId] = useState();
    const [nowSelectedPc, setNowSelectedPc] = useState({});
    const [grid, setGrid] = useState(Loading);
    const [onPcs, setOnPcs] = useState();
    const [onCount, setOnCount] = useState();
    const [offCount, setOffCount] = useState();
    const toggle = () => setModal(!modal);
    const handleToggleModal = (id, cpuData, ramData, startTime, endTime) => {
        setNowSelectedId(id);
        setNowSelectedPc({
            id: id,
            cpuData: cpuData,
            ramData: ramData,
            startTime: startTime,
            endTime: endTime,
        });
        toggle();
    };

    const getGridData = () => {
        axios
            .get("http://13.125.208.19/mobile/class/" + classId)
            .then((response) => {
                const pcsToArray = response.data.pcs.flat();
                const nowOnPcs = pcsToArray.filter((it) => it.powerStatus === "ON" || it.powerStatus === "On");
                const nowOffPcs = pcsToArray.filter(
                    (it) => (it.powerStatus === "OFF" || it.powerStatus === "Off") && it.type === "PC"
                );
                setOnCount(nowOnPcs.length);
                setOffCount(nowOffPcs.length);
                setOnPcs(nowOnPcs);
                const resres = response.data.pcs.map((item, index) => {
                    const now = item.map((cur) => {
                        return (
                            <PcBoxItem
                                key={cur.id}
                                handleToggleModal={handleToggleModal}
                                id={cur.id}
                                powerStatus={cur.powerStatus}
                                posR={cur.posR}
                                ramData={cur.ramData}
                                cpuData={cur.cpuData}
                                endTime={cur.endTime}
                                startTime={cur.startTime}
                                endTime={cur.endTime}
                                type={cur.type}
                            />
                        );
                    });
                    return (
                        <div key={"none"} className="pc-grid-row-wrapper">
                            <div className="pc-grid-item-row">{now}</div>
                        </div>
                    );
                });
                console.log(resres);
                setGrid(resres);
                return resres;
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    const pcOffEvent = (id, sendTime) => {
        let url = "http://13.125.208.19/mobile/pc/" + id + "/power/" + sendTime + "/";
        axios
            .post(
                url,
                { id: id, endTime: sendTime, powerStatus: "OFF" },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((response) => {})
            .catch((error) => {});
    };
    const OffAllPc = () => {
        let today = new Date();
        var sendTime = getFilteredDate(today);
        for (var i = 0; i < onPcs.length; i++) {
            pcOffEvent(onPcs[i].id, sendTime);
            console.log(onPcs[i].id);
        }
        if (onPcs.length === 0) {
            document.getElementById("warnPcAllOff").click();
        } else {
            document.getElementById("infoAllPcOff").click();
        }
    };

    useEffect(() => {
        if (isPolling) {
            const intervals = setInterval(() => {
                console.log("polling ~/mobile/class/" + classId);
                getGridData();
            }, 5000);
            return () => clearInterval(intervals);
        } else {
            console.log("Polling is stopped");
        }
    }, [isPolling]);
    useEffect(() => {
        getGridData();
    }, [1]);
    return (
        <React.Fragment>
            <PcModal
                createNotification={createNotification}
                nowSelectedPc={nowSelectedPc}
                modal={modal}
                toggle={toggle}
                ShowNotification={ShowNotification}
            />

            {/* 세로모드일 때 표시될 화면 */}
            <Container className="ClassGridPage portrait_only">
                <Alert color="dark" className="portrait_only">
                    화면을 가로모드로 전환하세요!
                </Alert>
                <div>{classId}</div>
                <div className="control-row">
                    <span id="offCount">OFF : {offCount}</span>&nbsp;&nbsp;&nbsp;
                    <span id="onCount">ON : {onCount}</span>&nbsp;&nbsp;
                    <span id="allPcOffButton" onClick={OffAllPc}>
                        OFF ALL
                    </span>
                    {/* <Button color="danger" onClick={OffAllPc}>
                        모든 PC끄기
                    </Button> */}
                </div>
                <div className="pc-grid-wrapper">
                    <div className="white-board">
                        <p>BOARD</p>
                    </div>

                    <div className="pc-box-wrapper">{grid}</div>
                </div>
            </Container>

            {/* 가로모드일 때 표시될 화면 */}
            <div className="ClassGridPage landscape_only">
                <div className="control-row">
                    <span id="offCount">OFF : {offCount}</span>&nbsp;&nbsp;&nbsp;
                    <span id="onCount">ON : {onCount}</span>&nbsp;&nbsp;
                    <span id="allPcOffButton" onClick={OffAllPc}>
                        OFF ALL
                    </span>
                    {/* <Button color="danger" onClick={OffAllPc}>
                        모든 PC끄기
                    </Button> */}
                </div>
                <div className="pc-grid-wrapper">
                    <div className="white-board">
                        <p>BOARD</p>
                    </div>

                    <div className="pc-box-wrapper">{grid}</div>
                </div>
            </div>

            <button
                id="infoAllPcOff"
                style={{ display: "none" }}
                onClick={createNotification("info", "모든PC를 종료했습니다")}
            ></button>
            <button
                id="warnPcAllOff"
                style={{ display: "none" }}
                onClick={createNotification("warning", "이미 모두 종료되었습니다")}
            ></button>
        </React.Fragment>
    );
};

export default ClassGridPage;
