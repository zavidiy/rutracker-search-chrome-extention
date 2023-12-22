import {SortingOrderType} from '../../../common/types';

export type SortingOrderSelectorProps = {
    orderBy: SortingOrderType
    changeOrderByHandler: (value: SortingOrderType) => void
};