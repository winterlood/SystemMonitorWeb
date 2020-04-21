import React, { Component } from "react";
import "./App.css";
import MyRouter from "./MyRouter";
import NotificationComponent from "util/NotificationComponent";
import "react-notifications/lib/notifications.css";

import { NotificationContainer, NotificationManager } from "react-notifications";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "null",
            authenticated: false,
            isPollin: false,
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
                    NotificationManager.info(message);
                    break;
                case "success":
                    NotificationManager.success(message, title);
                    break;
                case "warning":
                    NotificationManager.warning(message, title, 3000);
                    break;
                case "error":
                    NotificationManager.error(message, title, 5000, () => {
                        alert("callback");
                    });
                    break;
            }
        };
    };
    render() {
        const saveLoginState = (email) => {
            this.setState({
                user: email,
                authenticated: true,
            });
            window.sessionStorage.setItem("user", email);
            window.sessionStorage.setItem("auth", true);
        };
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
