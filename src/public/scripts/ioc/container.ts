import {Container} from "inversify";
import getDecorators from "inversify-inject-decorators";
import "reflect-metadata";
import { SpectacleClient } from "../services/spectacle-client";
import { NotificationService } from "../services/notification-service";
import { AccountService } from "../services/account-service";

export const container = new Container();
container.bind(SpectacleClient).toSelf().inSingletonScope();
container.bind(NotificationService).toSelf();
container.bind(AccountService).toSelf();

export const { lazyInject } = getDecorators(container);