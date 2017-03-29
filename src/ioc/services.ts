import { ContainerModule} from "inversify";

import {EventService} from "../services/event-service";

export default new ContainerModule(bind => {
    bind(EventService).toSelf().inSingletonScope();
});
