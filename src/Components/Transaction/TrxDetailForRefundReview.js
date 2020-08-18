import React, { Component } from 'react'
import _ from 'lodash'
import Moment from 'moment'
import Loader from '../Loader/Loader'

export default class TrxDetailForRefundReview extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id: this.props.transactionId
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (
      !_.isEqual(prevProps.userMerchantCode, this.props.userMerchantCode) &&
      !_.isEmpty(this.props.userMerchantCode)
    ) {
      this.props.transactionRefundFetchOne({ id: this.state.id })
    }
  }

  componentDidMount () {
    if (!_.isEmpty(this.props.userMerchantCode)) this.props.transactionRefundFetchOne({ id: this.state.id })
  }

  render () {
    // console.log('render')
    console.log('TrxDetail render props', this.props)
    const { ir, rc, rd } = this.props.transactionRefundFetchOneMSG
    const {
      ecommRefNo,
      createdDt,
      mercCd,
      mercNm,
      consUsernameMerchant,
      issuerCode,
      mercRefNo,
      paySts,
      payBnkRefNo,
      coCcyAmt
    } = this.props.transactionDetail || {}
    if (ir) return <Loader loading />
    return (
      <div>
        {rc !== 'MBDD00' && (<div class='alert alert-danger'>{`transactionRefundFetchOne => ${rd}`}</div>)}
        <dl className='dl-horizontal'>
          <dt>Ecomm. Ref. Number</dt>
          <dd>{ecommRefNo}</dd>
          <dt>Created Date Time</dt>
          <dd>{Moment(createdDt).format('YYYY-MM-DD HH:mm:ss')}</dd>
          <dt>Merchant</dt>
          <dd>{mercCd} - {mercNm}</dd>
          <dt>Merchant User Id</dt>
          <dd>{consUsernameMerchant}</dd>
          <dt>Source Of Fund</dt>
          <dd>{issuerCode}</dd>
          <dt>Merchant Ref. Number</dt>
          <dd>{mercRefNo}</dd>
          <dt>Bank Ref. Number</dt>
          <dd>{payBnkRefNo}</dd>
          <dt>Amount</dt>
          <dd>{coCcyAmt}</dd>
          <dt>Status</dt>
          <dd>{paySts}</dd>
        </dl>
      </div>
    )
  }
}
