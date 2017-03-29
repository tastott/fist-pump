import { Request, Response } from "express";
import { injectable } from "inversify";
import { Controller, Get } from "inversify-express-utils";

@injectable()
@Controller("/")
export class HomeController {

    @Get("/")
    public Get(request: Request, response: Response): void {
        response.render("index", { title: "Express" });
    }

}

export default HomeController;
