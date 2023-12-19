import {render} from 'preact';
import App from './Components/Application/App';
import {SettingsStorage} from './SettingsProvider/impls/SettingsStorage';

const root = document.querySelector('#root');

if (!root) {
    throw new Error('Root element not found');
}

render(<App settingsStorage={new SettingsStorage()}/>, root);