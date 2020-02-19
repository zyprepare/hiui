import React from 'react'
import DocViewer from '../../../libs/doc-viewer'
import Search from '../../../components/search'
const prefix = 'search-relation'
const leftOptions = ['基础', '分组']
const desc = '输入搜索关键词时，可以自动联想匹配的关键字，提高检索效率'
const code = [
  {
    code: `import React from 'react'
    import Search from '@hi-ui/hiui/es/Search'
    class Demo extends React.Component {
      constructor () {
        super()
        this.state = {
          historyDataSource:[
              {
                value: 1,
                text: '小米9'
              },
              {
                value: 2,
                text: '探索版'
              },
              {
                value: 3,
                text: 'MIX系列'
              },
              {
                value: 4,
                text: '智能硬件'
              },
              {
                value: 5,
                text: '扫地机器人'
              },
              {
                value: 6,
                text: '小米10'
              },
            ]
        }
      }
      render() {
        console.log(this.state)
        return (
          <Search 
            style={{ width: 250 }}
            placeholder='搜索关键字'
            onDelete = {()=>{
              this.setState ({
                historyDataSource : []
              })
            }}
            historyDataSource = {this.state.historyDataSource}
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
    opt: ['分组']
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
