import React, { Component } from 'react'
import qs from 'qs'
// import _ from 'lodash'
import TrxDetail from '../../Containers/Transaction/TrxDetail'
export default class PageTrxDetailForRefundRequest extends Component {
  render () {
    // console.log('render')
    const refundId = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).id
    return (
      <div className='content-wrapper'>
        <section className='content-header'>
          <h1>
          Refund Transaction Request
          </h1>
          <ol className='breadcrumb'>
            <li><a href='/#'><i className='fa fa-dashboard' /> Transaksi</a></li>
            <li className='active'>Refund Transaction</li>
          </ol>
        </section>
        <section className='content'>
          <div className='box'>
            <div class='box-header with-border'>
              <i class='fa fa-warning' />
              <h3 class='box-title'>Transaction Info</h3>
            </div>
            <div className='box-body'>
              {<TrxDetail transactionId={qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).id} />}
            </div>
            <div className='box-footer'>
              <button type='button' className='btn btn-primary' onClick={this.props.transactionRefundRequest({ refundId })}>Do Refund</button>
            </div>
          </div>
        </section>

      </div>
    )
  }
}
