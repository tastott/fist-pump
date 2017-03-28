import { injectable } from "inversify";

@injectable()
export class TestService {
    public Foo(value: number): number {
        return value * 2;
    }
}
