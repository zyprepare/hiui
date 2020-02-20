import React, {useState,useRef} from 'react'
import Input from '../input'
import Button from '../button'
import SearchDropdown from './searchDropdown'
import {DataSourceItem,SearchProps} from './types'
import Provider from '../context'

import './style'

const Search: React.FC<SearchProps> = props=> {
    const [dropdownShow, setDropdownShow] = useState(false)
    const searchInputContainer: any = useRef()
    const [inputVal,setInputVal] = useState('')
    const [enterDropdown,setEnterDropdown] = useState(false)
    const { 
        onChange,
        onSearch,
        style,
        placeholder,
        prepend,
        disabled,
        historyDataSource,
        dataSource,
        onDelete
    } = props
    const closeDropdown = (e) => {
        setDropdownShow(e.target.className === 'hi-input__text ') 
    }
    
    const itemClick = (value,item :DataSourceItem) => {
        setInputVal(value)
        setDropdownShow(false)
        onSearch && onSearch(value,item)
    } 
    const prefixCls = 'hi-search'
    
    return (
        <div className = {prefixCls} style={style}>
            <div className = {`${prefixCls}_input`} ref={searchInputContainer}>
                <Input
                    type="text"
                    value={inputVal}
                    style ={style}
                    disabled = {disabled}
                    placeholder= { placeholder }
                    clearable="true"
                    prepend = {prepend}
                    onFocus = {(e)=>{
                        historyDataSource && closeDropdown(e)
                    }}
                    onBlur = {()=>{
                        setDropdownShow(enterDropdown)
                    }}
                    onChange = {(e)=>{
                        const {value} = e.target
                        setInputVal(value)
                        dataSource && value.length>0 && setDropdownShow(true)
                        onChange && onChange(value)
                    }}
                />
                <Button type="default" icon='search' disabled={disabled} onClick={(e) => {
                    e.preventDefault()
                    closeDropdown(e)
                    if(!inputVal){
                        return
                    }
                    onSearch && onSearch(inputVal)
                }} />
            </div>
            { dataSource || historyDataSource ? <SearchDropdown  
                    prefixCls = {prefixCls} 
                    inputVal = {inputVal}
                    itemClick = {itemClick}
                    dataSource = {dataSource}
                    onDelete = {onDelete}
                    dropdownShow = {dropdownShow}
                    onMouseEnter = {()=>{
                        setEnterDropdown(true)
                    }}
                    onMouseLeave = {()=>{
                        setEnterDropdown(false)
                    }}
                    searchInputContainer = {searchInputContainer}
                    historyDataSource = {historyDataSource}
                /> : null
            }
        </div>
    )
}


export default Provider(Search)