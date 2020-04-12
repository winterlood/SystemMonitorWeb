import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./PcModal.css";
import PcDetailInfo from "module/PcDetailInfo/PcDetailInfo";
const PcModal = (props) => {
    const { nowSelectedPc, modal, toggle, id, ramData, cpuData, endTime, startTime } = props;
    console.log(nowSelectedPc);
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
            </ModalBody>
        </Modal>
    );
};

export default PcModal;
