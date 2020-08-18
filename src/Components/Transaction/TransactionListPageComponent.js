import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { getTransactionColumn } from '../../Utils/TableColumn'
import TablePaginationContainer from '../../features/TablePagination/TablePaginationContainer'
import FilterTransaction from '../../features/TablePagination/FilterTransaction'
// import TablePagination from '../Table/TablePagination'

// Import React Table
// import ReactTable from 'react-table'
// import 'react-table/react-table.css'

// import MaterialUiTable from './MaterialUiTable'
class TransactionListPageComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false
    }
    // window.TransactionListPageComponent()
  }

  componentDidMount () {
    // console.log('componentDidMount')
    // this.props.transactionReadRequest({})
    // let str = 'dist/js/transactionListPageComponent.js'
    // var element = document.querySelector('[src=\'' + str + '\']')
    // if (element) element.parentNode.removeChild(element)
    // const script = document.createElement('script')
    // script.src = str
    // script.id = 'myscript'
    // script.cek = 'cek'
    // script.async = true
    // document.body.appendChild(script)
    // window.TransactionListPageComponent([])
  }

  componentDidUpdate (prevProps) {
    // window.TransactionListPageComponent(this.props.listall)
  }

  render () {
    // console.log('render')
    return (
      <div className='content-wrapper'>
        <Helmet>
          <title>Report</title>
        </Helmet>
        <section className='content-header'>
          <h1>
            Report
          </h1>
          <ol className='breadcrumb'>
            <li><a href='/#'><i className='fa fa-dashboard' /> Report</a></li>
          </ol>
        </section>
        <section className='content'>
          <FilterTransaction
            userMerchantCode={this.props.userMerchantCode}
          />
          {/* <MaterialUiTable   /> */}
          <div className='box'>
            {/* <div className='box-header'>
                  <h3 className='box-title'>Data Table With Full Features</h3>
                </div> */}
            <div className='box-body'>
              <div className='row'>
                <div className='col-sm-12'>
                  <TablePaginationContainer
                    url='/plink/report/list'
                    columns={getTransactionColumn(this.props)}
                    userMerchantCode={this.props.userMerchantCode}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    )
  }
}
export default TransactionListPageComponent
