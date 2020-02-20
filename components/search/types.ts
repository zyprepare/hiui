export interface DataItem {
    id: any;
    title: React.ReactNode | string;
    children ?: Array<Item> 
}
export interface Item {
    id: any;
    title: React.ReactNode | string;
}
export interface SearchDropdownPorps {
    width ?: number;
    data ?: Array<DataItem>;
    prefixCls ?: string;
    itemClick : (value,item ?:DataItem)=>void;          
    inputVal : string;
    onDelete ?: () => void;
    historyData ?:Array<DataItem>;
    dropdownShow : boolean;
    searchInputContainer : any
    onMouseEnter : () => void;
    onMouseLeave : () => void;
    localeDatas : any
}
export interface SearchProps {
    prepend ?: JSX.Element;
    disabled ?: boolean
    placeholder ?: string;
    historyData ?: Array<DataItem>;  // 如果有值就展示；
    data ?: Array<DataItem>; // 如果有值就展示
    onChange ?: (param: string) => void;
    onSearch ?: (param: string,item?:DataItem) => void;
    onDelete ?: () => void;
    style ?: React.CSSProperties;
    localeDatas : any
}