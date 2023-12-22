import {Component} from 'preact';
import {OpenURLButton} from '../OpenURLButton/OpenURLButton';
import {SortingOrderSelect} from '../SortingOrderSelector/SortingOrderSelect';
import {AppProps, AppState} from './types';
import {Settings, SortingOrderType} from '../../../common/types';
import {DEFAULT_SETTINGS} from '../../../staticData';

export default class App extends Component<AppProps, AppState> {
    state = {
        settings: {
            orderBy: DEFAULT_SETTINGS.orderBy
        }
    }

    componentDidMount() {
        this.loadSettings();
    }

    async componentDidUpdate(_: AppProps, prevState: AppState) {
        if (prevState.settings !== this.state.settings) {
            await this.saveSettings();
        }
    }

    render() {
        return (
            <>
                <header class="header">
                    <img class="header__logo" src="/icon.svg" alt="logo"/>
                    <h1 class="header__title">RuTracker.org Search</h1>
                </header>

                <section class="settings">
                    <div class="settings__option">
                        <SortingOrderSelect orderBy={this.state.settings.orderBy}
                                            changeOrderByHandler={this.changeOrderByHandler.bind(this)}/>
                    </div>
                </section>

                <footer class="footer">
                    <OpenURLButton url={'https://github.com/zavidiy/rutracker-search-chrome-extention'}>
                        GitHub
                    </OpenURLButton>
                </footer>
            </>
        );
    }

    private loadSettings() {
        this.props.settingsStorage.getSettingsAsync().then(this.updateSettingsState.bind(this));
    }

    private async saveSettings() {
        await this.props.settingsStorage.saveSettingsAsync(this.state.settings);
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