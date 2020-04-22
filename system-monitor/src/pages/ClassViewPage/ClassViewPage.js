import React, { useState, useEffect } from "react";
import { Container, Alert, Spinner } from "reactstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import ClassItem from "item/ClassItem/ClassItem";
import axios from "axios";

// components
import ServerError from "component/ServerError/ServerError";
import Loading from "component/Loading/Loading";

const ClassViewPage = ({ isPolling }) => {
    const [item, setItem] = useState(Loading);

    const GetClassItems = () => {
        axios
            .get("http://13.125.208.19/mobile/class")
            .then((response) => {
                setItem(
                    response.data.classes.map(({ id, cntOff, cntOn, type }) => (
                        <ClassItem key={id} id={id} cntOn={cntOn} cntOff={cntOff}></ClassItem>
                    ))
                );
            })
            .catch(function (error) {
                console.log("SERVER ERROR!");
                const errorItem = <ServerError response={error.response.data} />;
                setItem(errorItem);
            });
    };
    useEffect(() => {
        if (isPolling) {
            const intervals = setInterval(() => {
                console.log("polling ~/mobile/class/");
                GetClassItems();
            }, 5000);
            return () => clearInterval(intervals);
        } else {
            console.log("Polling is stopped");
        }
    }, [isPolling]);
    useEffect(() => {
        GetClassItems();
    }, [1]);

    const RenderPollingState = () => {
        const smallPaddingStyle = {
            padding: "5px",
        };
        if (isPolling) {
            return (
                <Alert style={smallPaddingStyle} color="success">
                    <div className="polling-state-wrapper">
                        <div className="text-box">실시간 업데이트 중입니다</div>
                        <div className="spinner-box">
                            <Spinner size="sm" color="secondary" />
                        </div>
                    </div>
                </Alert>
            );
        } else {
            return (
                <Alert style={smallPaddingStyle} color="secondary">
                    <div className="polling-state-wrapper">
                        <div className="text-box">실시간 업데이트가 중지되었습니다.</div>
                        <div className="spinner-box"></div>
                    </div>
                </Alert>
            );
        }
    };
    return (
        <React.Fragment>
            <div className="main-wrapper">
                <Container>
                    <RenderPollingState />
                    {item}
                </Container>
            </div>
        </React.Fragment>
    );
};

export default ClassViewPage;
