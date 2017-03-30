import {Container} from "inversify";
import getDecorators from "inversify-inject-decorators";
import "reflect-metadata";
import {EventClient} from "../services/event-client";

export const container = new Container();
container.bind(EventClient).toSelf().inSingletonScope();

export const { lazyInject } = getDecorators(container);