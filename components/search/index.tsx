import React, {useState,useRef} from 'react'
import Input from '../input'
import Button from '../button'
import SearchDropdown from './searchDropdown'
import {DataItem,SearchProps} from './types'
import Provider from '../context'

import './style'

const Search: React.FC<SearchProps> = props=> {
    const [dropdownShow, setDropdownShow] = useState(false)
    const searchInputContainer  = useRef(null)
    const [inputVal,setInputVal] = useState('')
    const [enterDropdown,setEnterDropdown] = useState(false)
    const { 
        onChange,
        onSearch,
        style,
        placeholder,
        prepend,
        disabled,
        historyData,
        data,
        onDelete,
        localeDatas
    } = props
    const closeDropdown = (e) => {
        setDropdownShow(e.target.className === 'hi-input__text ') 
    }
    
    const itemClick = (value,item: DataItem) => {
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
                        historyData && closeDropdown(e)
                    }}
                    onBlur = {()=>{
                        setDropdownShow(enterDropdown)
                    }}
                    onChange = {(e)=>{
                        const {value} = e.target
                        setInputVal(value)
                        data && value.length>0 && setDropdownShow(true)
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
            { data || historyData ? <SearchDropdown  
                    prefixCls = {prefixCls} 
                    inputVal = {inputVal}
                    itemClick = {itemClick}
                    data = {data}
                    onDelete = {onDelete}
                    dropdownShow = {dropdownShow}
                    localeDatas = {localeDatas}
                    onMouseEnter = {()=>{
                        setEnterDropdown(true)
                    }}
                    onMouseLeave = {()=>{
                        setEnterDropdown(false)
                    }}
                    searchInputContainer = {searchInputContainer}
                    historyData = {historyData}
                /> : null
            }
        </div>
    )
}


export default Provider(Search)