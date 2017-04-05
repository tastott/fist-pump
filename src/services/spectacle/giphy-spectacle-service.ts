import { inject, injectable } from "inversify";
import { TYPES } from "../../constants";
import { Event } from "../../models/event";
import { Spectacle } from "../../models/spectacle";
import { ThrowUnrecognizedError } from "../../utilities/errors";
import { IHttpService } from "../http-service";
import { ISpectacleService } from "./spectacle-service";

interface GiphyResponse {
    data: {
        image_url: string;
        id: string;
    };
}

@injectable()
export class GiphySpectacleService implements ISpectacleService {
    private apiKey: string;
    private randomGifEndpoint: string;
    private baseUrl: string;

    constructor(@inject(TYPES.IHttpService) private http: IHttpService){
        this.baseUrl = "http://api.giphy.com/v1";
        this.randomGifEndpoint = "gifs/random";
        this.apiKey = "dc6zaTOxFJmzC";
    }

    public GetSpectacle(event: Event): Promise<Spectacle> {
        const tag = "win";
        const url = `${this.baseUrl}/${this.randomGifEndpoint}?api_key=${this.apiKey}&tag=${encodeURIComponent(tag)}`;
        return this.http.Get<GiphyResponse>(url)
            .then(response => {
                const spectacle: Spectacle = {
                    Type: "FixedGif",
                    Url: response.data.image_url,
                    Event: event,
                    Name: response.data.id
                };
                return spectacle;
            });
    }
}
