import React, {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { cx, getPrefixCls } from '@hi-ui/classname'
import { __DEV__ } from '@hi-ui/env'
import _ from 'lodash'
import { LocaleContext } from '@hi-ui/locale-context'
import moment from 'moment'
import { useDate } from './hooks/useData'
import useFormat from './hooks/useFormat'
import useAltData from './hooks/useAltData'
import { getInRangeDate } from './utils'
import DPContext from './context'
import { PopperPortal } from '@hi-ui/popper'
import Root from './components/root'
import Panel from './components/panel'
import RangePanel from './components/range-panel'
import { DatePickerProps, DatePickerType } from './types'
import { getBelongWeek, getBelongWeekYear } from './utils/week'

const DATE_PICKER_PREFIX = getPrefixCls('date-picker')

const DEFAULT_DISABLED_DATE = () => false
const DEFAULT_ON_CHANGE = () => {}
const DEFAULT_DISABLED_FUNCTION = () => []

export const DatePicker = forwardRef<HTMLDivElement | null, DatePickerProps>(
  (
    {
      prefixCls = DATE_PICKER_PREFIX,
      role = 'date-picker',
      className,
      type: propType = 'date',
      value,
      defaultValue,
      placeholder,
      showTime = false,
      format,
      disabled,
      clearable = true,
      width = 'auto',
      weekOffset,
      hourStep = 1,
      minuteStep = 1,
      secondStep = 1,
      onChange = DEFAULT_ON_CHANGE,
      timeInterval = 240,
      shortcuts,
      altCalendar,
      altCalendarPreset,
      dateMarkRender,
      dateMarkPreset,
      overlayClassName,
      inputReadOnly,
      // locale = 'zh-CN',
      bordered = true,
      disabledDate = DEFAULT_DISABLED_DATE,
      max: configMax,
      min: configMin,
      maxDate,
      minDate,
      onSelect: propsOnSelect,
      theme,
      placement,
      disabledHours = DEFAULT_DISABLED_FUNCTION,
      disabledMinutes = DEFAULT_DISABLED_FUNCTION,
      disabledSeconds = DEFAULT_DISABLED_FUNCTION,
      ...otherProps
    },
    ref
  ) => {
    const { datePicker, locale = 'zh-CN' } = useContext(LocaleContext)
    // 适配器，暂时兼容老代码
    const localeData = useMemo(() => ({ datePicker }), [datePicker])
    // 此处应为历史兼容，需要兼容 max maxDate
    const [max, setMax] = useState(configMax || maxDate || null)
    const [min, setMin] = useState(configMin || minDate || null)

    useEffect(() => {
      setMax(configMax || maxDate || null)
    }, [configMax, maxDate])

    useEffect(() => {
      setMin(configMin || minDate || null)
    }, [configMin, minDate])

    const cacheDate = useRef(null)
    const [inputFocus, setInputFocus] = useState(false)
    const [type, setType] = useState<DatePickerType>(propType)
    useEffect(() => {
      moment.locale(locale === 'en-US' ? 'en' : 'zh-CN')
      // V4: 不使用 weekOffset 判断国际化语言
      // if (weekOffset !== undefined) {
      //   moment.locale(weekOffset === 0 ? 'en' : 'zh-CN')
      // }
    }, [locale, weekOffset])
    useEffect(() => {
      setType(propType)
    }, [propType])

    const safeWeekOffset = useMemo(
      () => (weekOffset !== undefined ? weekOffset : locale === 'en-US' ? 0 : 1),
      [weekOffset, locale]
    )

    const [outDate, changeOutDate] = useDate({
      value,
      type,
      defaultValue,
      cacheDate,
      format,
      weekOffset: safeWeekOffset,
      locale,
    })
    const realFormat = useFormat({
      type,
      showTime,
      format,
      locale,
    })

    const [showPanel, setShowPanel] = useState(false)
    const [altCalendarPresetData, dateMarkPresetData] = useAltData({
      altCalendar,
      altCalendarPreset,
      // dateMarkRender,
      dateMarkPreset,
      showPanel,
      prefixCls,
    })
    const inputChangeEvent = (val: moment.Moment, dir: number) => {
      if (val.isValid()) {
        const oData = _.cloneDeep(outDate)
        oData[dir] = val
        // 位置开始一定小于结束
        if (oData[0] && oData[1] && oData[0]?.isAfter(oData[1])) {
          const temp = oData[0]
          oData[0] = oData[1]
          oData[1] = temp
        }
        changeOutDate(oData)
      }
    }

    const callback = (dates: any, emitOnChange = true) => {
      const _dates = _.cloneDeep(dates)
      let returnDate = {}
      let returnDateStr = '' as any
      if (type.includes('week')) {
        returnDate = {
          start: _dates[0].toDate(),
          end: _dates[1].toDate(),
        }
        const getWeekString = (disposeDate: moment.Moment) =>
          format
            ? disposeDate.format(realFormat)
            : localeData.datePicker.weekrange(
                getBelongWeekYear(disposeDate, safeWeekOffset),
                getBelongWeek(disposeDate, safeWeekOffset)
              )
        returnDateStr = type.includes('range')
          ? {
              start: getWeekString(_dates[0]),
              end: getWeekString(_dates[1]),
            }
          : getWeekString(_dates[0])
      } else if (type.includes('range') || type === 'timeperiod') {
        returnDate = {
          start: _dates[0].toDate(),
          end: _dates[1].toDate(),
        }
        returnDateStr = { start: _dates[0].format(realFormat), end: _dates[1].format(realFormat) }
      } else {
        returnDate = _dates[0].toDate()
        returnDateStr = _dates[0].format(realFormat)
      }
      cacheDate.current = _dates
      emitOnChange && onChange(returnDate as any, returnDateStr)
    }
    const onPick = (dates: (moment.Moment | null)[], isShowPanel = false) => {
      setTimeout(() => {
        setShowPanel(isShowPanel)
      }, 0)
      if (!isShowPanel) {
        setInputFocus(false)
        callback(dates)
      }
      changeOutDate([...dates])
    }

    const onPopperClose = useCallback(() => {
      const outDateValue = outDate[0]
      const isValid = moment(outDateValue).isValid()
      // @ts-ignore
      const { startDate, endDate } = isValid && getInRangeDate(outDate[0], outDate[1], max, min)
      const _outDate = isValid ? [moment(startDate), moment(endDate)] : [null]
      resetStatus()
      const isChange = _outDate.some((od, index) => {
        return od && !od.isSame(cacheDate.current![index])
      })
      isChange && callback(_outDate, showTime || type === 'daterange')

      changeOutDate(_outDate)
    }, [outDate])

    const onClear = () => {
      resetStatus()
      changeOutDate([])
      // @ts-ignore
      onChange(null, '')
    }

    const resetStatus = useCallback(() => {
      setShowPanel(false)
      setInputFocus(false)
    }, [])

    const onSelect = useCallback(
      (date, ...arg) => {
        if (propsOnSelect) {
          const _date = Array.isArray(date) ? date[0] : date
          // @ts-ignore
          propsOnSelect(_date, ...arg)
        }
      },
      [propsOnSelect]
    )

    const popperCls = cx(
      overlayClassName,
      `${prefixCls}__popper`,
      type === 'date' && showTime && `${prefixCls}__popper--time`,
      type.includes('range') && `${prefixCls}__popper--range`,
      type === 'timeperiod' && `${prefixCls}__popper--timeperiod`,
      shortcuts && `${prefixCls}__popper--shortcuts`
    )
    const [attachEl, setAttachEl] = useState<HTMLElement | null>(null)

    return (
      <DPContext.Provider
        value={{
          ...otherProps,
          locale,
          localeData,
          type,
          outDate,
          weekOffset: safeWeekOffset,
          onPick,
          min,
          max,
          disabled,
          placeholder,
          showTime,
          format,
          realFormat,
          timeInterval,
          shortcuts,
          altCalendar,
          altCalendarPreset,
          dateMarkRender,
          dateMarkPreset,
          altCalendarPresetData,
          dateMarkPresetData,
          disabledHours,
          disabledMinutes,
          disabledSeconds,
          clearable,
          theme,
          width,
          hourStep,
          minuteStep,
          secondStep,
          inputReadOnly,
          value,
          bordered,
          disabledDate,
          onSelect,
          prefixCls,
          showPanel,
        }}
      >
        <div className={cx(prefixCls, className)} {...otherProps}>
          <Root
            inputChangeEvent={inputChangeEvent}
            onClear={onClear}
            inputFocus={inputFocus}
            onTrigger={() => {
              setShowPanel(true)
              setInputFocus(true)
            }}
            setAttachEl={setAttachEl}
          />
          <PopperPortal
            visible={showPanel}
            placement={placement}
            onClose={onPopperClose}
            attachEl={attachEl}
            unmountOnClose={false}
            preload
          >
            <div className={popperCls}>
              {type.includes('range') || type === 'timeperiod' ? <RangePanel /> : <Panel />}
            </div>
          </PopperPortal>
        </div>
      </DPContext.Provider>
    )
  }
)

if (__DEV__) {
  DatePicker.displayName = 'DatePicker'
}
