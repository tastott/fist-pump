import {Container} from "inversify";
import getDecorators from "inversify-inject-decorators";
import "reflect-metadata";
import { EventClient } from "../services/event-client";
import { NotificationService } from "../services/notification-service";
import { AccountService } from "../services/account-service";

export const container = new Container();
container.bind(EventClient).toSelf().inSingletonScope();
container.bind(NotificationService).toSelf();
container.bind(AccountService).toSelf();

export const { lazyInject } = getDecorators(container);