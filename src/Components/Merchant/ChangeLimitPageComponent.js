import React, { Component } from 'react'
import Helmet from 'react-helmet'
import FormUpdateLimitMerchant from '../../Containers/Merchant/FormUpdateLimitMerchant'

class ChangeLimitPageComponent extends Component {
  render () {
    // console.log('render')
    return (
      <div className='content-wrapper'>
        <Helmet>
          <title>Merchant Update Limit</title>
          <body className='hold-transition skin-blue sidebar-mini' />
        </Helmet>
        <section className='content-header'>
          <h1>Rubah Limit</h1>
          <ol className='breadcrumb'>
            <li>
              <a href='/#'>
                <i className='fa fa-dashboard' /> Merchant
              </a>
            </li>
            <li className='active'>Rubah Limit Merchant</li>
          </ol>
        </section>
        <section className='content'>
          <FormUpdateLimitMerchant />
        </section>
      </div>
    )
  }
}
export default ChangeLimitPageComponent
