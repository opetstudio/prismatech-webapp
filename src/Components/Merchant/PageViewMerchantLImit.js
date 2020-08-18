import React, { Component } from 'react'
// import { path } from 'ramda'
import Helmet from 'react-helmet'
import _ from 'lodash'
import AppConfig from '../../Config/AppConfig'
import { getAccessToken } from '../../Utils/Utils'
const basePath = AppConfig.basePath

class PageViewMerchantLImit extends Component {
  componentDidUpdate (prevProps, prevState) {
    if (
      !_.isEqual(prevProps.userMerchantCode, this.props.userMerchantCode) &&
      !_.isEmpty(this.props.userMerchantCode)
    ) {
      this.props.merchantRequestMinMaxLimit({ userMerchantCode: this.props.userMerchantCode })
    }
  }

  componentDidMount () {
    if (!_.isEmpty(this.props.userMerchantCode)) this.props.merchantRequestMinMaxLimit({ userMerchantCode: this.props.userMerchantCode })
  }

  render () {
    // console.log('render')
    console.log('PageViewMerchantLImit props==>', this.props)
    const {
      merchantLimitMin,
      merchantLimitMax
    } = this.props
    return (
      <div className='content-wrapper'>
        <Helmet>
          <title>Merchant Limit</title>
          <body className='hold-transition skin-blue sidebar-mini' />
        </Helmet>
        <section className='content-header'>
          <h1>Merchant Limit</h1>
          <ol className='breadcrumb'>
            <li>
              <a href='/#'>
                <i className='fa fa-dashboard' /> Merchant
              </a>
            </li>
            <li className='active'>Merchant Limit</li>
          </ol>
        </section>
        <section className='content'>
          <form onSubmit={e => this._onSubmitForm(e)}>
            <div className='box box-primary'>
              <div className='box-header with-border'>
                <h3 className='box-title'>Merchant Limit</h3>
              </div>
              <div className='box-body'>
                <dl className='dl-horizontal'>
                  <dt>Minimal Limit</dt>
                  <dd>{merchantLimitMin || 0}</dd>
                  <dt>Maximal Limit</dt>
                  <dd>{merchantLimitMax || 0}</dd>
                </dl>
              </div>
              <div className='box-footer'>
                <button type='submit' className='btn btn-primary' onClick={(e) => this.props.history.push(`${basePath}/merchant/change-limit/${getAccessToken(this.props.sessionToken)}`)}>
                  Edit
                </button>
              </div>
            </div>
          </form>
        </section>
      </div>
    )
  }
}
export default PageViewMerchantLImit
