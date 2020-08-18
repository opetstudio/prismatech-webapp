import React, { Component } from 'react'
import Loader from '../Loader/Loader'
// import { Colors } from '../../Themes'
import _ from 'lodash'

export default class MerchantInfo extends Component {
  componentDidUpdate (prevProps, prevState) {
    if (
      !_.isEqual(prevProps.userMerchantCode, this.props.userMerchantCode) &&
      !_.isEmpty(this.props.userMerchantCode)
    ) {
      console.log('componentDidUpdate call merchantReadOneRequest=', this.props)
      const { userMerchantCode, userMerchantId } = this.props
      this.props.merchantReadOneRequest({ userMerchantCode, userMerchantId })
    }
  }

  componentDidMount () {
    const { userMerchantCode, userMerchantId } = this.props
    if (!_.isEmpty(userMerchantCode)) {
      this.props.merchantReadOneRequest({ userMerchantCode, userMerchantId })
    }
  }

  render () {
    // console.log('render')
    console.log('render merchant info props=', this.props)
    const {
      instCd,
      nm,
      website,
      merchantMobileNo,
      merchantEmail,
      createdDt,
      addr,
      frontendCallbackUrl,
      backendCallbackUrl
    } = this.props.merchantDetail || {}

    if (this.props.isRequesting) return <Loader type="rpmerah"/>
    return (
      <div>
        <strong><i className='fas fa-book mr-1' /> Merchant Name</strong>
        <p className='text-muted'>{nm}</p>
        <hr />
        <strong><i className='fas fa-book mr-1' /> Merchant Code</strong>
        <p className='text-muted'>{instCd}</p>
        <hr />
        <strong><i className='fas fa-book mr-1' /> Website</strong>
        <p className='text-muted'>{website}</p>
        <hr />
        <strong><i className='fas fa-book mr-1' /> Frontend Url</strong>
        <p className='text-muted'>{frontendCallbackUrl}</p>
        <hr />
        <strong><i className='fas fa-book mr-1' /> Backend Url</strong>
        <p className='text-muted'>{backendCallbackUrl}</p>
        <hr />
        <strong><i className='fas fa-book mr-1' /> Merchant Mobile Number</strong>
        <p className='text-muted'>{merchantMobileNo}</p>
        <hr />
        <strong><i className='fas fa-book mr-1' /> Merchant Email</strong>
        <p className='text-muted'>{merchantEmail}</p>
        <hr />
        <strong><i className='fas fa-book mr-1' /> Created Date Time</strong>
        <p className='text-muted'>{createdDt}</p>
        <hr />
        <strong><i className='fas fa-book mr-1' /> Address</strong>
        <p className='text-muted'>{addr}</p>
        {/* <hr /> */}
      </div>
    )
  }
}

// {/* <dl className='dl-horizontal'>
//         <dt>Merchant Name</dt>
//         <dd>{nm}</dd>
//         <dt>Merchant Code</dt>
//         <dd>{instCd}</dd>
//         <dt>website</dt>
//         <dd>{website}</dd>
//         <dt>Frontend Url</dt>
//         <dd>{frontendCallbackUrl}</dd>
//         <dt>Backend Url</dt>
//         <dd>{backendCallbackUrl}</dd>
//         <dt>Merchant Mobile Number</dt>
//         <dd>{merchantMobileNo}</dd>
//         <dt>Merchant Email</dt>
//         <dd>{merchantEmail}</dd>
//         <dt>Created Date Time</dt>
//         <dd>{createdDt}</dd>
//         <dt>Address</dt>
//         <dd>{addr}</dd>
//       </dl> */}
