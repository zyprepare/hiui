import React from 'react'
import DocViewer from '../../../libs/doc-viewer'
import Table from '@hi-ui/hi-table'

const prefix = 'total-avg'
const code = `import React from 'react'
import Table from '@hi-ui/hi-table'\n
class Demo extends React.Component {
  constructor(){
    this.columns = [
      {
        title: 'Home phone',
        colSpan: 2,
        dataKey: 'tel',
      },
      {
        title: 'Phone',
        colSpan: 0,
        dataKey: 'phone',
        total: true
      },
      {
        title: 'Address',
        dataKey: 'address'
      }
    ]
    this.data = [
      {
        key: '1',
        name: 'John Brown',
        age: 32,
        tel: '0571-22098909',
        phone: 11,
        address: 'New York No. 1 Lake Park'
      },
      {
        key: '2',
        name: 'Jim Green',
        tel: '0571-22098333',
        phone: 22,
        age: 42,
        address: 'London No. 1 Lake Park'
      },
      {
        key: '3',
        name: 'Joe Black',
        age: 32,
        tel: '0575-22098909',
        phone: 33,
        address: 'Sidney No. 1 Lake Park'
      },
      {
        key: '4',
        name: 'Jim Red',
        age: 18,
        tel: '0575-22098909',
        phone: 44,
        address: 'London No. 2 Lake Park'
      },
      {
        key: '5',
        name: 'Jake White',
        age: 18,
        tel: '0575-22098909',
        phone: 55,
        address: 'Dublin No. 2 Lake Park'
      }
    ]
  }
  render () {

    return (
      <Table columns={this.columns} data={this.data} />
    )
  }
}`
const DemoApi = () => <DocViewer code={code} scope={{ Table }} prefix={prefix} />
export default DemoApi
