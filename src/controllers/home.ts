import { Request, Response, Handler } from "express";
import { injectable } from "inversify";
import { Controller, Get } from "inversify-express-utils";
import {Authorize} from "../auth"; 

@injectable()
@Controller("/", Authorize)
export class HomeController {

    @Get("/")
    public Get(request: Request, response: Response): void {
        response.render("index", { title: "Express", user: request.user });
    }

}

export default HomeController;
