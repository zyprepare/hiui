export interface DataSourceItem {
    value: any;
    text: React.ReactNode | string;
    children ?:Array<DataSourceItem> 
}
export interface SearchDropdownPorps {
    width ?: number;
    dataSource ?: Array<DataSourceItem>;
    prefixCls ?: string;
    itemClick : (value,item ?:DataSourceItem)=>void;          
    inputVal : string;
    onDelete ?: () => void;
    historyDataSource ?:Array<DataSourceItem>;
    dropdownShow : boolean;
    searchInputContainer : any
    onMouseEnter : () => void;
    onMouseLeave : () => void;
}
export interface SearchProps {
    prepend ?: JSX.Element;
    disabled ?: boolean
    placeholder ?: string;
    historyDataSource ?: Array<DataSourceItem>;  // 如果有值就展示；
    dataSource ?: Array<DataSourceItem>; // 如果有值就展示
    onChange ?: (param: string) => void;
    onSearch ?: (param: string,item?:DataSourceItem) => void;
    onDelete ?: () => void;
    OnMore ?: () => void; // 查看更多
    style ?: React.CSSProperties;
}