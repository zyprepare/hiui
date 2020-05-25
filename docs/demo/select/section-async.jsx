import React from 'react'
import DocViewer from '../../../libs/doc-viewer'
import Select from '../../../components/select'
const prefix = 'select-async'
const desc =
  '备选项数量较大时，通过搜索选项关键词调取存储于服务端数据备选项的一个或多个'
const rightOptions = ['单选', '多选']
const code = [
  {
    code: `import React from 'react'
import Select from '@hi-ui/hiui/es/select'\n
class Demo extends React.Component {
  constructor (props) {
    super(props)
    this.state={
      value:1,
      data:[{id:1,title:'默认项'}]
    }
  }
  render () {
    const {value,data} = this.state
    return (
      <Select
        type='single'
        value={value}
        data={data}
        dataSource={{
          type: 'GET',
          key: 'id',
          url: 'https://www.fastmock.site/mock/eef9b373d82560f30585521549c4b6cb/hiui/api/lsit',
          transformResponse: (res) => {
            console.log('----', res)
            return res.list
          }
        }}
        placeholder='请选择'
        style={{ width: 200 }}
        onChange={(item) => {
          console.log('单选选结果', item)
        this.setState({
          value:item
        })
        }}
      />
    )
  }
}`,
    opt: ['单选']
  },
  {
    code: `import React from 'react'
import { Select } from '@hi-ui/hiui'\n
class Demo extends React.Component {
  constructor (props) {
    super(props)
    this.state={
      value:[1],
      data:[{id:1,title:'默认项'}]
    }
  }
  render () {
    const {value,data} = this.state
    return (
      <Select
      data={data}
      value={value}
      type='multiple'
      style={{width: '300px'}}
      placeholder='请选择'
      dataSource={keyword => {
        return ({
          type: 'GET',
          url: 'https://www.fastmock.site/mock/eef9b373d82560f30585521549c4b6cb/hiui/api/lsit',
          params:{id: keyword},
          transformResponse: (res) => {
            return res.list
          }
        })

      }}
      onChange={(item) => {
        console.log('多选结果', item)
        this.setState({
          value:item
        })
      }}
      />
    )
  }
}`,
    opt: ['多选']
  }
]
const DemoAsync = () => (
  <DocViewer
    code={code}
    scope={{ Select }}
    prefix={prefix}
    desc={desc}
    rightOptions={rightOptions}
  />
)
export default DemoAsync
