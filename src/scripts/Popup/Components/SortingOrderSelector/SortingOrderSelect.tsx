import {Component} from 'preact';
import {ChangeEvent} from 'preact/compat';
import {SortingOrderType} from '../../../common/types';
import {SortingOrderSelectorProps} from './types';

export class SortingOrderSelect extends Component <SortingOrderSelectorProps> {
    render() {
        return (
            <div className="settings__option">
                <label for="sortingOrderSelect">
                    Order by (default):
                </label>
                <select id="sortingOrderSelect" value={this.props.orderBy}
                        onChange={this.onChangeHandler.bind(this)}>
                    <option value="registered">Registered</option>
                    <option value="topicName">Topic name</option>
                    <option value="numberOfDownloads">Number of downloads</option>
                    <option value="numberOfSeeds">Number of seeds</option>
                    <option value="numberOfLeeches">Number of leeches</option>
                    <option value="size">Size</option>
                </select>
            </div>
        );
    }

    private async onChangeHandler(e: ChangeEvent<HTMLSelectElement>) {
        console.log('sorting order changed');

        if (!(e.target instanceof HTMLSelectElement)) {
            return;
        }

        console.log(e.target.value)

        const sortingOrderType = this.getSortingOrderType(e.target.value);

        this.props.changeOrderByHandler(sortingOrderType);
    }

    private getSortingOrderType(value: string): SortingOrderType {
        const castedValue = value as SortingOrderType;

        //TODO: use bidirectional map
        return Object.values(SortingOrderType).includes(castedValue) ? castedValue : SortingOrderType.REGISTERED;
    }
}