import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import Header from "./component/Header/Header";
import One from "./component/test/One";
import Two from "./component/test/Two";
import TotalPc from "./component/TotalPc/TotalPc";
import Login from "./component/Login/Login";
import AuthRoute from "./component/AuthRoute/AutheRoute";
import ClassViewPage from "pages/ClassViewPage/ClassViewPage";
import ClassGridPage from "pages/ClassGridPage/ClassGridPage";
import Header from "module/Header/Header";
const MyRouter = ({ saveLoginState, user, authenticated, isPolling, handlePolling, createNotification }) => {
    return (
        <Router>
            {/* <Header isPolling={isPolling} handlePolling={handlePolling}></Header> */}
            <div className="main">
                <Header />

                <div className="main-wrapper">
                    <Switch>
                        <Route
                            path="/login"
                            render={(props) => (
                                <Login authenticated={authenticated} saveLoginState={saveLoginState} {...props} />
                            )}
                        />

                        <AuthRoute
                            authenticated={authenticated}
                            path="/total"
                            render={(props) => (
                                <TotalPc user={user} isPolling={isPolling} handlePolling={handlePolling} {...props} />
                            )}
                        />
                        <Route path="/one" component={One} />
                        <Route
                            path="/class/:classId"
                            render={(matchProps) => (
                                <ClassGridPage {...matchProps} createNotification={createNotification} />
                            )}
                        />
                        <Route path="/class" render={(props) => <ClassViewPage />} />

                        {/* <Route  path="/total"
                  render={() =>
                      <TotalPc isPolling={isPolling}  />
                  }/> */}
                    </Switch>
                </div>
            </div>
        </Router>
    );
};

export default MyRouter;
