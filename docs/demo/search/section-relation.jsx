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
            ],
            dataSource: [
              {
                value: 1,
                text: '小米9 青春版'
              },
              {
                value: 2,
                text: '小米9'
              },
              {
                value: 3,
                text: '小米9 Pro'
              },
              {
                value: 4,
                text: '小米9 探索版'
              },
              {
                value: 5,
                text: '小米9 CC'
              },
              {
                value: 6,
                text: '小米9 CC 美图定制版'
              },
            ]
        }
      }
      render() {
        return (
          <Search 
            style={{ width: 260 }}
            placeholder='搜索关键字'
            onDelete = {()=>{
              this.setState ({
                historyDataSource : []
              })
            }}
            historyDataSource = {this.state.historyDataSource}
            dataSource = {this.state.dataSource}
            onSearch = {(value) => {
              console.log('Input Value', value)
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
            ],
            dataSource: [
              {
                value:'miphone',
                text:'手机',
                children :[
                  {
                    value: 1,
                    text: '小米9 Pro'
                  },
                  {
                    value: 2,
                    text: '小米9 探索版'
                  },
                  {
                    value: 3,
                    text: '小米9 CC 美图定制版'
                  },
                ]
              },
              {
                value:'live',
                text:'智能生活',
                children:[
                  {
                    value: 4,
                    text: '小米 手环'
                  },
                  {
                    value: 5,
                    text: '小米 净水器'
                  },
                  {
                    value: 6,
                    text: '小米 小爱音响'
                  },
                ]
              }
            ]
        }
      }
      render() {
        return (
          <Search 
            style={{ width: 260 }}
            placeholder='搜索关键字'
            onDelete = {()=>{
              this.setState ({
                historyDataSource : []
              })
            }}
            historyDataSource = {this.state.historyDataSource}
            dataSource = {this.state.dataSource}
            onSearch = {(value) => {
              console.log('Input Value', value)
            }}
          />
        )
      }
    }`,
    opt: ['分组']
  }
]
const DemoRelation = () => (
  <DocViewer
    code={code}
    leftOptions={leftOptions}
    scope={{Search}}
    prefix={prefix}
    desc={desc}
  />
)
export default DemoRelation
