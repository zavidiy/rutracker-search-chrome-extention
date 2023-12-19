import {Component} from 'preact';
import {ChangeEvent} from 'preact/compat';
import {SortingOrderType} from '../../../types';
import {SortingOrderSelectorProps, SortingOrderSelectorState} from './types';

export class SortingOrderSelect extends Component <SortingOrderSelectorProps, SortingOrderSelectorState> {
    constructor(props: SortingOrderSelectorProps) {
        super(props);

        this.state = {
            settings: {
                orderBy: SortingOrderType.REGISTERED
            }
        }

        this.props.settingsStorage.getSettings().then((settings) => {
            console.log('settings loaded', settings);
            this.setState({
                settings: {...settings}
            });
        });
    }

    render() {
        return (
            <>
                <label for="sortingOrderSelect">
                    Order by (default):
                </label>
                <select id="sortingOrderSelect" value={this.state.settings.orderBy}
                        onChange={this.onChangeHandler.bind(this)}>
                    <option value="registered">Registered</option>
                    <option value="topicName">Topic name</option>
                    <option value="numberOfDownloads">Number of downloads</option>
                    <option value="numberOfSeeds">Number of seeds</option>
                    <option value="numberOfLeeches">Number of leeches</option>
                    <option value="size">Size</option>
                </select>
            </>
        );
    }

    private async onChangeHandler(e: ChangeEvent<HTMLSelectElement>) {
        console.log('sorting order changed');

        if (!(e.target instanceof HTMLSelectElement)) {
            return;
        }

        const sortingOrderType = this.getSortingOrderType(e.target.value);

        console.log('sorting order changed', sortingOrderType);

        this.setState({
            settings: {
                ...this.state.settings,
                orderBy: sortingOrderType
            }
        })

        await this.props.settingsStorage.saveSettings(this.state.settings);
    }

    private getSortingOrderType(value: string): SortingOrderType {
        const castedValue = value as SortingOrderType;

        //TODO: use bidirectional map
        return Object.values(SortingOrderType).includes(castedValue) ? castedValue : SortingOrderType.REGISTERED;
    }
}