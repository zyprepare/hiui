import React from 'react'
import DocViewer from '../../../libs/doc-viewer'
import Search from '../../../components/search'
const prefix = 'search-base'
const leftOptions = ['基础', '禁用']
const desc = '按搜索关键字直接请求结果'
const code = [
  {
    code: `import React from 'react'
    import Search from '@hi-ui/hiui/es/Search'
    class Demo extends React.Component {
      render() {
        return (
          <Search 
            style={{ width: 260 }}
            placeholder='搜索关键字'
            onSearch = {(value) => {
              console.log('输入框中的关键字', value)
            }}
          />
        )
      }
    }`,
    opt: ['基础']
  },
  {
    code: `import React from 'react'
    import Search from '@hi-ui/hiui/es/Search'
    class Demo extends React.Component {
      render() {
        return (
          <Search 
            style={{ width: 250 }}
            placeholder='搜索关键字'
            disabled
            onSearch = {(value) => {
              console.log('输入框中的关键字', value)
            }}
          />
        )
      }
    }`,
    opt: ['禁用']
  }
]
const DemoBase = () => (
  <DocViewer
    code={code}
    leftOptions={leftOptions}
    scope={{Search}}
    prefix={prefix}
    desc={desc}
  />
)
export default DemoBase
