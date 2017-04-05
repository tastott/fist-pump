import { ContainerModule} from "inversify";
import {TYPES} from "../constants";
import {EventService} from "../services/event-service";
import { GifSelectionStrategy, GifStoreSpectacleService, ISpectacleService } from "./../services/spectacle-service";

export default new ContainerModule(bind => {
    bind(EventService).toSelf().inSingletonScope();
    bind<ISpectacleService>(TYPES.ISpectacleService).toDynamicValue(context => {
        return new GifStoreSpectacleService(GifSelectionStrategy.Cyclic);
    });
});
