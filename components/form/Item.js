import React, { useContext, useState, useEffect, useCallback } from 'react'
import classNames from 'classnames'
import AsyncValidator from 'async-validator'
import PropTypes from 'prop-types'
import { depreactedPropsCompat } from '../_util'
import FormContext from './FormContext'
import { FILEDS_INIT, FILEDS_UPDATE, FILEDS_REMOVE } from './FormReducer'
import * as HIUI from '../'

/**
 * valuePropName 指定该表单的value 名称
 * rules 中 如果trigger 不传入 则 在最后点击时候时候校验规则
 * model 删除掉这个属性
 * 通过cloneEelement对value进行受控
 */

const FormItem = props => {
  const { formProps, formState, dispatch, onValuesChange, _type} = useContext(
    FormContext
  )
  const {
    children,
    label,
    required,
    className,
    showColon: shouldItemShowColon,
    style,
    field,
    valuePropName = 'value',
    
  } = props
  const {
    showColon: shouldFormShowColon,
    initialValues = {},
    localeDatas: {
      form: { colon }
    }
  } = formProps || {}
  // 初始化FormItem的内容
  const { fields } = formState
  const [value, setValue] = useState('')
  const [error, setError] = useState('')
  const [validating, setValidating] = useState(false)

  // 更新
  const updateField = (_value, triggerType) => {
    const childrenFiled = {
      field,
      value: _value,
      rules: getRules(),
      resetValidate,
      setValue,
      validate
    }
    const _fields = _.cloneDeep(fields)
    _fields.forEach(item => {
      if (item.field === childrenFiled.field) {
        Object.assign(item, childrenFiled)
      }
    })
    const allValues = {}
    _fields.forEach(item => {
      const { field, value } = item
      allValues[field] = value
    })
    triggerType === 'onChange' &&
      onValuesChange &&
      onValuesChange({ [field]: _value }, allValues)
    dispatch({ type: FILEDS_UPDATE, payload: _fields })
  }

  const resetValidate = useCallback((value = '') => {
    // 清空数据
    setValue(value)
    setError('')
    setValidating(false)
  })

  // 获取该单元的规则
  const getRules = useCallback(() => {
    const selfRules = required
      ? Object.assign({}, props.rules, { required })
      : props.rules
    let formRules = formProps.rules

    formRules = formRules ? formRules[props.field] : []
    return [].concat(selfRules || formRules || [])
  }, [props, formProps, required])
  // 过滤含有该trigger触发方式的rules
  const getFilteredRule = useCallback(trigger => {
    const rules = getRules()
    return rules.filter(rule => {
      return !rule.trigger || rule.trigger.indexOf(trigger) !== -1
    })
  })
  // 父级调用
  const validate = useCallback((trigger, cb, currentValue) => {
    const triggerRules = getFilteredRule(trigger)
    if (!triggerRules || triggerRules.length === 0) {
      if (cb instanceof Function) {
        cb()
      }
      return true
    }
    let rules = getRules()
    const validator = new AsyncValidator({
      [field]: rules
    })
    const model = { [field]: currentValue }
    validator.validate(
      model,
      {
        firstFields: true
      },
      errors => {
        setError(errors ? errors[0].message : '')
        setValidating(false)
        if (cb instanceof Function) {
          cb(errors)
        }
      }
    )
  })

  useEffect(() => {
    if (field) {
      dispatch({
        type: FILEDS_INIT,
        payload: {
          field,
          value:
            initialValues && initialValues[field] ? initialValues[field] : '',
          rules: getRules(),
          resetValidate,
          setValue,
          validate
        }
      })
      valueInit()
    }
    return () => {
      dispatch({ type: FILEDS_REMOVE, payload: field })
    }
  }, [])

  const valueInit = useCallback(() => {
    setValue(initialValues && initialValues[field] ? initialValues[field] : '')
  }, [initialValues])
  // 判断是否含有Rules
  const isRequired = useCallback(() => {
    let rules = getRules()
    let isRequired = false

    if (rules && rules.length) {
      rules.every(rule => {
        if (rule.required) {
          isRequired = true
          return false
        }
        return true
      })
    }
    return isRequired
  })

  // 对字段的操作
  const handleField = useCallback(
    (triggerType, currentValue) => {
      // 同步数据 reducer
      updateField(currentValue, triggerType)
      let rules = getRules()
      const hasTriggerType = rules.some(rule => {
        const { trigger = '' } = rule
        return trigger.includes(triggerType)
      })
      hasTriggerType && validate(triggerType, '', currentValue)
    },
    [fields]
  )

  const labelWidth = useCallback(() => {
    const labelWidth = props.labelWidth || formProps.labelWidth
    return formProps.labelPosition === 'top'
      ? '100%'
      : !Number.isNaN(Number(labelWidth)) && Number(labelWidth)
  }, [props.labelWidth, formProps.labelWidth])

  const setEvent = (eventName, componentProps, e, ...args) => {
    e.persist && e.persist()
    const _props = componentProps ? componentProps : children.props
    eventName === 'onChange' && _props.onChange && _props.onChange(e, ...args)
    eventName === 'onBlur' && _props.onBlur && _props.onBlur(e, ...args)
    const value =
      e.target && e.target.hasOwnProperty(valuePropName)
        ? e.target[valuePropName]
        : e
    setValue(value)
    handleField(eventName, value)
  }

  // jsx渲染方式
  const renderChildren = () => {
    const { component, componentProps } = props
    // 对ScheamaForm表单Item进行特殊处理
    if (_type === 'SchemaForm' && component) {
      if (HIUI[component]) {
        const HIUIComponent = HIUI[component]
        return React.createElement(HIUIComponent, {
          ...componentProps,
          [valuePropName]: value,
          onChange: (e, ...args) => {
            setEvent('onChange', componentProps, e, ...args)
          },
          onBlur: (e, ...args) => {
            setEvent('onBlur', componentProps, e, ...args)
          }
        })
      } else {
        throw new Error('not found ' + component)
      }
    }
    if (!children) {
      return null
    }

    return Array.isArray(children) || !React.isValidElement(children)
      ? children
      : React.cloneElement(children, {
          [valuePropName]: value,
          onChange: (e, ...args) => {
            setEvent('onChange', '', e, ...args)
          },
          onBlur: (e, ...args) => {
            setEvent('onBlur', '', e, ...args)
          }
        })
  }

  const shouldShowColon =
    shouldItemShowColon === undefined
      ? shouldFormShowColon && typeof label === 'string' && label.trim()
      : shouldItemShowColon
  const obj = {}
  obj['hi-form-item__error'] = error !== ''
  obj['hi-form-item--validating'] = validating
  obj['hi-form-item--required'] = isRequired() || required

  return (
    <div
      className={classNames('hi-form-item', className, obj)}
      style={style}
      key={field}
    >
      {label || label === '' ? (
        <label
          className='hi-form-item__label'
          style={{ width: labelWidth() }}
          key={field + 'label'}
        >
          {(typeof label === 'string' && label.trim()) || label}
          {shouldShowColon && colon}
        </label>
      ) : (
        <span
          className='hi-form-item__span'
          style={{ width: labelWidth() }}
          key={field + 'label'}
        />
      )}
      <div className={'hi-form-item' + '__content'} key={field + '__content'}>
        {renderChildren()}
        <div
          className={classNames('hi-form-item--msg__error', {
            ['hi-form-item--msg__error__show']: error !== ''
          })}
          key={field + 'error'}
        >
          {error}
        </div>
      </div>
    </div>
  )
}

FormItem.propTypes = {
  field: PropTypes.string,
  rules: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  required: PropTypes.bool,
  label: PropTypes.string,
  labelWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  showColon: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object
}

FormItem.defaultProps = {
  size: 'small'
}
export default depreactedPropsCompat([['field', 'prop']])(FormItem)
