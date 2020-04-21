import React from "react";
import { NotificationContainer, NotificationManager } from "react-notifications";

class NotificationComponent extends React.Component {
    createNotification = (type) => {
        return () => {
            switch (type) {
                case "info":
                    NotificationManager.info("Info message");
                    break;
                case "success":
                    NotificationManager.success("Success message", "Title here");
                    break;
                case "warning":
                    NotificationManager.warning("Warning message", "Close after 3000ms", 3000);
                    break;
                case "error":
                    NotificationManager.error("Error message", "Click me!", 5000, () => {
                        alert("callback");
                    });
                    break;
            }
        };
    };

    render() {
        const Children = () => {
            const res = this.props.children;
            return res;
        };
        return (
            <div>
                <Children createNotification={this.createNotification} />
                <NotificationContainer />
            </div>
        );
    }
}

export default NotificationComponent;
