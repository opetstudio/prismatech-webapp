import React, { Component } from 'react'
import Helmet from 'react-helmet'
import TablePaymentgw from './TablePaymentgw'

class PaymentgwListPageComponent extends Component {
  componentWillUnmount () {
    console.log('componentWillUnmount')
    this.props.paymentgwRequestPatch({ isRequesting: false, responseCode: '', responseMessage: '' })
  }

  render () {
    // console.log('render')
    return (
      <div className='content-wrapper'>
        <Helmet>
          <title>Daftar Payment Gateway</title>
          <body className='hold-transition skin-blue sidebar-mini' />
        </Helmet>
        <section className='content-header'>
          <h1>Daftar Payment Gateway</h1>
          <ol className='breadcrumb'>
            <li>
              <a href='/#'>
                <i className='fa fa-dashboard' /> Payment Gateway
              </a>
            </li>
            <li className='active'>Daftar Payment Gateway</li>
          </ol>
        </section>
        <section className='content'>
          <div className='row'>
            <div className='col-xs-12'>
              <div className='box'>
                {/* <div className='box-header'>
                </div> */}
                {/* <div className='box-body table-responsive no-padding'> */}
                <div className='box-body'>
                  <div className='row'>
                    <div className='col-sm-12'>
                      <TablePaymentgw
                        data={this.props.dataPaymentgw}
                        page={this.props.page}
                        pages={this.props.pages}
                        loading={this.props.isRequesting}
                        requestData={this.props.paymentgwReadRequest}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}
export default PaymentgwListPageComponent
