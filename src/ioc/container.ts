import { Container } from "inversify";
import "reflect-metadata";
import controllersModule from "./controllers";
import servicesModule from "./services";

const container = new Container();
container.load(controllersModule);
container.load(servicesModule);

export default container;
