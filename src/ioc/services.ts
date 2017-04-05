import { ContainerModule} from "inversify";
import {TYPES} from "../constants";
import {EventService} from "../services/event-service";
import { IHttpService, SuperAgentHttpService } from "../services/http-service";
import { GifSelectionStrategy, GifStoreSpectacleService } from "../services/spectacle/gif-store-spectacle-service";
import { ISpectacleService } from "./../services/spectacle/spectacle-service";
import { GiphySpectacleService } from "../services/spectacle/giphy-spectacle-service";

export default new ContainerModule(bind => {
    bind(EventService).toSelf().inSingletonScope();
    // bind<ISpectacleService>(TYPES.ISpectacleService).toDynamicValue(context => {
    //     return new GifStoreSpectacleService(GifSelectionStrategy.Cyclic);
    // });
    bind<ISpectacleService>(TYPES.ISpectacleService).to(GiphySpectacleService);
    bind<IHttpService>(TYPES.IHttpService).to(SuperAgentHttpService);
});
