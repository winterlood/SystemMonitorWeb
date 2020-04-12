import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./PcModal.css";
import PcDetailInfo from "module/PcDetailInfo/PcDetailInfo";
const PcModal = ({ modal, toggle, id }) => {
    return (
        <Modal size="lg" style={{ maxWidth: "1600px", width: "90%" }} isOpen={modal} toggle={toggle}>
            {/* <ModalHeader style={{ maxWidth: "1600px", height: "10px" }} toggle={toggle}>
                {id}pc
            </ModalHeader> */}
            <ModalBody>
                <PcDetailInfo />
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={toggle}>
                    Do Something
                </Button>{" "}
                <Button color="secondary" onClick={toggle}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default PcModal;
