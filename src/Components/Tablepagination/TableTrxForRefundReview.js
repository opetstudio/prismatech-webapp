import React, { Component } from 'react'
import TableContent from './TableContent'
import _ from 'lodash'
class TableTrxForRefundReview extends Component {
  componentDidUpdate (prevProps, prevState) {
    if (
      !_.isEqual(prevProps.userMerchantCode, this.props.userMerchantCode) &&
      !_.isEmpty(this.props.userMerchantCode)
    ) {
      this.props.tablepaginationFetchAllTrxForRefundReview({})
    }
  }

  render () {
    // console.log('render')
    return (
      <TableContent
        columns={this.props.columns}
        data={this.props.data}
        page={this.props.page}
        pages={this.props.pages}
        pageSize={this.props.pageSize}
        loading={this.props.isRequesting}
        requestData={(d) => this.props.tablepaginationFetchAllTrxForRefundReview({ ...d })}
      />
    )
  }
}
export default TableTrxForRefundReview
