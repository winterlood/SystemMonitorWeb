import React, { useState } from "react";
import { Alert, Container, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./ClassGridPage.css";
import PcBoxItem from "item/PcBoxItem/PcBoxItem";

import PcModal from "module/PcModal/PcModal";
const ClassGridPage = ({ match }) => {
    const [modal, setModal] = useState(false);
    const [nowSelectedId, setNowSelectedId] = useState();
    const toggle = () => setModal(!modal);
    const handleToggleModal = (id) => {
        setNowSelectedId(id);
        toggle();
    };
    const rowNum = 3;
    const colNum = 2;
    const testJson = {
        pcs: [
            [
                { row: 1, col: 1, id: 1, powerStatus: "ON", posR: "Pc" },
                { row: 1, col: 1, id: 2, powerStatus: "ON", posR: "Pc" },
                { row: 1, col: 1, id: 3, powerStatus: "ON", posR: "Pc" },
                { row: 1, col: 1, id: 4, powerStatus: "ON", posR: "Pc" },
                { row: 1, col: 1, id: 4, powerStatus: "OFF", posR: "Pc" },
                { row: 1, col: 1, id: 4, powerStatus: "OFF", posR: "Pc" },
                { row: 1, col: 1, id: 4, powerStatus: "OFF" },
                { row: 1, col: 1, id: 4, powerStatus: "ON" },
                { row: 1, col: 1, id: 4, powerStatus: "ON" },
                { row: 1, col: 1, id: 4, powerStatus: "ON", posR: "Pc" },
                { row: 1, col: 1, id: 4, powerStatus: "OFF", posR: "Pc" },
                { row: 1, col: 1, id: 4, powerStatus: "OFF", posR: "Pc" },
                { row: 1, col: 1, id: 4, powerStatus: "ON", posR: "Pc" },
                { row: 1, col: 1, id: 4, powerStatus: "ON", posR: "Pc" },
                { row: 1, col: 1, id: 4, powerStatus: "ON", posR: "Pc" },
            ],
            [
                { row: 1, col: 1, id: 1, powerStatus: "ON", posR: "Pc" },
                { row: 1, col: 1, id: 2, powerStatus: "ON", posR: "Pc" },
                { row: 1, col: 1, id: 3, powerStatus: "ON", posR: "Pc" },
                { row: 1, col: 1, id: 4, powerStatus: "ON" },
                { row: 1, col: 1, id: 4, powerStatus: "OFF" },
                { row: 1, col: 1, id: 4, powerStatus: "OFF", posR: "Pc" },
                { row: 1, col: 1, id: 4, powerStatus: "OFF", posR: "Pc" },
                { row: 1, col: 1, id: 4, powerStatus: "ON", posR: "Pc" },
                { row: 1, col: 1, id: 4, powerStatus: "ON", posR: "Pc" },
                { row: 1, col: 1, id: 4, powerStatus: "ON", posR: "Pc" },
                { row: 1, col: 1, id: 4, powerStatus: "OFF", posR: "Pc" },
                { row: 1, col: 1, id: 4, powerStatus: "OFF", posR: "Pc" },
                { row: 1, col: 1, id: 4, powerStatus: "ON" },
                { row: 1, col: 1, id: 4, powerStatus: "ON" },
                { row: 1, col: 1, id: 4, powerStatus: "ON", posR: "Pc" },
            ],
            [
                { row: 1, col: 1, id: 1, powerStatus: "ON", posR: "Pc" },
                { row: 1, col: 1, id: 2, powerStatus: "ON", posR: "Pc" },
                { row: 1, col: 1, id: 3, powerStatus: "ON" },
                { row: 1, col: 1, id: 4, powerStatus: "OFF", posR: "Pc" },
                { row: 1, col: 1, id: 4, powerStatus: "ON", posR: "Pc" },
                { row: 1, col: 1, id: 4, powerStatus: "OFF" },
                { row: 1, col: 1, id: 4, powerStatus: "ON" },
                { row: 1, col: 1, id: 4, powerStatus: "ON", posR: "Pc" },
                { row: 1, col: 1, id: 4, powerStatus: "ON", posR: "Pc" },
                { row: 1, col: 1, id: 4, powerStatus: "ON", posR: "Pc" },
            ],
            [
                { row: 1, col: 1, id: 1, powerStatus: "ON", posR: "Pc" },
                { row: 1, col: 1, id: 2, powerStatus: "ON", posR: "Pc" },
                { row: 1, col: 1, id: 4, powerStatus: "OFF" },
                { row: 1, col: 1, id: 4, powerStatus: "ON", posR: "Pc" },
                { row: 1, col: 1, id: 4, powerStatus: "ON", posR: "Pc" },
                { row: 1, col: 1, id: 4, powerStatus: "OFF", posR: "Pc" },
                { row: 1, col: 1, id: 4, powerStatus: "ON", posR: "Pc" },
                { row: 1, col: 1, id: 4, powerStatus: "ON", posR: "Pc" },
                { row: 1, col: 1, id: 4, powerStatus: "ON", posR: "Pc" },
                { row: 1, col: 1, id: 4, powerStatus: "ON", posR: "Pc" },
            ],
            [
                { row: 1, col: 1, id: 1, powerStatus: "ON", posR: "Pc" },
                { row: 1, col: 1, id: 2, powerStatus: "ON", posR: "Pc" },
                { row: 1, col: 1, id: 3, powerStatus: "ON", posR: "Pc" },
                { row: 1, col: 1, id: 4, powerStatus: "ON", posR: "Pc" },
                { row: 1, col: 1, id: 4, powerStatus: "OFF", posR: "Pc" },
                { row: 1, col: 1, id: 4, powerStatus: "ON", posR: "Pc" },
                { row: 1, col: 1, id: 4, powerStatus: "ON", posR: "Pc" },
                { row: 1, col: 1, id: 4, powerStatus: "OFF", posR: "Pc" },
                { row: 1, col: 1, id: 4, powerStatus: "ON" },
                { row: 1, col: 1, id: 4, powerStatus: "ON", posR: "Pc" },
            ],
            [
                { row: 1, col: 1, id: 1, powerStatus: "ON", posR: "Pc" },
                { row: 1, col: 1, id: 2, powerStatus: "ON", posR: "Pc" },
                { row: 1, col: 1, id: 3, powerStatus: "ON", posR: "Pc" },
                { row: 1, col: 1, id: 4, powerStatus: "ON", posR: "Pc" },
                { row: 1, col: 1, id: 4, powerStatus: "OFF", posR: "Pc" },
                { row: 1, col: 1, id: 4, powerStatus: "ON", posR: "Pc" },
                { row: 1, col: 1, id: 4, powerStatus: "ON", posR: "Pc" },
                { row: 1, col: 1, id: 4, powerStatus: "OFF", posR: "Pc" },
                { row: 1, col: 1, id: 4, powerStatus: "ON" },
                { row: 1, col: 1, id: 4, powerStatus: "ON", posR: "Pc" },
            ],
            [
                { row: 1, col: 1, id: 1, powerStatus: "ON", posR: "Pc" },
                { row: 1, col: 1, id: 2, powerStatus: "ON", posR: "Pc" },
                { row: 1, col: 1, id: 3, powerStatus: "ON", posR: "Pc" },
                { row: 1, col: 1, id: 4, powerStatus: "ON", posR: "Pc" },
                { row: 1, col: 1, id: 4, powerStatus: "OFF", posR: "Pc" },
                { row: 1, col: 1, id: 4, powerStatus: "ON", posR: "Pc" },
                { row: 1, col: 1, id: 4, powerStatus: "ON", posR: "Pc" },
                { row: 1, col: 1, id: 4, powerStatus: "OFF", posR: "Pc" },
                { row: 1, col: 1, id: 4, powerStatus: "ON" },
                { row: 1, col: 1, id: 4, powerStatus: "ON", posR: "Pc" },
            ],
            [
                { row: 1, col: 1, id: 1, powerStatus: "ON", posR: "Pc" },
                { row: 1, col: 1, id: 2, powerStatus: "ON", posR: "Pc" },
                { row: 1, col: 1, id: 3, powerStatus: "ON", posR: "Pc" },
                { row: 1, col: 1, id: 4, powerStatus: "ON", posR: "Pc" },
                { row: 1, col: 1, id: 4, powerStatus: "OFF", posR: "Pc" },
                { row: 1, col: 1, id: 4, powerStatus: "ON", posR: "Pc" },
                { row: 1, col: 1, id: 4, powerStatus: "ON", posR: "Pc" },
                { row: 1, col: 1, id: 4, powerStatus: "OFF", posR: "Pc" },
                { row: 1, col: 1, id: 4, powerStatus: "ON" },
                { row: 1, col: 1, id: 4, powerStatus: "ON", posR: "Pc" },
            ],
            [
                { row: 1, col: 1, id: 1, powerStatus: "ON", posR: "Pc" },
                { row: 1, col: 1, id: 2, powerStatus: "ON", posR: "Pc" },
                { row: 1, col: 1, id: 3, powerStatus: "ON", posR: "Pc" },
                { row: 1, col: 1, id: 4, powerStatus: "ON", posR: "Pc" },
                { row: 1, col: 1, id: 4, powerStatus: "OFF", posR: "Pc" },
                { row: 1, col: 1, id: 4, powerStatus: "ON", posR: "Pc" },
                { row: 1, col: 1, id: 4, powerStatus: "ON", posR: "Pc" },
                { row: 1, col: 1, id: 4, powerStatus: "OFF", posR: "Pc" },
                { row: 1, col: 1, id: 4, powerStatus: "ON" },
                { row: 1, col: 1, id: 4, powerStatus: "ON", posR: "Pc" },
            ],
            [
                { row: 1, col: 1, id: 1, powerStatus: "ON", posR: "Pc" },
                { row: 1, col: 1, id: 2, powerStatus: "ON", posR: "Pc" },
                { row: 1, col: 1, id: 3, powerStatus: "ON", posR: "Pc" },
                { row: 1, col: 1, id: 4, powerStatus: "ON", posR: "Pc" },
                { row: 1, col: 1, id: 4, powerStatus: "OFF", posR: "Pc" },
                { row: 1, col: 1, id: 4, powerStatus: "ON", posR: "Pc" },
                { row: 1, col: 1, id: 4, powerStatus: "ON", posR: "Pc" },
                { row: 1, col: 1, id: 4, powerStatus: "OFF", posR: "Pc" },
                { row: 1, col: 1, id: 4, powerStatus: "ON" },
                { row: 1, col: 1, id: 4, powerStatus: "ON", posR: "Pc" },
            ],
        ],
    };
    const PcGrid = () => {
        const resres = testJson.pcs.map((item, index) => {
            const now = item.map((cur) => {
                return (
                    <PcBoxItem toggle={handleToggleModal} id={cur.id} powerStatus={cur.powerStatus} posR={cur.posR} />
                );
            });
            return <div className="pc-grid-item-row">{now}</div>;
        });
        console.log(resres);
        return resres;
    };
    return (
        <React.Fragment>
            <PcModal id={nowSelectedId} modal={modal} toggle={toggle} />

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
                    <div>
                        <PcGrid />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default ClassGridPage;
