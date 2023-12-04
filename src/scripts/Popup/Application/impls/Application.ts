import browser from 'webextension-polyfill';
import {Settings, SortingOrderType} from '../../../types';
import {ISettingsProvider} from '../../SettingsProvider/ISettingsProvider';
import {IStaticDataProvider} from '../../StaticDataProvider/IStaticDataProvider';
import {IApplication} from '../IApplication';

export class Application implements IApplication {
    private _settings!: Settings;
    private _ruTrackerURL!: string;
    private _openRuTrackerButton!: HTMLButtonElement;
    private _sortingOrderSelect!: HTMLSelectElement;

    constructor(private readonly _settingsProvider: ISettingsProvider, private staticDataProvider: IStaticDataProvider) {
    }

    async initialize() {
        const {
            openRuTrackerButtonElementId,
            sortingOrderSelectElementId,
            ruTrackerURL
        } = await this.staticDataProvider.getStaticData();

        this._ruTrackerURL = ruTrackerURL;
        this._settings = await this._settingsProvider.getSettings();
        this._openRuTrackerButton = this.getOpenRuTrackerButton(openRuTrackerButtonElementId);
        this._sortingOrderSelect = this.getSortingOrderSelect(sortingOrderSelectElementId);

        this.initializeOpenRuTrackerButton();
        this.initializeSortingOrderSelect();
    }

    private initializeOpenRuTrackerButton() {
        this._openRuTrackerButton.addEventListener('click', this.openRuTrackerButtonClickHandler.bind(this))
    }

    private async openRuTrackerButtonClickHandler() {
        await browser.tabs.create({
            url: this._ruTrackerURL
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

    private getOpenRuTrackerButton(openRuTrackerButtonElementId: string): HTMLButtonElement {
        return document.getElementById(openRuTrackerButtonElementId) as HTMLButtonElement;
    }

    private getSortingOrderSelect(sortingOrderSelectElementId: string): HTMLSelectElement {
        return document.getElementById(sortingOrderSelectElementId) as HTMLSelectElement;
    }
}