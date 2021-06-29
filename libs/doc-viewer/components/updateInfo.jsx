import React, { useState, useEffect } from 'react'
import From from '../../../components/form'
import Input from '../../../components/input'
import Select from '../../../components/select'
import Modal from '../../../components/modal'
const FormItem = From.Item
const UpdateInfo = ({ visible: propsVisible }) => {
  const [visible, setVisible] = useState(propsVisible)
  useEffect(() => {
    setVisible(propsVisible)
  }, [visible])
  console.log('visible', visible)
  return (
    <div>
      <Modal title="提交示例" visible={visible}>
        <From>
          <FormItem required={true} label="示例描述" field="productCode">
            <Input placeholder="请输入该示例主要演示功能" />
          </FormItem>
          <FormItem required={true} label="包含组件" field="productName">
            <Select
              data={[
                {
                  title: 'Select',
                  id: 'select'
                },
                {
                  title: 'Form',
                  id: 'From'
                },
                {
                  title: 'Table',
                  id: 'table'
                },
                {
                  title: 'Input',
                  id: 'input'
                }
              ]}
            />
          </FormItem>
        </From>
      </Modal>
    </div>
  )
}
export default UpdateInfo
