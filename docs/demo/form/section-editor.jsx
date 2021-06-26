import React, { useEffect, useRef, useState } from 'react'
import Form from '../../../components/form'
import Input from '../../../components/input'
import Button from '../../../components/button'
import Select from '../../../components/select'
import Counter from '../../../components/counter'
import Cascader from '../../../components/cascader'
import Radio from '../../../components/radio'
import Checkbox from '../../../components/checkbox'
import Switch from '../../../components/switch'
import DatePicker from '../../../components/date-picker'
import Rate from '../../../components/rate'
import Upload from '../../../components/upload'
import SelectTree from '../../../components/select-tree'
import Grid from '../../../components/grid'
import Table from '../../../components/table'
import DocViewer from '../../../libs/doc-viewer'

const prefix = 'form-hooks'
const desc = '通过 Form.useForm 对表单数据域进行交互'
const code = `
() => {
    const formRef = useRef()
    const culomnsKeys = useRef([])
    const render = (text, row, index, dataKey) => {
      const { _filed, key } = row
      const name = culomnsKeys.current[index]
      return (
        <>
          {_filed && _filed.uuid && (
            <Form.Item
              {..._filed}
              rules={{ required: true, type: 'string', message: 请输入 }}
              name={dataKey}
            >
              <Input />
            </Form.Item>
          )}
        </>
      )
    }
  
    const [columns, setcolumns] = useState([
      {
        title: '商品名',
        dataKey: 'name',
        width: 150,
        render: render
      },
      {
        title: '品类',
        dataKey: 'type',
        width: 150,
        render: render
      }
    ])
    const [data, setData] = useState([
      {
        name: '小米9',
        type: '手机',
        size: '6G+64G 全息幻彩蓝',
        price: '3299.00',
        address: '华润五彩城店',
        stock: '29,000',
        key: 1
      },
      {
        name: '小米9 SE',
        type: '手机',
        size: '6G+64G 全息幻彩蓝',
        price: '1999.00',
        address: '清河店',
        stock: '10,000',
        key: 2
      },
      {
        name: '小米9 SE',
        type: '手机',
        size: '6G+64G 全息幻彩蓝',
        price: '1999.00',
        address: '清河店',
        stock: '10,000',
        key: 2
      }
    ])
    useEffect(() => {
      formRef.current.setFieldsValue({ editor: data })
    }, [data, columns])
    return (
      <div>
        <Button
          onClick={() => {
            setcolumns([
              {
                title: '商品名',
                dataKey: 'name',
                width: 150,
                render: render
              },
              {
                title: '品类',
                dataKey: 'type',
                width: 150,
                render: render
              },
              {
                title: 'size',
                dataKey: 'size',
                width: 150,
                render: render
              },
              {
                title: 'price',
                dataKey: 'price',
                width: 150,
                render: render
              }
            ])
          }}
        >
          更新columnes
        </Button>
        <Form ref={formRef}>
          <Form.List name="editor">
            {(fields, { add, remove }) => {
              console.log('fields', fields)
              return (
                <Table
                  columns={columns}
                  data={data.map((item, index) => {
                    item._filed = fields[index]
                    return item
                  })}
                />
              )
            }}
          </Form.List>
        </Form>
        <Button
          onClick={() => {
            formRef.current.validate((v, e) => {
              console.log('v, e', v, e)
            })
          }}
        >
          获取值
        </Button>
      </div>
    )
  }
`
const DemoRow = () => (
  <DocViewer
    code={code}
    scope={{
      Form,
      Button,
      Input,
      Select,
      Counter,
      Cascader,
      Radio,
      Checkbox,
      Switch,
      DatePicker,
      Rate,
      Upload,
      Grid,
      SelectTree,
      Table,
      useEffect,
      useRef,
      useState
    }}
    prefix={prefix}
    desc={desc}
  />
)
export default DemoRow
