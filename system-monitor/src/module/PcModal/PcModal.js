import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./PcModal.css";
import PcDetailInfo from "module/PcDetailInfo/PcDetailInfo";
import { getFilteredDate, plus30minute, getFilteredTime } from "util/time";
import { POST_DELAY_ONE_PC, POST_OFF_ONE_PC, POST } from "services/rest";
import axios from "axios";
const PcModal = (props) => {
    const {
        createNotification,
        ShowNotification,
        nowSelectedPc,
        modal,
        toggle,
        id,
        ramData,
        cpuData,
        endTime,
        startTime,
    } = props;
    const [notiFlag, setNotiFlag] = useState(false);

    ///////////////////////////////////////////////////////////////////
    //                                                               //
    //          AJAX                                                 //
    const HandleDelayButtonClick = async () => {
        var sendTime = getFilteredDate(plus30minute());
        const data = await POST(POST_DELAY_ONE_PC, { id: nowSelectedPc.id, endTime: sendTime });
        if (data !== null) {
            document.getElementById("infoToDelayButton").click();
            toggle();
        } else {
            alert("error!");
        }
    };

    const HandleOffButtonClick = async () => {
        let today = new Date();
        var sendTime = getFilteredDate(today);
        const data = await POST(POST_OFF_ONE_PC, { id: nowSelectedPc.id, endTime: sendTime, powerStatus: "OFF" });
        if (data != null) {
            document.getElementById("infoToOffButton").click();
            toggle();
        } else {
            alert("error!");
        }
    };
    //                                                              //
    //                                                              //
    //////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////
    //                                                               //
    //          LIFE CYCLE                                           //
    useEffect(() => {
        if (notiFlag === true) {
            createNotification("success", "타이틀임", "메세지임");
            setNotiFlag(false);
        }
    }, [notiFlag]);

    //                                                              //
    //                                                              //
    //////////////////////////////////////////////////////////////////
    return (
        <Modal
            size="lg"
            style={{ marginTop: "8px", maxWidth: "1600px", marginLeft: "10px", marginRight: "10px" }}
            isOpen={modal}
            toggle={toggle}
        >
            <ModalHeader toggle={toggle}>
                <div className="PcDetailInfo">
                    <div className="pc-detail-header">
                        <div>
                            <span id="pc_id">{nowSelectedPc.id}&nbsp;</span>
                            <span id="pc-update-date">updated : {getFilteredTime(getFilteredDate(new Date()))}</span>
                        </div>
                        <div></div>
                    </div>
                </div>
            </ModalHeader>
            <ModalBody>
                <PcDetailInfo {...props} />
                <div className={"pc-detail-control-row " + (nowSelectedPc.powerStatus === "ON" ? "on" : "none")}>
                    <div className="pc-control-col">
                        <Button color="danger" onClick={HandleOffButtonClick}>
                            PC 종료
                        </Button>
                        <Button onClick={HandleDelayButtonClick}>PC 30분 연장</Button>
                    </div>
                </div>
            </ModalBody>
            <button
                style={{ display: "none" }}
                id="successToDelayButton"
                onClick={createNotification("success", "연장신청", "연장신청에 성공하였습니다")}
            ></button>
            <button
                style={{ display: "none" }}
                id="infoToDelayButton"
                onClick={createNotification("info", "연장신청이 완료되었습니다")}
            ></button>
            <button
                style={{ display: "none" }}
                id="errorToDelayButton"
                onClick={createNotification("error", "에러가 발생하였습니다")}
            ></button>

            <button
                style={{ display: "none" }}
                id="successToOffButton"
                onClick={createNotification("success", "연장신청", "연장신청에 성공하였습니다")}
            ></button>
            <button
                style={{ display: "none" }}
                id="infoToOffButton"
                onClick={createNotification("info", nowSelectedPc.id + "pc가 종료되었습니다")}
            ></button>
            <button
                style={{ display: "none" }}
                id="errorToOffButton"
                onClick={createNotification("error", "에러가 발생하였습니다")}
            ></button>
        </Modal>
    );
};

export default PcModal;
