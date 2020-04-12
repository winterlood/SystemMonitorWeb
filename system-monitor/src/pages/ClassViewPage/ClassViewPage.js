import React from "react";
import { Container } from "reactstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import ClassItem from "item/ClassItem/ClassItem";
const ClassViewPage = () => {
    return (
        <React.Fragment>
            <div className="main-wrapper">
                <Container>
                    <ClassItem />
                    <ClassItem />
                    <ClassItem />
                </Container>
            </div>
        </React.Fragment>
    );
};

export default ClassViewPage;
