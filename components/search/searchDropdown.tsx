import React from 'react'
import classNames from 'classnames'
import Icon from '../icon'
import Popper from '../popper'
import {DataItem,SearchDropdownPorps} from './types'

const SearchDropdown :React.FC<SearchDropdownPorps> = props => {
    const {
        data,
        prefixCls,
        itemClick,
        historyData,
        inputVal = '',
        onDelete,
        dropdownShow,
        searchInputContainer,
        onMouseLeave,
        onMouseEnter,
        localeDatas
    } = props
    const hightlightKeyword = (title, uniqueKey):React.ReactNode => {
        const searchbarValue = inputVal
        let keyword = inputVal
        keyword = searchbarValue.includes('[') ? keyword.replace(/\[/gi, '\\[') : keyword
        keyword = searchbarValue.includes('(') ? keyword.replace(/\(/gi, '\\(') : keyword
        keyword = searchbarValue.includes(')') ? keyword.replace(/\)/gi, '\\)') : keyword
    
        const parts = title.split(new RegExp(`(${keyword})`, 'gi'))
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
            : title
        )
    }
    const ItemChildren = (item: DataItem):React.ReactNode => {
        return (
            <ul>{
                item.children && item.children.map(ele=>{
                    return <li className={`${prefixCls}_dropdown--item`} style={{padding: 0}} key={ele.id} >
                        <span 
                            className={`${prefixCls}_dropdown--item_normal`}
                            onClick={() => {
                                itemClick(typeof ele.title === 'string' ? ele.title : ele.id,ele)
                            }}
                        >
                            {typeof ele.title === 'string' ? hightlightKeyword(ele.title,ele.id) : ele.title}
                        </span>
                    </li>
                })
            }
            </ul>
        )
    }
    
    const DataSourceRender = (item: DataItem):React.ReactNode=> {
        const className = classNames(
            `${prefixCls}_dropdown--item_normal`,
            {[`${prefixCls}_dropdown--item-title`] :item.children}
        )
        return (
            <li 
                className={`${prefixCls}_dropdown--item`} 
                key={item.id} 
            >
                <span 
                    className={className} 
                    onClick={() => {
                        itemClick(typeof item.title === 'string' ? item.title : item.id,item)
                    }}
                >
                    {typeof item.title === 'string' ? hightlightKeyword(item.title,item.id) : item.title}
                </span>
                {
                    item.children && ItemChildren(item)
                } 
            </li>
        )
    }
    
    const HistoryRender = ():React.ReactNode => {
        const {searchRecord, searchEmptyRecord} = localeDatas.search
        const HistoryTitle = inputVal.length === 0 && historyData && historyData.length > 0 ? 
                            <li className={`${prefixCls}_dropdown--item ${prefixCls}_dropdown--item-history`}>
                                <span>{searchRecord}</span>
                                <Icon name='delete' onClick={()=>{

                                    onDelete && onDelete()
                                }}/>
                            </li> : null
        const HistoryNoData = <li className={`${prefixCls}_dropdown--item-nodata`}> {searchEmptyRecord} </li>
        const showHistoryNode = inputVal.length === 0 && historyData && historyData.length === 0
        return (
            showHistoryNode ? HistoryNoData : HistoryTitle

        )
    }
    
    const dataRender = inputVal.length ? data : historyData
    const {searchEmptyResult} = localeDatas.search
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
                        dataRender && dataRender.map((item)=>{
                            return DataSourceRender(item)
                        })
                    }
                    {
                        (!data || data.length === 0) && <li className={`${prefixCls}_dropdown--item-nodata`}> {searchEmptyResult} </li>
                    }
                </ul>
            </div>
        </Popper>
    )
}



export default SearchDropdown
