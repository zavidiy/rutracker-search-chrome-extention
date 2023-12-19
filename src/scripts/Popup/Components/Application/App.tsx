import {Component} from 'preact';
import {OpenURLButton} from '../OpenURLButton/OpenURLButton';
import {SortingOrderSelect} from '../SortingOrderSelector/SortingOrderSelect';
import {AppProps} from './types';

export default class App extends Component<AppProps> {
    render() {
        return (
            <>
                <header class="header">
                    <img class="header__logo" src="/icon.svg" alt="logo"/>
                    <h1 class="header__title">RuTracker.org Search</h1>
                </header>

                <section class="settings">
                    <div class="settings__option">
                        <SortingOrderSelect settingsStorage={this.props.settingsStorage}/>
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
}