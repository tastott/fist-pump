import {Container} from "inversify";
import getDecorators from "inversify-inject-decorators";
import "reflect-metadata";
import { EventClient } from "../services/event-client";
import { NotificationService } from "../services/notification-service";

export const container = new Container();
container.bind(EventClient).toSelf().inSingletonScope();
container.bind(NotificationService).toSelf();

export const { lazyInject } = getDecorators(container);