import { Request, Response, Handler } from "express";
import { injectable } from "inversify";
import { Controller, Get } from "inversify-express-utils";
import ConfigureAuth from "../auth"; 
import passport = require("passport");
import {ensureLoggedIn} from "connect-ensure-login";

@injectable()
@Controller("/", ensureLoggedIn("/account/login"))
export class HomeController {

    @Get("/")
    public Get(request: Request, response: Response): void {
        response.render("index", { title: "Express", user: request.user });
    }

}

export default HomeController;
