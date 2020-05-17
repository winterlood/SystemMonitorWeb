import React, { Component } from "react";
import "./ClassControlModal.css";
import { getFilteredDate, getSelectedTime, getFilteredTime } from "util/time";
import { Button, Modal, ModalHeader, ModalBody, Input } from "reactstrap";

import OfflineBoltIcon from "@material-ui/icons/OfflineBolt";
const DatePicker = ({ date, handleChangeSeletedTime }) => {
    if (date === "today") {
        return (
            <Input type="select" onChange={({ target: { value } }) => handleChangeSeletedTime(value)}>
                <MakeTodayTimeOptions />
            </Input>
        );
    } else {
        return (
            <Input type="select" onChange={({ target: { value } }) => handleChangeSeletedTime(value)}>
                <MakeTommorowTimeOptions />
            </Input>
        );
    }
};

const MakeTodayTimeOptions = () => {
    var today = new Date();
    var stHour = today.getHours();
    var nowMinute = today.getMinutes();
    var timeList = new Array();
    if (nowMinute >= 30) {
        stHour += 1;
    }
    for (var i = stHour; ; i++) {
        if (i != stHour) timeList.push(i + "-00");

        if (i === 24) {
            console.log("Break!");
            break;
        }
        timeList.push(i + "-30");
    }
    return timeList.map((it) => <option>{it}</option>);
};
const MakeTommorowTimeOptions = () => {
    var stHour = new String("00");
    var timeList = new Array();
    for (var i = stHour; ; i++) {
        if (i < 10 && i != "00") i = "0" + i;
        if (i === 24) {
            console.log("Break!");
            break;
        }
        timeList.push(i + "-00");

        timeList.push(i + "-30");
    }
    return timeList.map((it) => <option>{it}</option>);
};

class ClassControlModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: "today",
            selectedFullTime: null,
            selectedTime: null,
        };
    }
    componentWillMount() {
        const initTime = getFilteredDate(new Date());
        console.log(initTime);
        this.setState({
            ...this.state,
            selectedFullTime: initTime,
        });
    }

    handleChangeSeletedTime = (time) => {
        this.setState({
            ...this.state,
            selectedTime: time,
            selectedFullTime: getSelectedTime(this.state.date, new Date(), time),
        });
    };

    render() {
        const { pcAllOff, ccmodal, toggle, classId, pcAllDelay } = this.props;
        const { date, selectedTime, selectedFullTime } = this.state;
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
                style={{ maxWidth: "1600px", marginLeft: "10px", marginRight: "10px" }}
                isOpen={ccmodal}
                toggle={toggle}
            >
                <ModalBody>
                    <div id="class-id">{classId}</div>
                    <div className="modal-body landscape_only">
                        <div className="body-col">
                            <div className="off-wrapper">
                                <div className="item-wrapper">
                                    <div className="off-icon-box">
                                        <OfflineBoltIcon style={{ color: "red", fontSize: "80px" }} />
                                        <br />
                                        PC전체 전원 종료
                                    </div>
                                </div>
                                <div className="off-btn" onClick={() => pcAllOffAction()}>
                                    전체 종료
                                </div>
                            </div>
                        </div>
                        <div className="body-col">
                            <div className="delay-wrapper">
                                <div className="item-wrapper">
                                    <div className="date-pick">
                                        <div
                                            className={"date " + (date === "today" ? "on" : "off")}
                                            onClick={() => this.setState({ date: "today" })}
                                        >
                                            오늘
                                        </div>
                                        <div
                                            className={"date " + (date === "tommorow" ? "on" : "off")}
                                            onClick={() => this.setState({ date: "tommorow" })}
                                        >
                                            내일
                                        </div>
                                    </div>
                                    <div className="date-picker">
                                        <DatePicker
                                            date={date}
                                            handleChangeSeletedTime={this.handleChangeSeletedTime}
                                        />
                                    </div>
                                    <span id="time-label">연장 적용 시간 ( 꼭 확인해 주세요 )</span>
                                    <br />
                                    {getFilteredTime(selectedFullTime)}
                                </div>
                                <div className="delay-btn" onClick={() => pcAllDelay(selectedFullTime)}>
                                    전체 연장
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-body portrait_only">
                        <div className="body-col">
                            <div className="off-btn" onClick={() => pcAllOffAction()}>
                                전체 종료
                            </div>
                        </div>
                        <div className="body-col">
                            <div className="delay-wrapper">
                                <div className="date-pick">
                                    <div
                                        className={"date " + (date === "today" ? "on" : "off")}
                                        onClick={() => this.setState({ date: "today" })}
                                    >
                                        오늘
                                    </div>
                                    <div
                                        className={"date " + (date === "tommorow" ? "on" : "off")}
                                        onClick={() => this.setState({ date: "tommorow" })}
                                    >
                                        내일
                                    </div>
                                </div>
                                <div className="date-picker">
                                    <DatePicker date={date} handleChangeSeletedTime={this.handleChangeSeletedTime} />
                                </div>
                                <span id="time-label">연장 적용 시간 ( 꼭 확인해 주세요 )</span>
                                <br />
                                {getFilteredTime(selectedFullTime)}
                                <div className="delay-btn" onClick={() => pcAllDelay(selectedFullTime)}>
                                    전체 연장
                                </div>
                            </div>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        );
    }
}

export default ClassControlModal;
