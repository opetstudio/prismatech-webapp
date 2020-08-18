import React, { Component } from 'react'
import qs from 'qs'
// import _ from 'lodash'
import TrxDetail from '../../Containers/Transaction/TrxDetail'
export default class PageTrxDetail extends Component {
  render () {
    // console.log('render')
    return (
      <div className='content-wrapper'>
        <section className='content-header'>
          <h1>
          Transaksi Detail
          </h1>
          <ol className='breadcrumb'>
            <li><a href='/#'><i className='fa fa-dashboard' /> Transaksi</a></li>
            <li className='active'>Transaksi Detail</li>
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
          </div>
        </section>

      </div>
    )
  }
}
