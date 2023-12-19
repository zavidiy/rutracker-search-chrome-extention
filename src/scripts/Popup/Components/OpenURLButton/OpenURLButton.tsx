import {Component} from 'preact';
import browser from 'webextension-polyfill';
import {OpenURLButtonProps} from './types';

export class OpenURLButton extends Component<OpenURLButtonProps> {
    render() {
        return (
            <button className="footer__link" onClick={this.clickHandler.bind(this)}>
                {this.props.children}
            </button>
        );
    }

    async clickHandler() {
        await browser.tabs.create({url: this.props.url});
    }
}