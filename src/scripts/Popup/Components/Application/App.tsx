import {Component} from 'preact';
import {OpenURLButton} from '../OpenURLButton/OpenURLButton';
import {SortingOrderSelect} from '../SortingOrderSelector/SortingOrderSelect';
import {AppProps, AppState} from './types';
import {Settings, SortingOrderType} from '../../../common/types';
import {DEFAULT_SETTINGS} from '../../../staticData';
import {compareSettings} from '../../../help';
import {Loading} from '../Loading/Loading';

export default class App extends Component<AppProps, AppState> {
    state = {
        settings: {
            orderBy: DEFAULT_SETTINGS.orderBy
        }
    }

    private _savedSettings?: Settings;

    componentDidMount() {
        this.loadSettings();
    }

    componentDidUpdate() {
        if (this.compareSavedSettings(this.state.settings)) {
            return;
        }

        this.saveSettings();
    }

    render() {
        return <>
                <header class="header">
                    <img class="header__logo" src="/icon.svg" alt="logo"/>
                    <h1 class="header__title">RuTracker.org Search</h1>
                </header>

                <section class="settings">
                    {this.renderSettings()}
                </section>

                <footer class="footer">
                    <OpenURLButton url={'https://github.com/zavidiy/rutracker-search-chrome-extention'}>
                        <i className="fa-brands fa-github"></i>
                    </OpenURLButton>
                </footer>
            </>;
    }

    private renderSettings() {
        if (!this._savedSettings) {
            return <Loading/>;
        }

        return <>
            <SortingOrderSelect orderBy={this.state.settings.orderBy}
                                changeOrderByHandler={this.changeOrderByHandler.bind(this)}/>
        </>;
    }

    private loadSettings() {
        this.props.settingsStorage.getSettingsAsync().then(this.loadSettingsHandler.bind(this));
    }

    private loadSettingsHandler(loadedSettings: Settings) {
        if (this.compareSavedSettings(loadedSettings)) {
            return;
        }

        this.updateSavedSettings(loadedSettings);
        this.updateSettingsState(loadedSettings);

        console.log('settings loaded', loadedSettings);
    }

    private compareSavedSettings(newSettings: Settings) {
        return compareSettings(newSettings, this._savedSettings);
    }

    private updateSavedSettings(settings: Settings) {
        this._savedSettings = settings;
    }

    private saveSettings() {
        this.props.settingsStorage.saveSettingsAsync(this.state.settings).then(this.saveSettingsHandler.bind(this));
    }

    private saveSettingsHandler(savedSettings: Settings) {
        this.updateSavedSettings(savedSettings);

        console.log('settings saved', savedSettings);
    }

    private changeOrderByHandler(orderBy: SortingOrderType) {
        this.updateSettingsState({
            ...this.state.settings,
            orderBy: orderBy
        })
    }

    private updateSettingsState(settings: Settings) {
        this.setState({
            settings: {...settings}
        });
    }
}