import React, { Component } from 'react'
import TableContent from './TableContent'
import _ from 'lodash'
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
    console.log('componentDidMount')
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
    // this.props.tablepaginationReadRequest({url: this.props.url, userMerchantCode: this.props.userMerchantCode})
  }

  componentDidUpdate (prevProps, prevState) {
    // window.TransactionListPageComponent(this.props.listall)
    if (
      !_.isEqual(prevProps.userMerchantCode, this.props.userMerchantCode) &&
      !_.isEmpty(this.props.userMerchantCode)
    ) {
      this.props.tablepaginationReadRequest({ url: this.props.url, userMerchantCode: this.props.userMerchantCode })
    }
  }

  render () {
    // console.log('render')
    // console.log('render table pagination===>', this.props)
    return (
      <TableContent
        columns={this.props.columns}
        data={this.props.data}
        page={this.props.page}
        pages={this.props.pages}
        pageSize={this.props.pageSize}
        loading={this.props.isRequesting}
        requestData={(d) => this.props.tablepaginationReadRequest({ url: this.props.url, userMerchantCode: this.props.userMerchantCode, ...d })}
      />
    )
  }
}
export default TransactionListPageComponent
