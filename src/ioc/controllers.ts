import { ContainerModule, interfaces } from "inversify";
import { interfaces as ieuInterfaces, TYPE } from "inversify-express-utils";

import {HomeController} from "../controllers/home";
import {IncomingController} from "../controllers/incoming";

function BindController<T>(bind: interfaces.Bind, controller: interfaces.Newable<T>): void {
    bind<ieuInterfaces.Controller>(TYPE.Controller)
        .to(controller)
        .whenTargetNamed(controller.name);
}

export default new ContainerModule(bind => {
    BindController(bind, HomeController);
    BindController(bind, IncomingController);
});
