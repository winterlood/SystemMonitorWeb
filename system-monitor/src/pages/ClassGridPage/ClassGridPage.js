import React from "react";
import { Alert, Container } from "reactstrap";
import "./ClassGridPage.css";
const ClassGridPage = ({ match }) => {
    const rowNum = 3;
    const colNum = 2;
    return (
        <React.Fragment>
            {/* 세로모드일 때 표시될 화면 */}
            <Container className="ClassGridPage portrait_only">
                <Alert color="dark" className="portrait_only">
                    화면을 가로로 돌려주세요!
                </Alert>
                <div>{match.params.classId}</div>
            </Container>

            {/* 가로모드일 때 표시될 화면 */}
            <Container className="ClassGridPage landscape_only">
                <Alert color="dark" className="landscape_only">
                    화면을 세로로 돌려주세요!
                </Alert>
                <div>{match.params.classId}</div>
            </Container>
        </React.Fragment>
    );
};

export default ClassGridPage;
