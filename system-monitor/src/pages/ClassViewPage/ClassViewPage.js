import React from "react";
import { Container } from "reactstrap";

import ClassItem from "item/ClassItem/ClassItem";
const ClassViewPage = () => {
    return (
        <React.Fragment>
            <div className="main-wrapper">
                <Container>
                    <ClassItem />
                </Container>
            </div>
        </React.Fragment>
    );
};

export default ClassViewPage;
