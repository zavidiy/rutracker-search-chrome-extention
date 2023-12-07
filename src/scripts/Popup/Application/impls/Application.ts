import browser from 'webextension-polyfill';
import {Settings, SortingOrderType} from '../../../types';
import {ISettingsProvider} from '../../SettingsProvider/ISettingsProvider';
import {IStaticDataProvider} from '../../StaticDataProvider/IStaticDataProvider';
import {IApplication} from '../IApplication';

export class Application implements IApplication {
    private _settings!: Settings;
    private _gitHubURL!: string;
    private _openGitHubButton!: HTMLButtonElement;
    private _sortingOrderSelect!: HTMLSelectElement;

    constructor(private readonly _settingsProvider: ISettingsProvider, private staticDataProvider: IStaticDataProvider) {
    }

    async initialize() {
        const {
            openGitHubButtonElementId,
            sortingOrderSelectElementId,
            gitHubURL
        } = await this.staticDataProvider.getStaticData();

        this._gitHubURL = gitHubURL;
        this._settings = await this._settingsProvider.getSettings();
        this._openGitHubButton = this.getOpenGitHubButton(openGitHubButtonElementId);
        this._sortingOrderSelect = this.getSortingOrderSelect(sortingOrderSelectElementId);

        this.initializeOpenGitHubButton();
        this.initializeSortingOrderSelect();
    }

    private initializeOpenGitHubButton() {
        this._openGitHubButton.addEventListener('click', this.openGitHubButtonClickHandler.bind(this))
    }

    private async openGitHubButtonClickHandler() {
        await browser.tabs.create({
            url: this._gitHubURL
        })
    }

    private initializeSortingOrderSelect() {
        this._sortingOrderSelect.value = this._settings.orderBy;
        this._sortingOrderSelect.addEventListener('change', this.sortingOrderSelectChangeValueHandler.bind(this));
    }

    private async sortingOrderSelectChangeValueHandler() {
        this._settings.orderBy = this.getOrderBy();

        await this._settingsProvider.saveSettings(this._settings);
    }

    private getOrderBy() {
        return Object.values(SortingOrderType).find((value) => value === this._sortingOrderSelect.value) ?? SortingOrderType.REGISTERED;
    }

    private getOpenGitHubButton(elementId: string): HTMLButtonElement {
        return document.getElementById(elementId) as HTMLButtonElement;
    }

    private getSortingOrderSelect(elementId: string): HTMLSelectElement {
        return document.getElementById(elementId) as HTMLSelectElement;
    }
}