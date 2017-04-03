import { ContainerModule, interfaces } from "inversify";
import { interfaces as ieuInterfaces, TYPE } from "inversify-express-utils";

import {HomeController} from "../controllers/home";
import {IncomingController} from "../controllers/incoming";
import {OutgoingController} from "../controllers/outgoing";
import {AccountController} from "../controllers/account";
import {UsersController} from "../controllers/api/users";

function BindController<T>(bind: interfaces.Bind, controller: interfaces.Newable<T>): void {
    bind<ieuInterfaces.Controller>(TYPE.Controller)
        .to(controller)
        .whenTargetNamed(controller.name);
}

export default new ContainerModule(bind => {
    BindController(bind, HomeController);
    BindController(bind, IncomingController);
    BindController(bind, OutgoingController);
    BindController(bind, AccountController);
    BindController(bind, UsersController);
});
