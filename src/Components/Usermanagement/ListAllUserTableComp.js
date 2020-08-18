import React, { Component } from 'react'
import TablePaginationContainer from '../../features/TablePagination/TablePaginationContainer'
export default class ListAllUserTableComp extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  render () {
    // console.log('render')
    const columns = [{
      id: 'ecommRefNo',
      Header: 'User Id',
      accessor: 'ecommRefNo' // String-based value accessors!
    }, {
      id: 'coCcyAmt', // Required because our accessor is not a string
      Header: 'Full Name',
      accessor: d => d.coCcyAmt, // Custom value accessors!,
      Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
    }, {
      id: 'coDt',
      Header: props => <span>Email</span>, // Custom header components!
      accessor: 'coDt'
      // accessor: 'friend.age'
    }, {
      Header: 'Group',
      accessor: 'consUsernameMerchant'
    }, {
      Header: 'Phone Number',
      accessor: 'paymentGatewayCode'
    }, {
      Header: 'Address',
      accessor: 'mercId'
    }, {
      Header: 'Status',
      accessor: 'paySts'
    },
    {
      Header: 'Action',
      accessor: 'paySts'
    }
  ]
    return (
      <div>
        <TablePaginationContainer
          url='/plink/merchant/findBy'
          columns={columns}
          userMerchantCode={this.props.userMerchantCode}
        />
      </div>
    )
  }
}
