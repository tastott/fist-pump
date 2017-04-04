import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./components/app";
import { container } from "./ioc/container";
import { SpectacleClient } from "./services/spectacle-client";
import { NotificationService } from "./services/notification-service";

// Initial setup
const eventClient = container.get(SpectacleClient);
const notificationService = container.get(NotificationService);
eventClient.Subscribe(spectacle => {
    notificationService.Notify("Something happened!", spectacle.Event.Description);
});

ReactDOM.render(<App />, document.getElementById("container"));
