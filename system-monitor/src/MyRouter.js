import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import Header from "./component/Header/Header";
import One from "./component/test/One";
import TotalPc from "./component/TotalPc/TotalPc";
import Login from "./component/Login/Login";
import AuthRoute from "./component/AuthRoute/AutheRoute";
import ClassViewPage from "pages/ClassViewPage/ClassViewPage";
import ClassGridPage from "pages/ClassGridPage/ClassGridPage";
import Header from "module/Header/Header";
const MyRouter = ({
    saveLoginState,
    user,
    authenticated,
    isPolling,
    handlePolling,
    ShowNotification,
    createNotification,
}) => {
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
                        <AuthRoute
                            authenticated={authenticated}
                            path="/class/:classId"
                            render={(matchProps) => (
                                <ClassGridPage
                                    {...matchProps}
                                    isPolling={isPolling}
                                    ShowNotification={ShowNotification}
                                    createNotification={createNotification}
                                />
                            )}
                        />
                        <AuthRoute
                            authenticated={authenticated}
                            path="/class"
                            render={(props) => <ClassViewPage isPolling={isPolling} />}
                        />

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
