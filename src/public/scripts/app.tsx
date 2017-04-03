import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./components/app";
import { container } from "./ioc/container";
import { EventClient } from "./services/event-client";
import { NotificationService } from "./services/notification-service";

// Initial setup
const eventClient = container.get(EventClient);
const notificationService = container.get(NotificationService);
eventClient.Subscribe(event => {
    notificationService.Notify("Something happened!", event.Description);
});

ReactDOM.render(<App />, document.getElementById("container"));
