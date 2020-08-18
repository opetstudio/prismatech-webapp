import React, { Component } from 'react'
import Helmet from 'react-helmet'

export default class PageMerchant extends Component {
  render () {
    // console.log('render')
    return (
      <div className='content-wrapper'>
        <Helmet>
          <title>Merchant</title>
          <body className='hold-transition skin-blue sidebar-mini' />
        </Helmet>
        <section className='content-header'>
          <h1>Merchant</h1>
          <ol className='breadcrumb'>
            <li>
              <a href='/#'>
                <i className='fa fa-dashboard' /> Merchant
              </a>
            </li>
            <li className='active'>Merchant All</li>
          </ol>
        </section>
        <section className='content' />
      </div>
    )
  }
}
