import React from 'react'
import DocViewer from '../../../libs/doc-viewer'
import Collapse from '../../../components/collapse'
const prefix = 'section-basic'
const rightOptions = ['基础用法', '受控']
const desc = '可以同时展开多个面板，对垂直空间没有特别限制'
const code = [
  {
    code: `import React from 'react'
import Collapse from '@hi-ui/hiui/es/collapse'\n
class Demo extends React.Component {
  render(){
    return(
      <Collapse
        onChange={()=>{console.log('切换了！');}}
        arrowPlacement="right"
      >
        <Collapse.Panel
          disabled={true}
          title="panel title 1"
        >
          <p>Collapse Panel Content 1</p>
          <p>Collapse Panel Content 1</p>
          <p>Collapse Panel Content 1</p>
        </Collapse.Panel>
        <Collapse.Panel
          title="panel title 2"
        >
          <p>Collapse Panel Content 2</p>
          <p>Collapse Panel Content 2</p>
          <p>Collapse Panel Content 2</p>
        </Collapse.Panel>
        <Collapse.Panel
          title="panel title 3"
        >
          <p>Collapse Panel Content 3</p>
          <p>Collapse Panel Content 3</p>
          <p>Collapse Panel Content 3</p>
        </Collapse.Panel>
      </Collapse>
    )
  }
}`,
    opt: ['基础用法']
  },
  {
    code: `import React from 'react'
import Collapse from '@hi-ui/hiui/es/collapse'\n
class Demo extends React.Component {
  render(){
    return(
      <Collapse
        onChange={()=>{console.log('切换了！');}}
        activeId='1'
        arrowPlacement="right"
      >
        <Collapse.Panel
          id='1'
          title="panel title 1"
        >
          <p>Collapse Panel Content 1</p>
          <p>Collapse Panel Content 1</p>
          <p>Collapse Panel Content 1</p>
        </Collapse.Panel>
        <Collapse.Panel
          title="panel title 2"
          id='2'
        >
          <p>Collapse Panel Content 2</p>
          <p>Collapse Panel Content 2</p>
          <p>Collapse Panel Content 2</p>
        </Collapse.Panel>
        <Collapse.Panel
          title="panel title 3"
          id='3'
        >
          <p>Collapse Panel Content 3</p>
          <p>Collapse Panel Content 3</p>
          <p>Collapse Panel Content 3</p>
        </Collapse.Panel>
      </Collapse>
    )
  }
}`,
    opt: ['受控']
  }
]

const DemoBasic = () => (
  <DocViewer
    code={code}
    scope={{ Collapse }}
    prefix={prefix}
    rightOptions={rightOptions}
    desc={desc}
  />
)
export default DemoBasic
