import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./PcModal.css";
import PcDetailInfo from "module/PcDetailInfo/PcDetailInfo";
import { getFilteredDate, plus30minute } from "util/time";

import axios from "axios";
const PcModal = (props) => {
    const { nowSelectedPc, modal, toggle, id, ramData, cpuData, endTime, startTime } = props;
    console.log(nowSelectedPc);

    const DelayPcEndTime = () => {
        var sendTime = getFilteredDate(plus30minute());
        let url = "http://13.125.208.19/mobile/pc/" + nowSelectedPc.id + "/power/" + sendTime + "/";
        axios
            .post(
                url,
                { endTime: sendTime },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((response) => {
                console.log(response);
                if (response.data.msg === "true") {
                    alert("30분 연장되었습니다");
                }
            })
            .catch((error) => {
                console.log(error);
                alert("error!");
            });
    };
    const pcOffEvent = () => {
        this.setState({
            nowOffButtonRunning: true,
        });
        let today = new Date();
        var sendTime = getFilteredDate(today);

        let url = "http://13.125.208.19/mobile/pc/" + nowSelectedPc.id + "/power/" + sendTime + "/";
        console.log(url);

        axios
            .post(
                url,
                { endTime: sendTime, powerStatus: "OFF" },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((response) => {})
            .catch((error) => {});
    };
    return (
        <Modal size="lg" style={{ marginTop: "8px", maxWidth: "1600px", width: "90%" }} isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>
                <div className="PcDetailInfo">
                    <div className="pc-detail-header">
                        <div>
                            <span id="pc_id">{nowSelectedPc.id}&nbsp;</span>
                            {/* <span id="pc_id_notice">PC </span> */}
                            <span id="pc-update-date">updated : 2020-04-12-11-11</span>
                        </div>
                        <div></div>
                    </div>
                </div>
            </ModalHeader>
            <ModalBody>
                <PcDetailInfo {...props} />
                <div className="pc-detail-control-row">
                    <div className="pc-control-col">
                        <Button color="danger">PC 종료</Button>
                        <Button onClick={DelayPcEndTime}>PC 30분 연장</Button>
                    </div>
                </div>
            </ModalBody>
        </Modal>
    );
};

export default PcModal;
