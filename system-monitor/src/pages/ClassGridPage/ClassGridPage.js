import React, { useState } from "react";
import { Alert, Container, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./ClassGridPage.css";
import PcBoxItem from "item/PcBoxItem/PcBoxItem";
import DATA from "json/gridtest";
import PcModal from "module/PcModal/PcModal";
const ClassGridPage = ({ match }) => {
    const [modal, setModal] = useState(false);
    const [nowSelectedId, setNowSelectedId] = useState();
    const [nowSelectedPc, setNowSelectedPc] = useState({});

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
    const PcGrid = () => {
        const resres = DATA.pcs.map((item, index) => {
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
        return resres;
    };
    return (
        <React.Fragment>
            <PcModal nowSelectedPc={nowSelectedPc} modal={modal} toggle={toggle} />

            {/* 세로모드일 때 표시될 화면 */}
            <Container className="ClassGridPage portrait_only">
                <Alert color="dark" className="portrait_only">
                    화면을 가로모드로 전환하세요!
                </Alert>
                <div>{match.params.classId}</div>
            </Container>

            {/* 가로모드일 때 표시될 화면 */}
            <div className="ClassGridPage landscape_only">
                <div className="pc-grid-wrapper">
                    <div className="white-board">
                        <p>BOARD</p>
                    </div>

                    <div className="pc-box-wrapper">
                        <PcGrid />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default ClassGridPage;
