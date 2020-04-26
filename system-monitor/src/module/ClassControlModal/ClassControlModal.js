import React from "react";
import "./ClassControlModal.css";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
const ClassControlModal = ({ pcAllOff, ccmodal, toggle, classId }) => {
    const pcAllOffAction = () => {
        pcAllOff();
        toggle();
    };
    const pcAllDelayAction = () => {
        toggle();
    };
    return (
        <Modal
            className="ClassControlModal"
            size="lg"
            style={{ marginTop: "8px", maxWidth: "1600px", width: "90%" }}
            isOpen={ccmodal}
            toggle={toggle}
        >
            <ModalHeader className="modal-header" toggle={toggle}>
                {classId} 전체 제어
            </ModalHeader>
            <ModalBody>
                <div className="item-header offheader">전체 종료</div>
                <div className="item-label">{classId}의 전체 PC를 현재시간부로 종료합니다</div>
                <div className="item-label"> 사용자가 저장하지 않은 모든 기록은 손실되며, 복구 할 수 없습니다</div>

                <div className="item-action offaction" onClick={pcAllOffAction}>
                    {classId}의 PC 전체종료하기
                </div>
                <br />
                <br />
                <div className="item-header delayheader">전체 연장</div>
                <div className="item-label">{classId}의 전체 PC의 종료예정시간을 늦춥니다</div>
                <div className="item-label"> 현재 시간부로 30분 늦춰지며, 30분뒤에는 종료됩니다</div>
                <div className="item-action delayaction" onClick={pcAllDelayAction}>
                    {classId}의 PC 전체 연장하기
                </div>
                <br />
            </ModalBody>
        </Modal>
    );
};

export default ClassControlModal;
