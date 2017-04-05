import { ContainerModule} from "inversify";
import { SpectacleService } from "./../services/spectacle-service";

import {EventService} from "../services/event-service";

export default new ContainerModule(bind => {
    bind(EventService).toSelf().inSingletonScope();
    bind(SpectacleService).toSelf();
});
