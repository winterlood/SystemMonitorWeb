import React, { useState, useEffect } from "react";
import { Alert, Container, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./ClassGridPage.css";
import PcBoxItem from "item/PcBoxItem/PcBoxItem";
import DATA from "json/gridtest";
import PcModal from "module/PcModal/PcModal";
import axios from "axios";
const ClassGridPage = ({ location, createNotification }) => {
    const [classId, setClassId] = useState(location.pathname.split("/")[2]);
    const [modal, setModal] = useState(false);
    const [nowSelectedId, setNowSelectedId] = useState();
    const [nowSelectedPc, setNowSelectedPc] = useState({});
    const [grid, setGrid] = useState();
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
                const resres = response.data.pcs.map((item, index) => {
                    const now = item.map((cur) => {
                        return (
                            <PcBoxItem
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
                        <div className="pc-grid-row-wrapper">
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
    useEffect(() => {
        getGridData();
    }, [1]);
    return (
        <React.Fragment>
            <PcModal
                nowSelectedPc={nowSelectedPc}
                modal={modal}
                toggle={toggle}
                createNotification={createNotification}
            />

            {/* 세로모드일 때 표시될 화면 */}
            <Container className="ClassGridPage portrait_only">
                <Alert color="dark" className="portrait_only">
                    화면을 가로모드로 전환하세요!
                </Alert>
                <div>{classId}</div>
            </Container>

            {/* 가로모드일 때 표시될 화면 */}
            <div className="ClassGridPage landscape_only">
                <div className="pc-grid-wrapper">
                    <div className="white-board">
                        <p>BOARD</p>
                    </div>

                    <div className="pc-box-wrapper">{grid}</div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default ClassGridPage;
