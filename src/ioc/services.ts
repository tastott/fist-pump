import { ContainerModule} from "inversify";
import {TYPES} from "../constants";
import { DiskDbUserRepository } from "../repositories/disk-db-user-repository";
import { InMemoryUserRepository } from "../repositories/in-memory-user-repository";
import { IUserRepository } from "../repositories/user-repository";
import {EventService} from "../services/event-service";
import { IHttpService, SuperAgentHttpService } from "../services/http-service";
import { GifSelectionStrategy, GifStoreSpectacleService } from "../services/spectacle/gif-store-spectacle-service";
import { GiphySpectacleService } from "../services/spectacle/giphy-spectacle-service";
import { ISpectacleService } from "./../services/spectacle/spectacle-service";

export default new ContainerModule(bind => {
    bind(EventService).toSelf().inSingletonScope();
    // bind<ISpectacleService>(TYPES.ISpectacleService).toDynamicValue(context => {
    //     return new GifStoreSpectacleService(GifSelectionStrategy.Cyclic);
    // });
    bind<ISpectacleService>(TYPES.ISpectacleService).to(GiphySpectacleService);
    bind<IHttpService>(TYPES.IHttpService).to(SuperAgentHttpService);
    bind<IUserRepository>(TYPES.IUserRepository)
        //.to(InMemoryUserRepository)
        .toDynamicValue(context => new DiskDbUserRepository("data/diskdb"))
        .inSingletonScope();
});
