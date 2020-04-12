import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./PcModal.css";
import PcDetailInfo from "module/PcDetailInfo/PcDetailInfo";
const PcModal = ({ modal, toggle, id }) => {
    return (
        <Modal size="lg" style={{ marginTop: "8px", maxWidth: "1600px", width: "90%" }} isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>
                <div className="PcDetailInfo">
                    <div className="pc-detail-header">
                        <div>
                            <span id="pc_id">3D-2A-FE-OC-9C&nbsp;</span>
                            {/* <span id="pc_id_notice">PC </span> */}
                            <span id="pc-update-date">updated : 2020-04-12-11-11</span>
                        </div>
                        <div></div>
                    </div>
                </div>
            </ModalHeader>
            <ModalBody>
                <PcDetailInfo id={id} />
            </ModalBody>
        </Modal>
    );
};

export default PcModal;
