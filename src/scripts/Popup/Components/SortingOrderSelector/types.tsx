import {SortingOrderType} from '../../../types';

export type SortingOrderSelectorProps = {
    orderBy: SortingOrderType
    changeOrderByHandler: (value: SortingOrderType) => void
};