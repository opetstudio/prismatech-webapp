import React, { Component } from 'react'
import Helmet from 'react-helmet'
import PaymentAction from '../../Containers/RpMerchant/PayBill/redux'
import {

  _toRp,
  _getOverallAmount,
  _getTotalTrx,
  _getTodayAmount,
  _formatClientDate,
  _filterSummaryHist
} from './FunctionPayment'
import LoginCheck from '../../Containers/Login/LoginCheck'
import ContentHeader from '../../Components/ContentHeader'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { withRouter } from 'react-router-dom'
import Loader from '../../Components/Loader/Loader'
import Cleave from 'cleave.js/react'
import { isEmpty } from 'ramda'

class BuatTagihan extends Component {
  constructor (props) {
    super(props)
    this._input = this._input.bind(this)
    this._result = this._result.bind(this)
    this.state = {
      amount: 0,
      name: '',
      text: ''

    }
  }

  componentWillUnmount () {
    this.props.reset()
  }

  componentDidMount () {
    this.props.reset()
  }

  _formOnSubmit (e) {
    if (e) e.preventDefault()
    const name = this.refs.name.value
    const amount = this.state.amount
    const text = this.refs.text.value
    this.setState({ name, text })
    if (amount != 0) {
      this.props.doPaymentbyCode({ name, amount, text })
    }
  }

  _result () {
    const { qr } = this.props
    window.callModalErrorDismissable('Sucessfully make order top up to ' + this.state.name, 'success')
    window.callModalErrorDismissable('Scan this qr to topup', 'success', this.state.df)
    // eslint-disable-next-line no-unused-expressions
    return (

      <div>
        <center>
          <div className='col-md-6' className='coloumn'>
            <br />
            <br />
            <p style={{ fontSize: 20 }}><b>Scan untuk Pembayaran Tagihan</b></p>
            <br />
          </div>
        </center>
        <div style={{ marginLeft: 460 }}>
          <p style={{ fontSize: 15 }}><b>Nama Tagihan : {this.state.name}<br />Jumlah Tagihan : Rp {this.state.amount}<br />NoRef : {this.state.text}</b></p>
        </div>
        <center>
          <br />
          <img src={qr} width='45%' />
          {/* <label style={{width:'60%',padding:10,backgroundColor:'#cdcdcd'}}>Transaction ID: {this.props.transaction_id}</label> */}
          <button type='submit' style={{ width: '50%' }} className='btn btn-block btn-outline-danger btn-lg' onClick={() => this.props.doResultCancel()}>Ok</button>
          <br />
          <br />
        </center>
      </div>

    )
  }

