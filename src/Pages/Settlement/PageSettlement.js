import React, { Component } from 'react'
import Helmet from 'react-helmet'
import moment from 'moment'
import { Line, Doughnut, Pie } from 'react-chartjs-2'
import SummaryAction from '../../Containers/RpMerchant/Transaction/redux'
import SettlementAction from '../../Containers/RpMerchant/Settlement/redux'
import {_formatClientDate,_toRp,_getOverallAmount,_getSumAmount,_getTodayAmount,_sortSettlement}  from './DasboardFunction'
import Shimmer from "react-shimmer-effect";
import LoginCheck from '../../Containers/Login/LoginCheck'
import ContentHeader from '../../Components/ContentHeader'
import { connect } from 'react-redux'
import {getSession} from '../../Utils/Utils'
import { injectIntl } from 'react-intl'
import { withRouter } from 'react-router-dom'
import Loader from '../../Components/Loader/Loader'
import { stat } from 'fs'
import Cleave from 'cleave.js/react';
import { CSVLink, CSVDownload } from "react-csv";
import ReactTable from 'react-table'

class PageSettlement extends Component {

  componentWillMount()
  {
    const merchant_id=getSession('merchant_id')
    this.props.fetchSettlement({merchant_id})
  }
    _table(data,isRequesting)
  {
    const columns=[
      {Header:'Settlement ID',accessor:'settlement_id',Cell:e=><center>{e.value}</center>},
      {Header:'Payment date',accessor:'payment_date',Cell:e=><center>{_formatClientDate(e.value)}</center>},
      {Header:'Settlement Amount',accessor:'settlement_amount',Cell:e=><center>{_toRp(e.value)}</center>},
    ]
    console.log("isrequesting>>>",isRequesting)
   if(!isRequesting)
   {
      if(data.length>0)
      {
          return (
            <div className="card-body table-responsive p-0" style={{height: '100%'}}>

                  <ReactTable
                    data={_sortSettlement(data)}
                    columns={columns}
                    loading={isRequesting}
                    
                    // onFetchData={()=>this._loadData()}
                    pages={10}
                  />
            {/* <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Id Transaction</th>
                  <th>Amount</th>
                  <th>Method</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
              {_filterSummaryHist(data,10).map((r,i)=>
                  <tr style={{backgroundColor:''}} key={i}>
                    <td>{r.transaction_id}</td>
                    <td>{_toRp(r.transaction_amount)}</td>
                    <td>{r.transaction_method}</td>
                    <td>{_formatClientDate(r.created_at)}</td>
                  </tr>
              )}
              </tbody>
            </table> */}
          </div>
        )
      }
      else{
        return (
          <div className="card-body table-responsive p-0" style={{height: 300}}>
            <center>Sorry, you don't have any settlement yet</center>
          </div>
        )
      }
   }
   else{
    return (
        <div className="card-body table-responsive p-0" style={{height: 300}}>
        {/* <table className="table table-head-fixed text-nowrap"> */}
           <center><Loader loading type="rpmerah"/> Fetching</center>
        {/* </table> */}
      </div>
      )
    }
  }
  render() {  
    const {data,isRequesting} = this.props
    // console.log(">>>>>>>>>>",_formatClientDate(1588919872075))
    return (
      <div className='content-wrapper'>
        <LoginCheck />
        <Helmet>
          <title>Home</title>
          <body className='hold-transition sidebar-mini layout-fixed layout-navbar-fixed layout-footer-fixed' />
        </Helmet>
        {/* Content Header (Page header) */}
        <ContentHeader
          title='Settlement'
          breadcrumb={[{ title: 'Home', link: '#' }, { title: 'Settlement', link: null, isActive: true }]}
        />
        {/* /.content-header */}
        {/* Main content */}
        <section className='content'>
          {/* Info boxes */}
          <div className='row'>
              <div className='col-md-6'>
                <div className='card-body' style={{ paddingBottom: 3 }}>
                    <div className='col-md-12 pl-2 pr-2'>
                      <div className='info-box' style={{ background: 'linear-gradient(to right bottom, #FF416C, #FF4B2B)' }}>
                        <span className='info-box-icon-sm'><i className='fas fa-money-bill-wave' style={{ color: 'white' }} /></span>
                        <div className='info-box-content p-0'>
                          <span className='info-box-number' style={{wordWrap:'break-word',fontSize: 50, textAlign: 'right', paddingRight: 0, color: 'white' }}>{_toRp(_getSumAmount(data))}<small/></span>
                          <span className='info-box-text' style={{ wordWrap:'break-word',fontSize: 12, textAlign: 'right', color: 'white' }}>Your saldo to be settled</span>
                        </div>
                      </div>
                    </div>
                </div>
              </div>
              <div className='col-md-6'>
                <div className='card-body' style={{ paddingBottom: 3 }}>
                    <div className='col-md-12 pl-2 pr-2'>
                        <div className="alert alert-info alert-dismissible" style={{marginLeft:20,marginRight:20}}>
                          <button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
                          <h5><i className="icon fas fa-info" /> Settlement!</h5>
                          { data.length > 1 ? 'These are data' : 'This is data' } will automatically settled to your bank account.
                        </div>
                    </div>
                </div>
              </div>
          </div>
        </section>

        <div className="card" style={{marginLeft:10,marginRight:20}}>
          {this._table(data,isRequesting)}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
 console.log("mapStateToProps",state.dashboard);
  
  return {
    error: state.merchantsettlement.errors,
    status: state.merchantsettlement.status,
    isRequesting: state.merchantsettlement.isRequesting,
    data: state.merchantsettlement.settlementData
  }
}
const mapDispatchToProps = dispatch => {
  
  return {
    fetchSettlement: data => dispatch(SettlementAction.fetchSettlement(data)),
    
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  injectIntl(withRouter(PageSettlement))
)