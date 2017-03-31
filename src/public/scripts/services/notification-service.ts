import { BrowserNotification } from "browser-notification";
import { injectable } from "inversify";

let notifier: {
        notify(title: string, options: { body: string;}): void;
    };

@injectable()
export class NotificationService {
    public Notify(title: string, body: string): void {
        if (!notifier) {
            // Check browser support, ask permission, initialize
            notifier = BrowserNotification();
        }

        // Notify
        notifier.notify(title, {body});
    }
}
