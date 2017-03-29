import { ContainerModule} from "inversify";

import {TestService} from "../services/test-service";

export default new ContainerModule(bind => {
    bind(TestService).toSelf();
});
