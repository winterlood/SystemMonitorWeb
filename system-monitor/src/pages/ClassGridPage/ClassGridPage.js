import React, { useState, useEffect } from "react";
import { Alert, Container, Button, Modal, ModalHeader, ModalBody, ModalFooter, Spinner } from "reactstrap";
import "./ClassGridPage.css";
import PcBoxItem from "item/PcBoxItem/PcBoxItem";

import PcModal from "module/PcModal/PcModal";
import { getFilteredDate, plus30minute } from "util/time";
import axios from "axios";
import ClassControlModal from "module/ClassControlModal/ClassControlModal";
import {
    header,
    GET_CLASS_PCS,
    POST_OFF_ONE_PC,
    POST_DELAY_ONE_PC,
    POST_OFF_ALL_PC,
    POST_DELAY_ALL_PC,
} from "services/url";

import MenuIcon from "@material-ui/icons/Menu";
import Loading from "component/Loading/Loading";

const ClassGridPage = ({ isPolling, location, ShowNotification, createNotification }) => {
    const [classId, setClassId] = useState(location.pathname.split("/")[2]);
    const [modal, setModal] = useState(false);
    const [ccmodal, setCcomdal] = useState(false);
    const [nowSelectedId, setNowSelectedId] = useState();
    const [nowSelectedPc, setNowSelectedPc] = useState({});
    const [grid, setGrid] = useState();
    const [onPcs, setOnPcs] = useState();
    const [onCount, setOnCount] = useState();
    const [offCount, setOffCount] = useState();
    const toggle = () => setModal(!modal);
    const toggleCcModal = () => setCcomdal(!ccmodal);
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
    const get = "ddd";
    const getGridData = () => {
        axios
            .get(GET_CLASS_PCS(classId))
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
                        if (cur.id === "0") {
                            return (
                                <PcBoxItem
                                    key={cur.posR + cur.posC}
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
                        }
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
                        <div key={index} className="pc-grid-row-wrapper">
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
        axios
            .post(
                POST_OFF_ONE_PC,
                { id: id, endTime: sendTime, powerStatus: "OFF" },
                {
                    headers: header,
                }
            )
            .then((response) => {})
            .catch((error) => {});
    };

    const pcAllOff = () => {
        let today = new Date();
        var sendTime = getFilteredDate(today);
        var nowUrl = "https://www.22hours.online/mobile/class/" + classId + "/power";
        if (onPcs.length === 0) {
            document.getElementById("warnPcAllOff").click();
        } else {
            axios
                .post(
                    POST_OFF_ALL_PC,
                    // nowUrl,
                    { id: classId, type: "CLASS", endTime: sendTime, powerStatus: "OFF" },
                    {
                        headers: header,
                    }
                )
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {});
            document.getElementById("infoAllPcOff").click();
        }
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
            <ClassControlModal pcAllOff={pcAllOff} ccmodal={ccmodal} toggle={toggleCcModal} classId={classId} />
            <PcModal
                createNotification={createNotification}
                nowSelectedPc={nowSelectedPc}
                modal={modal}
                toggle={toggle}
                ShowNotification={ShowNotification}
            />

            {/* 세로모드일 때 표시될 화면 */}
            <Container className="ClassGridPage portrait_only">
                <Alert color="danger" className="portrait_only">
                    화면을 가로모드로 전환하세요!
                </Alert>
                <div className="control-row">
                    <span id="classId">{classId}</span>
                    &nbsp; &nbsp; &nbsp;
                    <span id="onlight">&nbsp;</span>
                    <span id="CountValue">{onCount}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                    <span id="offlight">&nbsp;</span>
                    <span id="CountValue">{offCount}</span>
                    {/* <span id="onCount">ON : {onCount}</span>&nbsp;&nbsp;
                    <span id="offCount">OFF : {offCount}</span>&nbsp;&nbsp;&nbsp; */}
                    <span id="controlMenuButton" onClick={toggleCcModal}>
                        <span id="controlMenuLabel"> 전체제어</span> <MenuIcon />
                    </span>
                    {/* <span id="allPcOffButton" onClick={OffAllPc}>
                        <MenuIcon />
                    </span>
                    <span id="allPcOffButton" onClick={OffAllPc}>
                        OFF DELAY
                    </span> */}
                    {/* <Button color="danger" onClick={OffAllPc}>
                        모든 PC끄기
                    </Button> */}
                </div>
                <div
                    onClick={createNotification("warning", "세로모드는 지원하지 않습니다")}
                    className="pc-grid-wrapper"
                >
                    <div className="white-board">
                        <p>BOARD</p>
                    </div>

                    <div className="pc-box-wrapper disable">{grid}</div>
                </div>
            </Container>

            {/* 가로모드일 때 표시될 화면 */}
            <div className="ClassGridPage landscape_only">
                <div className="control-row">
                    <span id="classId">{classId}</span>
                    &nbsp; &nbsp; &nbsp;
                    <span id="onlight">&nbsp;</span>
                    <span id="CountValue">{onCount}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                    <span id="offlight">&nbsp;</span>
                    <span id="CountValue">{offCount}</span>
                    {/* <span id="onCount">ON : {onCount}</span>&nbsp;&nbsp;
                    <span id="offCount">OFF : {offCount}</span>&nbsp;&nbsp;&nbsp; */}
                    <span id="controlMenuButton" onClick={toggleCcModal}>
                        <span id="controlMenuLabel"> 전체제어</span> <MenuIcon />
                    </span>
                    {/* <span id="allPcOffButton" onClick={OffAllPc}>
                        전체 종료
                    </span>
                    <span id="allPcOffButton" onClick={OffAllPc}>
                        OFF DELAY
                    </span> */}
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
