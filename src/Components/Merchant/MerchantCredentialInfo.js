import React, { Component } from 'react'
// import { Colors } from '../../Themes'
import Loader from '../Loader/Loader'
import Moment from 'moment'
import _ from 'lodash'

export default class MerchantCredentialInfo extends Component {
  componentDidUpdate (prevProps, prevState) {
    if (
      !_.isEqual(prevProps.userMerchantCode, this.props.userMerchantCode) &&
      !_.isEmpty(this.props.userMerchantCode)
    ) {
      this.props.merchantGetCredential({ userMerchantCode: this.props.userMerchantCode })
    }
  }

  componentDidMount () {
    if (!_.isEmpty(this.props.userMerchantCode)) this.props.merchantGetCredential({ userMerchantCode: this.props.userMerchantCode })
  }

  render () {
    // console.log('render')
    const {
      keyId,
      merchantId,
      merchantSecretKey,
      validFrom,
      validTo,
      publicKey
      // remark,
      // updatedDate,
      // frontendCallbackUrl,
      // backendCallbackUrl
    } = this.props.merchantCredential || {}
    if (this.props.isRequesting) return <Loader loading />
    const dtFrom = new Date(Moment(validFrom).format('YYYY-MM-DD hh:mm:ss'))
    const dtTo = new Date(Moment(validTo).format('YYYY-MM-DD hh:mm:ss'))
    const now = new Date()
    const status = now >= dtFrom && now <= dtTo ? 'ACTIVE' : 'INACTIVE'
    return (
      <div>
        <strong><i className='fas fa-book mr-1' /> Merchant Key ID</strong>
        <p className='text-muted'>{keyId}</p>
        <hr />
        <strong><i className='fas fa-book mr-1' /> Merchant Id</strong>
        <p className='text-muted'>{merchantId}</p>
        <hr />
        <strong><i className='fas fa-book mr-1' /> Current Secret Key</strong>
        <p className='text-muted'>{merchantSecretKey}</p>
        <hr />
        <strong><i className='fas fa-book mr-1' /> RSA Key</strong>
        <p className='text-muted'>{publicKey}</p>
        <hr />
        <strong><i className='fas fa-book mr-1' /> Valid From</strong>
        <p className='text-muted'>{Moment(validFrom).format('YYYY-MM-DD hh:mm:ss')}</p>
        <hr />
        <strong><i className='fas fa-book mr-1' /> Valid To</strong>
        <p className='text-muted'>{Moment(validTo).format('YYYY-MM-DD hh:mm:ss')}</p>
        <hr />
        <strong><i className='fas fa-book mr-1' /> Status</strong>
        <p className='text-muted'>{status}</p>
        {/* <hr /> */}
      </div>
    )
  }
}
