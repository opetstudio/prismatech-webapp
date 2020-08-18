import React, { Component } from 'react'
// Import React Table
import ReactTable from 'react-table'
import 'react-table/react-table.css'
export default class TableMerchant extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      pages: null,
      loading: true
    }
    this.handleOnFetchData = this.handleOnFetchData.bind(this)
  }

  handleOnFetchData (state, instance) {
    console.log('handleOnFetchData')
    if (this.props.loading) {
      console.log('still fetching')
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
    console.log('render =====>', this.props)
    const { data, pages, loading, page, pageSize } = this.props
    const columns = [{
      id: 'instCd',
      Header: 'instCd',
      accessor: 'instCd' // String-based value accessors!
    }, {
      id: 'nm',
      Header: 'nm',
      accessor: 'nm'
    }, {
      id: 'merchantEmail', // Required because our accessor is not a string
      Header: 'merchantEmail',
      accessor: d => d.merchantEmail, // Custom value accessors!,
      Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
    }, {
      id: 'cd',
      Header: props => <span>cd</span>, // Custom header components!
      accessor: 'cd'
      // accessor: 'friend.age'
    }, {
      Header: 'isInactive',
      accessor: 'isInactive'
    }, {
      Header: 'pgid',
      accessor: 'pgid'
    }, {
      Header: 'website',
      accessor: 'website'
    }, {
      Header: 'createdBy',
      accessor: 'createdBy'
    }]
    return (
      <div>
        <ReactTable
          columns={columns}
          manual // Forces table not to paginate or sort automatically, so we can handle it server-side
          data={data}
          page={page}
          pages={pages} // Display the total number of pages
          loading={loading} // Display the loading overlay when we need it
          onFetchData={this.handleOnFetchData} // Request new data when things change
          filterable
          defaultPageSize={pageSize}
          className='-striped -highlight'
        />
      </div>
    )
  }
}
