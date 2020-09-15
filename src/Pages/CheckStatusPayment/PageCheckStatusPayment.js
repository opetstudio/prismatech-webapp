import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { isEmpty, isNil } from 'ramda'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import _ from 'lodash'
// import LoginActions, { LoginSelectors } from './redux'
import PurchaseorderActions, { PurchaseorderTypes } from '../../features/PurchaseOrder/redux'
import LoginContainer from '../../Containers/Login/LoginContainer'
import { Colors } from '../../Themes'
import Loader from '../../Components/Loader/Loader'
import LoaderFull from '../../Components/Loader/LoaderFull'

class PageCheckStatusPayment extends Component {
  isEmptyOrNull (str) {
    return isEmpty(str) || isNil(str)
  }

  state={
    isLoading: false
  }

  // componentWillMount()
  // {
  //   this.setState({isLoading:true})
  //   setTimeout(()=>{
  //     this.setState({isLoading:false})
  //   },3000)
  // }
  _formOnSubmit(e) {
    if (e) e.preventDefault()
    const email = this.refs.email.value
    const trxid = this.refs.trxid.value
    const otp = (this.refs.otp || {}).value
    const {otpRefNum, otpValid} = this.props
    if(!otpRefNum)
      this.props.purchaseorderCheckStatusRequestOtp({
        email: email,
        trxid: trxid
      })
    else
    this.props.purchaseorderCheckStatus({
      email: email,
      trxid: trxid,
      otp: otp,
      otpRefNum: otpRefNum,
    })

    return false
  }
  render () {
    const {otpRefNum, otpValid, purchaseOrderDetail} = this.props
    return (
      <div className='login-box'>
        <Helmet>
          <title>Cek Status Pembayaran</title>
          <body className='hold-transition login-page' />
        </Helmet>
        <div className='card'>
          <div className='card-body login-card-body'>
            <p className='login-box-msg'><b>Cek Status Pembayaran</b></p>
            <form onSubmit={(e) => this._formOnSubmit(e)}>
              <div className='input-group mb-3'>
                <input type='email' className='form-control' placeholder='Email' ref='email' required />
                <div className='input-group-append'>
                  <div className='input-group-text'>
                    <span className='fas fa-envelope' />
                  </div>
                </div>
              </div>
              <div className='input-group mb-3'>
                <input type='text' className='form-control' placeholder='Nomor Transaksi' ref='trxid' required />
                <div className='input-group-append'>
                  <div className='input-group-text'>
                    <span className='fas fa-money' />
                  </div>
                </div>
              </div>
              {otpRefNum && <div className='input-group mb-3'>
                <input type='text' className='form-control' placeholder='Otp' ref='otp' required />
                <div className='input-group-append'>
                  <div className='input-group-text'>
                    <span className='fas fa-lock' />
                  </div>
                </div>
              </div>}
              {/* <div className='row'>
                <div className='col-8'>
                  <div className='icheck-primary'> */}
              {/* <input type='checkbox' id='remember' />
                    <label for='remember'>
                      Remember Me
                    </label> */}
              {/* </div>
                </div> */}
              <div className='col-12'>
                {/* <button type='submit' className='btn btn-block btn-primary btn-sm'>Sign In</button> */}
                {(!this.props.loading && !otpRefNum) && <button type='submit' className='btn btn-block btn-primary btn-sm'>Kirim Otp</button>}
                {(!this.props.loading && otpRefNum) && <button type='submit' className='btn btn-block btn-primary btn-sm'>Cek Status Transaksi</button>}
                {this.props.loading && (<center>Please Wait</center>)}
                {/* {this.props.isRequesting && (<center><Loader loading type='rpmerah' /></center>)} */}
              </div>
            <br />
          </form>
              
              <hr />
              {!_.isEmpty(purchaseOrderDetail) && <dl>
                <dt>Nama</dt>
                <dd>{purchaseOrderDetail.full_name}</dd>
                <dt>Email</dt>
                <dd>{purchaseOrderDetail.email}</dd>
                <dt>No Telepon</dt>
                <dd>{purchaseOrderDetail.phone_number}</dd>
                <dt>Nomor Transaksi</dt>
                <dd>{purchaseOrderDetail.session_id}</dd>
                <dt>Status Terakhir</dt>
                <dd>{purchaseOrderDetail.action}</dd>
                <dt>Payment Link</dt>
                <dd><a href={`${purchaseOrderDetail.debitin_paymentpage_backend_baseurl}${purchaseOrderDetail.payment_page_url}`}>Klik link ini untuk Lakukan pembayaran</a></dd>
              </dl>}

          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  console.log('state=>', state)
  return {
    otpRefNum: state.purchaseorder.otpRefNum,
    purchaseOrderDetail: state.purchaseorder.purchaseOrderDetail,
    otpValid: state.purchaseorder.otpValid,
    loading: state.purchaseorder.loading
  }
}
const mapDispatchToProps = dispatch => ({
  purchaseorderCheckStatusRequestOtp: data => dispatch(PurchaseorderActions.purchaseorderCheckStatusRequestOtp(data)),
  purchaseorderCheckStatus: data => dispatch(PurchaseorderActions.purchaseorderCheckStatus(data))
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(PageCheckStatusPayment))

