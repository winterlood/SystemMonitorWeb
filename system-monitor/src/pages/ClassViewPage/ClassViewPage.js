import React, { useState, useEffect } from "react";
import { Container } from "reactstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import ClassItem from "item/ClassItem/ClassItem";
import axios from "axios";

const ClassViewPage = ({ createNotification }) => {
    const [item, setItem] = useState();
    const GetClassItems = () => {
        axios
            .get("http://13.125.208.19/mobile/class")
            .then((response) => {
                console.log(response.data.total);
                console.log(response.data.classes);
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
