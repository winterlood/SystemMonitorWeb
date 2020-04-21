import React, { useState, useEffect } from "react";
import { Container } from "reactstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import ClassItem from "item/ClassItem/ClassItem";
import axios from "axios";

const ClassViewPage = ({ isPolling }) => {
    const [item, setItem] = useState();

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
                console.log(error);
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
    return (
        <React.Fragment>
            <div className="main-wrapper">
                <Container>{item}</Container>
            </div>
        </React.Fragment>
    );
};

export default ClassViewPage;
