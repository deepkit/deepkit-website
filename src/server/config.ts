import {createConfig} from "@deepkit/framework";
import { t } from "@deepkit/type";

export const appConfig = createConfig({
    db: t.string.default('mongodb://localhost/deepkit-website'),
    benchmarkAuthToken: t.string.default('notSet'),
})