  _input (amount) {
    // eslint-disable-next-line no-unused-expressions
    const { isRequesting, errors, isResult, status } = this.props
    if (!isEmpty(errors)) { window.callModalErrorDismissable(errors, 'error') }

    return (

      <div className='content'>
        <div className='row'>

          <div className='col-md-6'>
            <div className='card-body' style={{ paddingBottom: 3 }}>
              <div className='col-md-12 pl-2 pr-2'>
                <div className='info-box' style={{ background: 'linear-gradient(to right bottom, #DE6262, #FFB88C)' }}>
                  <div className='info-box-content p-0'>
                    {!isRequesting &&
                      <form onSubmit={(e) => this._formOnSubmit(e)}>
                        <div className='form-group'>
                          <br />
                          <div className='input-group mb-3 col-9 namatagihan'>
                            <input
                              type='text' className='form-control' placeholder='Masukan Nama Tagihan' required style={{ textalign: 'center' }} ref='name' onChange={(e) => {
                                this.setState({ name: e.target.rawValue })
                                if (!isEmpty(errors)) this.props.resetIndividual({ status: 0, errors: [] })
                              }}
                            />

                          </div>
                          <br />
                          <div className='input-group mb-3 col-9 amount'>
                            <Cleave
                              ref='amount'
                              className='form-control'
                              placeholder='Masukan Jumlah Tagihan'
                              options={{
                                // prefix: 'IDR ',
                                placeholder: 'Amount start',
                                numeral: true,
                                rawValueTrimPrefix: true,
                                numeralThousandsGroupStyle: 'thousand'
                              }}
                              onChange={(e) => {
                                this.setState({ amount: e.target.rawValue })
                                if (!isEmpty(errors)) this.props.resetIndividual({ status: 0, errors: [] })
                              }}
                            />

                          </div>
                          <br />
                          <div className='input-group mb-3 col-7 noref'>
                            {/* <select className="form-control col-7" ref="amount" required>
                                      <option value={0}>--Select Amount--</option>
                                      {amount.map((r,i)=>(
                                        <option value={r} key={i}>{_toRp(r)}</option>
                                      ))
                                      }
                                    </select> */}
                            <input
                              type='text' className='form-control' placeholder='Masukan No.Ref Tagihan' required style={{ textalign: 'center' }} ref='text' onChange={(e) => {
                                this.setState({ text: e.target.rawValue })
                                if (!isEmpty(errors)) this.props.resetIndividual({ status: 0, errors: [] })
                              }}
                            />
                          </div>
                        </div>
                        <div>
                          <button type='submit' id='qr-payment' className='btn btn-block bg-gradient-danger btn-flat' style={{ color: 'white' }}>Bayar</button>
                          <br />
                          {isRequesting && (
                            <center style={{ margin: 5 }}><Loader loading type='rpmerah' /></center>
                          )}
                        </div>
                        {/* {!isEmpty(errors) && (
                                <div className='row'>
                                  <div className='col-12'>
                                    <div style={{color:'red'}}><center>{errors}</center></div>
                                  </div>
                                </div>
                              )} */}
                      </form>}

                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <Loader type="rpmerah"/> */}
          {/* <div className='col-md-6'>
                <div className='card-body' style={{ paddingBottom: 3 }}>
                  <div className='col-md-15 pl-2 pr-2'>
                        <div className='info-box' style={{ background: 'linear-gradient(to right bottom, #58c8f5, #2f6e87)' }}>
                          <span className='info-box-icon-sm'><i className='fas fa-money-bill-wave' style={{ color: 'white' }} /></span>
                          <div className='info-box-content p-0'>
                                <span className='info-box-number' style={{ fontSize: 50, textAlign: 'right', padding: 21, paddingRight: 0, color: 'white' }}>{0}<small /></span>
                                <span className='info-box-text' style={{ fontSize: 20, textAlign: 'right', color: 'white' }}>Your current balance</span>
                          </div>
                        </div>
                      </div>
                  </div>
            </div> */}
        </div>
      </div>
    )
  }

  render () {
    const { isRequesting, error, isResult, status } = this.props
    const amount = [5000, 10000, 20000, 50000, 100000]

    return (
      <div className='content-wrapper'>
        <LoginCheck />
        <Helmet>
          <title>Bayar Tagihan</title>
          <body
            className='hold-transition sidebar-mini layout-fixed layout-navbar-fixed layout-footer-fixed'
          />
        </Helmet>
        <ContentHeader
          title='Bayar Tagihan'
          breadcrumb={[{ title: 'Home', link: '#' }, { title: 'Bayar Tagihan', link: 'bayar-tagihan', isActive: false }]}
        />
        {isResult && this._result(amount)}
        {!isResult && this._input(amount)}
      </div>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    errors: state.rppayment.errors,
    status: state.rppayment.status,
    isRequesting: state.rppayment.isRequesting,
    isResult: state.rppayment.isResult,
    qr: state.rppayment.qr_code,
    transaction_id: state.rppayment.transaction_id
  }
}
const mapDispatchToProps = dispatch => {
  return {
    resetIndividual: data => dispatch(PaymentAction.doPaymentResetIndividual(data)),
    doPaymentbyCode: data => dispatch(PaymentAction.doPaymentByCode(data)),
    doPayment: data => dispatch(PaymentAction.doPayment(data)),
    doResult: data => dispatch(PaymentAction.doResult()),
    doResultCancel: data => dispatch(PaymentAction.doResultCancel()),
    reset: data => dispatch(PaymentAction.doPaymentReset())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(withRouter(BuatTagihan)))
