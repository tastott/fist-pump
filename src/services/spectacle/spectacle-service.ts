import { Event } from "../../models/event";
import { Spectacle } from "../../models/spectacle";

export interface ISpectacleService {
    GetSpectacle(event: Event): Promise<Spectacle>;
}

