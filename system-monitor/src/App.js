import React, { Component } from "react";
import "./App.css";
import MyRouter from "./MyRouter";
import "react-notifications/lib/notifications.css";

import { NotificationContainer, NotificationManager } from "react-notifications";

import { POST_LOGIN, POST } from "services/rest";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "null",
            authenticated: false,
            isPolling: true,
        };
    }

    componentDidMount() {
        const sessionUser = window.sessionStorage.getItem("user");
        const sessionAuth = window.sessionStorage.getItem("auth");
        if (sessionUser) {
            this.setState({
                user: sessionUser,
                authenticated: sessionAuth,
            });
        }
    }
    createNotification = (type, title, message) => {
        return () => {
            switch (type) {
                case "info":
                    NotificationManager.info(title);
                    break;
                case "success":
                    NotificationManager.success(message, title, 1000);
                    break;
                case "warning":
                    NotificationManager.warning(message, title, 3000);
                    break;
                case "error":
                    NotificationManager.error(message, title, 5000, () => {
                        alert("서버와 통신중 에러가 발생하였습니다");
                    });
                default:
                    NotificationManager.error(message, title, 5000, () => {
                        alert("서버와 통신중 에러가 발생하였습니다");
                    });
            }
        };
    };
    ShowNotification = (type, title, message) => {
        this.createNotification(type, title, message);
    };
    render() {
        ///////////////////////////////////////////////////////////////////
        //                                                               //
        //          AJAX                                                 //
        const saveLoginState = async (id, pw) => {
            const result = await POST(POST_LOGIN, { id: id, pw: pw });
            if (result) {
                console.log(result);
                this.setState({
                    user: id,
                    authenticated: true,
                });
                window.sessionStorage.setItem("user", id);
                window.sessionStorage.setItem("auth", true);
            } else {
                alert("No!");
            }
        };
        //                                                              //
        //                                                              //
        //////////////////////////////////////////////////////////////////
        const logout = () => {
            this.setState({
                user: null,
                authenticated: false,
            });
            window.sessionStorage.clear();
        };
        const handlePolling = () => {
            this.setState({
                isPolling: !this.state.isPolling,
            });
        };
        return (
            <React.Fragment>
                <NotificationContainer />

                <MyRouter
                    createNotification={this.createNotification}
                    ShowNotification={this.ShowNotification}
                    authenticated={this.state.authenticated}
                    saveLoginState={saveLoginState}
                    logout={logout}
                    isPolling={this.state.isPolling}
                    handlePolling={handlePolling}
                />
            </React.Fragment>
        );
    }
}
export default App;
