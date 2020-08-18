import React, { Component } from 'react'
import _ from 'lodash'
import Loader from '../Loader/Loader'

export default class TrxDetail extends Component {
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
      this.props.transactionFetchOne({ id: this.state.id })
    }
  }

  componentDidMount () {
    if (!_.isEmpty(this.props.userMerchantCode)) this.props.transactionFetchOne({ id: this.state.id })
  }

  render () {
    // console.log('render')
    console.log('TrxDetail render props', this.props)
    const { ir, rc, rd } = this.props.transactionFetchOneMSG
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
        {rc !== 'MBDD00' && (<div class='alert alert-danger'>{`transactionFetchOne => ${rd}`}</div>)}
        <dl className='dl-horizontal'>
          <dt>Ecomm. Ref. Number</dt>
          <dd>{ecommRefNo}</dd>
          <dt>Created Date Time</dt>
          <dd>{createdDt}</dd>
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
