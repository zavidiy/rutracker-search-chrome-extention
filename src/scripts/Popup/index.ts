import {SettingsProvider} from './SettingsProvider/impls/SettingsProvider';
import {Application} from './Application/impls/Application';
import {StaticDataProvider} from './StaticDataProvider/impls/StaticDataProvider';

async function bootstrap() {
    const settingsProvider = new SettingsProvider();
    const staticDataProvider = new StaticDataProvider();
    const application = new Application(settingsProvider, staticDataProvider);

    await application.initialize();
}

bootstrap();