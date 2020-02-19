import React from 'react'
import classNames from 'classnames'
import Icon from '../icon'
import {DataSourceItem} from './types'

const SearchDropdown = (props: SearchDropdownPorps) => {
    const {
        dataSource,
        prefixCls,
        itemClick,
        historyDataSource,
        inputVal,
        onDelete,
        OnMore
    } = props
    const ItemChildren = (item: DataSourceItem) => {
        return (
            <ul>{
                item.children ? item.children.map(ele=>{
                    return <li className={`${prefixCls}_dropdown--item`} style={{padding: 0}} key={ele.text} >
                        <span 
                            className={`${prefixCls}_dropdown--item_normal`}
                            onClick={() => {
                                itemClick(ele.text,ele)
                            }}
                        >
                            {ele.text}
                        </span>
                    </li>
                }) : null
            }
            </ul>
        )
    }
    const DataSourceRender = (item:DataSourceItem) => {
        const className = classNames(
            `${prefixCls}_dropdown--item_normal`,
            {[`${prefixCls}_dropdown--item-title`] :item.children}
        )
        return (
            <li 
                className={`${prefixCls}_dropdown--item`} 
                key={item.value} 
            >
                <span 
                    className={className} 
                    onClick={() => {
                        itemClick(item.text,item)
                    }}
                >
                    {item.text}
                </span>
                {
                    item.children && ItemChildren(item)
                } 
            </li>
        )
    }
    const HistoryRender = () => {
        const HistoryTitle = inputVal.length === 0 && historyDataSource && historyDataSource.length > 0 ? 
                            <li className={`${prefixCls}_dropdown--item ${prefixCls}_dropdown--item-history`}>
                                <span>搜索历史</span>
                                <Icon name='delete' onClick={()=>{
                                    onDelete && onDelete()
                                }}/>
                            </li> : null
        const HistoryNoData = <li className={`${prefixCls}_dropdown--item-nodata`}> 无搜索记录 </li>
        const showHistoryNode = inputVal.length === 0 && historyDataSource && historyDataSource.length === 0
        return (
            showHistoryNode ? HistoryNoData : HistoryTitle

        )
    }
    const data = inputVal.length ? dataSource : historyDataSource
    return (
        <div className ={`${prefixCls}_dropdown`}>
             <ul className ={`${prefixCls}_dropdown--items`} style={{height: OnMore ? 224 : 260}}>
                { HistoryRender() }
                {
                    data && data.map((item)=>{
                        return DataSourceRender(item)
                    })
                }
            </ul>
            {
                OnMore && <p className={`${prefixCls}_dropdown--more`} onClick={()=>{
                    OnMore && OnMore()
                }}>查看更多 <Icon name='right' /></p>
            }
        </div>
    )
}

interface SearchDropdownPorps {
    width ?: number;
    dataSource ?: Array<DataSourceItem>;
    prefixCls ?: string;
    itemClick ?: any;          
    inputVal : string;
    onDelete ?: () => void;
    historyDataSource ?:Array<DataSourceItem>;
    OnMore ?: () => void
}

export default SearchDropdown
