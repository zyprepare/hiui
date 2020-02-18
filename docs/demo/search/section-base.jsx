import React from 'react'
import DocViewer from '../../../libs/doc-viewer'
import Search from '../../../components/search'
const prefix = 'rate-base'
const desc = '评定业务指标、信用等级、满意度等'
const code = `import React from 'react'
import Search from '@hi-ui/hiui/es/Search'
class Demo extends React.Component {
  
  render() {

    return (
      <Search>sdf</Search>
    )
  }
}`

const DemoBase = () => (
  <DocViewer
    code={code}
    scope={{Search}}
    prefix={prefix}
    desc={desc}
  />
)
export default DemoBase
