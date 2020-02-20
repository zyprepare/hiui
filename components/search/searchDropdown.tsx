import React from 'react'
import classNames from 'classnames'
import Icon from '../icon'
import Popper from '../popper'
import {DataSourceItem,SearchDropdownPorps} from './types'

const SearchDropdown :React.FC<SearchDropdownPorps> = props => {
    const {
        dataSource,
        prefixCls,
        itemClick,
        historyDataSource,
        inputVal = '',
        onDelete,
        dropdownShow,
        searchInputContainer,
        onMouseLeave,
        onMouseEnter
    } = props
    const hightlightKeyword = (text, uniqueKey):React.ReactNode => {
        const searchbarValue = inputVal
        let keyword = inputVal
        keyword = searchbarValue.includes('[') ? keyword.replace(/\[/gi, '\\[') : keyword
        keyword = searchbarValue.includes('(') ? keyword.replace(/\(/gi, '\\(') : keyword
        keyword = searchbarValue.includes(')') ? keyword.replace(/\)/gi, '\\)') : keyword
    
        const parts = text.split(new RegExp(`(${keyword})`, 'gi'))
        return (
            inputVal && inputVal.length > 0 ? <p key={uniqueKey}>
            { parts.map((part) =>
              part === searchbarValue
                ? <span key={uniqueKey} className='hi-search_dropdown--item__name-hightlight'>
                   { part }
                </span>
                : part
            )
            }
          </p>
            : text
        )
    }
    const ItemChildren = (item: DataSourceItem):React.ReactNode => {
        return (
            <ul>{
                item.children ? item.children.map(ele=>{
                    return <li className={`${prefixCls}_dropdown--item`} style={{padding: 0}} key={ele.value} >
                        <span 
                            className={`${prefixCls}_dropdown--item_normal`}
                            onClick={() => {
                                itemClick(ele.text,ele)
                            }}
                        >
                            {hightlightKeyword(ele.text,ele.value)}
                        </span>
                    </li>
                }) : null
            }
            </ul>
        )
    }
    
    const DataSourceRender = (item: DataSourceItem):React.ReactNode=> {
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
                    {hightlightKeyword(item.text,item.value)}
                </span>
                {
                    item.children && ItemChildren(item)
                } 
            </li>
        )
    }
    
    const HistoryRender = ():React.ReactNode => {
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
        <Popper
            show={dropdownShow}
            attachEle={searchInputContainer.current}
            zIndex={1050}
            topGap={5}
            onMouseEnter = {()=>{
                onMouseEnter()
            }}
            onMouseLeave = {()=>{
                onMouseLeave()
            }}
            className={`${prefixCls}__popper`}
            placement="top-bottom-start">
            <div className ={`${prefixCls}_dropdown`}>
                    <ul className ={`${prefixCls}_dropdown--items`}>
                    { HistoryRender() }
                    {
                        data && data.map((item)=>{
                            return DataSourceRender(item)
                        })
                    }
                    {
                        (!dataSource || dataSource.length === 0) && <li className={`${prefixCls}_dropdown--item-nodata`}> 暂无数据 </li>
                    }
                </ul>
            </div>
        </Popper>
    )
}



export default SearchDropdown
