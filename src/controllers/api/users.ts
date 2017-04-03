import { Request, Response, Handler } from "express";
import { injectable } from "inversify";
import { Controller, Get } from "inversify-express-utils";
import passport = require("passport");

@injectable()
@Controller("/api/users")
export class UsersController {

    @Get("/me")
    public Get(request: Request, response: Response): void {
        response.send(request.user);
    }

}

export default UsersController;
