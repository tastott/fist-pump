import { ContainerModule} from "inversify";
import {TYPES} from "../constants";
import { DiskDbUserRepository } from "../repositories/disk-db-user-repository";
import { IUserRepository } from "../repositories/user-repository";
import {EventService} from "../services/event-service";
import { IHttpService, SuperAgentHttpService } from "../services/http-service";
import { GifSelectionStrategy, GifStoreSpectacleService } from "../services/spectacle/gif-store-spectacle-service";
import { GiphySpectacleService } from "../services/spectacle/giphy-spectacle-service";
import { ISpectacleService } from "./../services/spectacle/spectacle-service";
import { Auth0TokenRepository } from "../repositories/auth0-token-repository";
import { Auth0Service } from "../services/auth0-service";

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

    bind(Auth0TokenRepository).toSelf().inSingletonScope();
    bind(Auth0Service).toSelf();
});
