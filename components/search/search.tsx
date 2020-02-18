import React from 'react'
import Input from '../input'
import Button from '../button'

// import classNames from 'classnames'
const Search = (props:SearchProps) => {
    const { 
        onChange,
        OnSearch,
        placeholder,
        width = 240
    } = props

    const prefixCls = 'hi-search'
    const append = <Button type="default" icon='search' onClick={() => {
        OnSearch && OnSearch()
      }} />
    return (
        <div className = {prefixCls}>
            <Input
                
                type="text"
                style={{ width }}
                placeholder= { placeholder }
                append = {append}
                onChange = {(e)=>{
                    const {value} = e.target
                    onChange && onChange(value)
                }}
            />
        </div>
    )
}
interface SearchProps {
    onChange ?: any;
    OnSearch ?: any;
    width ?: number;
    placeholder ?: string;
    loading ?: boolean;
    dataSouse ?: Array<any>; 
    onPressEnter ?: any;
    prepend ?: JSX.Element;
}
export default Search