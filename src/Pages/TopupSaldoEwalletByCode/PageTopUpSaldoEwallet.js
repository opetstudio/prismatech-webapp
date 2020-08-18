import React, {Component} from 'react'
import Helmet from 'react-helmet'
import moment from 'moment'
import TopupAction from '../../Containers/RpMerchant/TopupEmoney/redux'
import {
  
  _toRp,
  _getOverallAmount,
  _getTotalTrx,
  _getTodayAmount,
  _formatClientDate,
  _filterSummaryHist
} from './FunctionTopUpSaldoEwallet'
import Shimmer from "react-shimmer-effect";
import LoginCheck from '../../Containers/Login/LoginCheck'
import ContentHeader from '../../Components/ContentHeader'
import {connect} from 'react-redux'
import {getSession} from '../../Utils/Utils'
import {injectIntl} from 'react-intl'
import {withRouter} from 'react-router-dom'
import Loader from '../../Components/Loader/Loader'
import Cleave from 'cleave.js/react';
import {isEmpty} from 'ramda'
import $ from 'jquery'

class PageTopUpSaldoEwallet extends Component {
  constructor(props)
  {
    super(props)
    this._input=this._input.bind(this)
    this._result=this._result.bind(this)
    this.state={
      amount:0,
      email:''
    }
  }

  componentWillUnmount()
  {
    this.props.reset()
  }

  componentWillMount()
  {
    this.props.reset()
  }
  _formOnSubmit(e)
  {
    if (e) e.preventDefault()
    // const amount = this.refs.amount.value
    const amount = this.state.amount
    const email = this.refs.email.value
    this.setState({email})
    if(amount!=0)
    {
      this.props.doTopupbyCode({amount,email}) 
    }

  }
  _result()
  {
    const {qr} = this.props
    window.callModalErrorDismissable('Sucessfully make order top up to '+this.state.email,'success')
    window.callModalErrorDismissable('Scan this qr to topup','success',this.state.df)
    // eslint-disable-next-line no-unused-expressions
    return (
      <center>
        <div className='col-md-6' className="coloumn">
          <br/>
            <br/>
            <p style={{fontSize:20}}><b>Scan untuk top-up</b></p>
            <img src={qr} width={'40%'} />
            {/* <label style={{width:'60%',padding:10,backgroundColor:'#cdcdcd'}}>Transaction ID: {this.props.transaction_id}</label> */}
            <button  type="submit" style={{width:'60%'}} className="btn btn-block btn-outline-danger btn-lg" onClick={()=>this.props.doResultCancel()}>Ok</button>
            <br/>
            <br/>
        </div>  
      </center>
    )
  }
  _input(amount)
  {
    // eslint-disable-next-line no-unused-expressions
    const {isRequesting, errors, isResult,status} = this.props
    if(!isEmpty(errors)){window.callModalErrorDismissable(errors,'error')}
    
    
    return(
      
      <div className='content'>
        <div className="row">

            <div className='col-md-6'>
              <div className='card-body' style={{ paddingBottom: 3 }}>
                  <div className='col-md-12 pl-2 pr-2'>
                    <div className='info-box' style={{ background: 'linear-gradient(to right bottom, #DE6262, #FFB88C)' }}>
                      <div className='info-box-content p-0'>
                        {!isRequesting &&
                            <form onSubmit={(e) => this._formOnSubmit(e)} > 
                                <div className="form-group">
                                  <br/>
                                  <div className="input-group mb-3 col-9">
                                    <input type="email" className="form-control" placeholder="Masukan email untuk top-up" required style={{textalign:'center'}} ref="email" />
                                    <div className="input-group-append">
                                      <div className="input-group-text">
                                        <span className="fas fa-envelope" />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="input-group mb-3 col-7">
                                    {/* <select className="form-control col-7" ref="amount" required>
                                      <option value={0}>--Select Amount--</option>                    
                                      {amount.map((r,i)=>(
                                        <option value={r} key={i}>{_toRp(r)}</option>  
                                      ))
                                      }
                                    </select> */}
                                     <Cleave
                                    ref="amount"
                                    value={0}
                                    className="form-control"
                                    placeholder="Amount to topup"
                                    options={{
                                      // prefix: 'IDR ',
                                      placeholder:'Amount start',
                                      numeral: true,
                                      rawValueTrimPrefix: true,
                                      numeralThousandsGroupStyle: 'thousand'}}
                                    onChange={(e)=>{
                                      this.setState({amount:e.target.rawValue})
                                      if(!isEmpty(errors))this.props.resetIndividual({status:0,errors:[]})
                                    }}/>
                                    <div className="input-group-append">
                                      <div className="input-group-text">
                                        <span className="fas fa-money-bill-wave" />
                                      </div>
                                    </div> 
                                  </div>
                                </div>
                              <div>
                              <button  type="submit" id="qr-topup-merchant" className="btn btn-block bg-gradient-danger btn-flat" style={{color:'white'}} >Topup</button>
                              <br/>
                                {isRequesting &&(
                                  <center style={{margin:5}}><Loader loading type="rpmerah"/></center>
                                )}
                            </div>
                              {/* {!isEmpty(errors) && (
                                <div className='row'> 
                                  <div className='col-12'>
                                    <div style={{color:'red'}}><center>{errors}</center></div>
                                  </div>
                                </div>
                              )} */}
                          </form>
                        }
                        
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
  render() {
    const {isRequesting, error, isResult,status} = this.props
    const amount=[5000,10000,20000,50000,100000]
    
    return (
      <div className='content-wrapper'>
        <LoginCheck/>
        <Helmet>
          <title>Topup E-wallet</title>
          <body
            className='hold-transition sidebar-mini layout-fixed layout-navbar-fixed layout-footer-fixed'/>
        </Helmet>
        <ContentHeader
          title='Topup Emoney'
          breadcrumb={[{title: 'Home',link: '#'}, {title: 'Topup E-money',link: 'topup-ewallet-saldo',isActive: false}]}/>
         {isResult && this._result(amount)}
         {!isResult && this._input(amount)}
      </div>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    errors: state.rptopupemoney.errors, 
    status: state.rptopupemoney.status, 
    isRequesting: state.rptopupemoney.isRequesting, 
    isResult: state.rptopupemoney.isResult,
    qr: state.rptopupemoney.qr_code,
    transaction_id: state.rptopupemoney.transaction_id,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    resetIndividual: data => dispatch(TopupAction.doTopupResetIndividual(data)),
    doTopupbyCode: data => dispatch(TopupAction.doTopupByCode(data)),
    doTopup: data => dispatch(TopupAction.doTopup(data)),
    doResult: data => dispatch(TopupAction.doResult()),
    doResultCancel: data => dispatch(TopupAction.doResultCancel()),
    reset: data => dispatch(TopupAction.doTopupReset())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(withRouter(PageTopUpSaldoEwallet)))