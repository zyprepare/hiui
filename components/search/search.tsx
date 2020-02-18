import React, {useState,useRef} from 'react'
import Input from '../input'
import Button from '../button'
import Popper from '../popper'

const Search = (props:SearchProps) => {
    const [dropdownShow, setdropdownShow] = useState(false)
    const searchInputContainer:any = useRef();
    
    const { 
        onChange,
        OnSearch,
        placeholder,
        width = 240,
        prepend = null
    } = props

    const prefixCls = 'hi-search'
    const append = <Button type="default" icon='search' onClick={() => {
        OnSearch && OnSearch()
      }} />
    return (
        <div className = {prefixCls}>
            <div className = {`${prefixCls}_input`} ref={searchInputContainer}>
                <Input
                    type="text"
                    style={{ width }}
                    placeholder= { placeholder }
                    append = {append}
                    prepend = {prepend}
                    onChange = {(e)=>{
                        const {value} = e.target
                        setdropdownShow(true)
                        value.length>0 ? setdropdownShow(true) : setdropdownShow(false)
                        onChange && onChange(value)
                    }}
                />
            </div>
            
           <Popper
                show={dropdownShow}
                attachEle={searchInputContainer.current}
                zIndex={1050}
                topGap={5}
                className={`${prefixCls}__popper`}
                placement="top-bottom-start"
                >
                <div>
                    下拉框
                </div>
            </Popper>
            
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