import { t } from '@deepkit/type';
import { AppModuleConfig } from '@deepkit/app';

export const appConfig = new AppModuleConfig({
    db: t.string.default('mongodb://localhost/deepkit-website'),
    benchmarkAuthToken: t.string.default('notSet'),
});
