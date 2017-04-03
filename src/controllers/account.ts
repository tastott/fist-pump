import { Request, Response, Handler } from "express";
import { injectable } from "inversify";
import { Controller, Get, Post } from "inversify-express-utils";
import ConfigureAuth from "../auth"; 
import passport = require("passport");


@injectable()
@Controller("/account")
export class AccountController {

    @Get("/login")
    public Get(request: Request, response: Response): void {
        response.render("login", { title: "Express" });
    }

    @Post("/login", passport.authenticate('local', { failureRedirect: '/account/login' }))
    public Post(request: Request, response: Response): void {
        response.redirect("/");
    }

}

export default AccountController;
