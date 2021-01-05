import React, { Component } from 'react'
// Import React Table
import ReactTable from 'react-table'
import 'react-table/react-table.css'
export default class TableContent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      pages: null,
      loading: true
    }
    this.handleFetchData = this.handleFetchData.bind(this)
  }

  handleFetchData (state, instance) {
    // console.log('fetchData state:', state)
    if (this.props.loading) {
      // console.log('still fetching')
      return
    }
    this.props.requestData({
      pageSize: state.pageSize,
      page: state.page,
      sorted: state.sorted,
      filtered: state.filtered
    })
  }

  render () {
    // console.log('render')
    const { data, pages, loading, page, pageSize, columns } = this.props
    return (
      <div>
        <ReactTable
          columns={columns}
          manual // Forces table not to paginate or sort automatically, so we can handle it server-side
          data={data}
          page={page}
          pages={pages} // Display the total number of pages
          loading={loading} // Display the loading overlay when we need it
          onFetchData={this.handleFetchData} // Request new data when things change
          filterable={false}
          defaultPageSize={pageSize}
          className='-striped -highlight'
        />
      </div>
    )
  }
}
