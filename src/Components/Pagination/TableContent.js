import React, { Component } from 'react'
import _ from 'lodash'
// Import React Table
import ReactTable from 'react-table'
import { generateSha256 } from '../../Utils/Utils'
import 'react-table/react-table.css'

let hashBefore = ''
export default class TableContent extends Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {
  //     data: [],
  //     pages: null,
  //     loading: true
  //   }
  //   // this.handleFetchData = this.handleFetchData.bind(this)
  // }

  // handleFetchData (state, instance) {
  //   console.log('fetchData state:', state)
  //   if (this.props.loading) {
  //     // console.log('still fetching')
  //     return
  //   }
  //   const data = {
  //     pageSize: state.pageSize,
  //     page: state.page,
  //     sorted: state.sorted,
  //     filtered: state.filtered
  //   }

  //   const dataString = JSON.stringify(data)
  //   const hash = generateSha256(dataString)
  //   if (hashBefore === hash) return
  //   hashBefore = hash

  //   this.props.requestData({
  //     pageSize: state.pageSize,
  //     page: state.page,
  //     sorted: state.sorted,
  //     filtered: state.filtered
  //   })
  // }

  render () {
    console.log('render component pagination table content===')
    const { minRows,data, pages, loading, page, pageSize, columns, onFetchData } = this.props
    return (
      <div>
        <ReactTable
          minRows={minRows}
          columns={columns}
          manual // Forces table not to paginate or sort automatically, so we can handle it server-side
          data={data}
          page={page}
          pages={pages} // Display the total number of pages
          loading={loading} // Display the loading overlay when we need it
          filterable={false}
          onFetchData={onFetchData} // Request new data when things change
          defaultPageSize={20}
          className='-striped -highlight'
          // className='table table-hover text-nowrap'
        />
      </div>
    )
  }
}
