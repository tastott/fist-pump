import { Request } from "express";
import { inject, injectable } from "inversify";
import { Controller, Post } from "inversify-express-utils";
import { TestService } from "../services/test-service";

@injectable()
@Controller("/incoming")
export class IncomingController {

    constructor( @inject(TestService) private testService: TestService) { }

    // @Get('/')
    // public getUsers(): IUser[] {
    //     return this.userService.getUsers();
    // }

    // @Get('/:id')
    // public getUser(request: Request): IUser {
    //     return this.userService.getUser(request.params.id);
    // }

    @Post("/github")
    public github(request: Request): object {
        return {
            Blah: this.testService.Foo(request.body.number)
        };
    }
}

export default IncomingController;
