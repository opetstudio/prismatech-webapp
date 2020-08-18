import React, { Component } from 'react'
import qs from 'qs'
// import _ from 'lodash'
import TrxDetailForRefundReview from '../../Containers/Transaction/TrxDetailForRefundReview'
export default class PageTrxDetailForRefundReview extends Component {
  render () {
    // console.log('render')
    return (
      <div className='content-wrapper'>
        <section className='content-header'>
          <h1>
          Refund Transaction Review
          </h1>
          <ol className='breadcrumb'>
            <li><a href='/#'><i className='fa fa-dashboard' /> Transaksi</a></li>
            <li className='active'>Refund Transaction Review</li>
          </ol>
        </section>
        <section className='content'>
          <div className='box'>
            <div class='box-header with-border'>
              <i class='fa fa-warning' />
              <h3 class='box-title'>Transaction Info</h3>
            </div>
            <div className='box-body'>
              {<TrxDetailForRefundReview transactionId={qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).id} />}
            </div>
            <div className='box-footer'>
              <button type='button' className='btn btn-success'>Approve Refund</button>  <button type='button' className='btn btn-danger'>Reject Refund</button>
            </div>
          </div>
        </section>

      </div>
    )
  }
}
