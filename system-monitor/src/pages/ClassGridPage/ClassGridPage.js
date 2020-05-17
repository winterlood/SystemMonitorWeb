import React, { useState, useEffect } from "react";
import { Alert, Container } from "reactstrap";
import "./ClassGridPage.css";
import PcBoxItem from "item/PcBoxItem/PcBoxItem";

import PcModal from "module/PcModal/PcModal";
import { getFilteredDate } from "util/time";
import ClassControlModal from "module/ClassControlModal/ClassControlModal";
import { GET_CLASS_PCS, POST_OFF_ALL_PC, POST_DELAY_ALL_PC, GET, POST } from "services/rest";

import MenuIcon from "@material-ui/icons/Menu";

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
    const handleToggleModal = (id, cpuData, ramData, startTime, endTime, powerStatus) => {
        setNowSelectedId(id);
        setNowSelectedPc({
            id: id,
            cpuData: cpuData,
            ramData: ramData,
            startTime: startTime,
            endTime: endTime,
            powerStatus: powerStatus,
        });
        toggle();
    };

    const getGridData = async () => {
        const data = await GET(GET_CLASS_PCS(classId));
        const pcsToArray = data.pcs.flat();
        const nowOnPcs = pcsToArray.filter((it) => it.powerStatus === "ON" || it.powerStatus === "On");
        const nowOffPcs = pcsToArray.filter(
            (it) => (it.powerStatus === "OFF" || it.powerStatus === "Off") && it.type === "PC"
        );

        setOnCount(nowOnPcs.length);
        setOffCount(nowOffPcs.length);
        setOnPcs(nowOnPcs);
        const resres = data.pcs.map((item, index) => {
            const now = item.map((cur) => {
                if (cur.id === "0") {
                    return <PcBoxItem key={cur.posR + cur.posC} handleToggleModal={handleToggleModal} {...cur} />;
                }
                return <PcBoxItem key={cur.id} handleToggleModal={handleToggleModal} {...cur} />;
            });
            return (
                <div key={index} className="pc-grid-row-wrapper">
                    <div className="pc-grid-item-row">{now}</div>
                </div>
            );
        });
        setGrid(resres);
        return resres;
    };

    const pcAllOff = async () => {
        let today = new Date();
        var sendTime = getFilteredDate(today);
        if (onPcs.length === 0) {
            document.getElementById("warnPcAllOff").click();
        } else {
            const data = await POST(POST_OFF_ALL_PC, {
                id: classId,
                type: "CLASS",
                endTime: sendTime,
                powerStatus: "OFF",
            });
            if (data !== null) {
                document.getElementById("infoAllPcOff").click();
            } else {
                alert("Error!");
            }
        }
        toggleCcModal();
    };

    const pcAllDelay = async (sendTime) => {
        let today = new Date();
        const data = await POST(POST_DELAY_ALL_PC, {
            id: classId,
            type: "CLASS",
            endTime: sendTime,
            powerStatus: "ON",
        });
        if (data !== null) {
            document.getElementById("infoAllPcDelay").click();
        } else {
            alert("Error!");
        }
        toggleCcModal();
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
        // Component Did Mount
        getGridData();
    }, [1]);
    return (
        <React.Fragment>
            <ClassControlModal
                pcAllOff={pcAllOff}
                pcAllDelay={pcAllDelay}
                ccmodal={ccmodal}
                toggle={toggleCcModal}
                classId={classId}
            />
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
                    <span id="controlMenuButton" onClick={toggleCcModal}>
                        <span id="controlMenuLabel"> 전체제어</span> <MenuIcon />
                    </span>
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
                    <span id="controlMenuButton" onClick={toggleCcModal}>
                        <span id="controlMenuLabel"> 전체제어</span> <MenuIcon />
                    </span>
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
            <button
                id="infoAllPcDelay"
                style={{ display: "none" }}
                onClick={createNotification("info", "모든PC의 종료시간이 업데이트 되었습니다")}
            ></button>
        </React.Fragment>
    );
};

export default ClassGridPage;
