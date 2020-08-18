import React, { Component } from 'react'
import Helmet from 'react-helmet'
import moment from 'moment'
import { Line, Doughnut, Pie } from 'react-chartjs-2'
import SummaryAction from '../../Containers/RpMerchant/Transaction/redux'
import FilterAction from '../../Containers/RpMerchant/TransactionHistory/redux'
import {_toRp,_formatClientDate,_liveFilterData,_previewData,_csvData}  from './HistoryTrxFunction'
import Shimmer from "react-shimmer-effect";
import LoginCheck from '../../Containers/Login/LoginCheck'
import ContentHeader from '../../Components/ContentHeader'
import { connect,useSelector } from 'react-redux'
import {getSession,loadScriptRecallDatePicker} from '../../Utils/Utils'
import { injectIntl } from 'react-intl'
import { withRouter } from 'react-router-dom'
import Loader from '../../Components/Loader/Loader'
import LoaderFull from '../../Components/Loader/LoaderFull'
import MerchantActions, {MerchantSelectors} from '../../Containers/Dashboard/redux'
import { stat } from 'fs' 
import _ from 'lodash'
import Cleave from 'cleave.js/react';
import { isEmpty, propSatisfies } from 'ramda'
import ReactTable from 'react-table'
// import 'react-table/react-table.css'
import { CSVLink, CSVDownload } from "react-csv";

class PageHistoryTransaction extends Component {
  constructor(props)
  {
    super(props)
    this._table = this._table.bind(this)
    this._loadData = this._loadData.bind(this)
    this._filter = this._filter.bind(this)
    this._handleCheckedIdTransaction= this._handleCheckedIdTransaction.bind(this)
  }
  state={
    isCheckedIdTransaction:false
  }
  _handleCheckedIdTransaction(e)
  {
    this.setState({isCheckedIdTransaction:e.target.checked})
    this.props.filterReset() 
    // if(e.target.checked){
    //   this.setState({isCheckedIdTransaction:e.target.checked})
    //   this.props.filterReset() 
    // }
    // else
    // {
    //   this.setState({isCheckedIdTransaction:e.target.checked})
    //   this.props.filterReset() 
    // }
  }
  _loadData()
  {
    const merchant_id=getSession('merchant_id')
    this.props.transactionSummaryFetch({merchant_id})
  }
  componentWillMount()
  {
    const merchant_id=getSession('merchant_id')
    this.props.transactionSummaryFetch({merchant_id})
    this.props.filterReset()
  }
  componentDidMount () {
    let client=moment.tz.guess()
    let now = (moment.tz(client).format('MM-DD-YYYY')).toString()
    window.callDaterangePicker(this.props.doFilter,now,now)
  }

  daterangeOnChange (start, end) {
    const filter = { transactionStartDate: new Date(parseInt(start)), transactionEndDate: new Date(parseInt(end)) }
    console.log('filter ====>', filter)
    this.props.tablepaginationReadRequestPatch(filter)
  }
  _generatedColor(cond,type)
  {
    switch(type)
    {
      case 'bg':
        if(cond=='SETTLED') return '#28a745'
        else if(cond=='PENDING') return '#ffc107'
        else return '#dc3545u'
        break;
      case 'txt':
        if(cond=='SETTLED') return '#ffff'
        else if(cond=='PENDING') return '#000'
        else return '#ffff'
        break; 
    }
  }
  _table(data,isRequesting)
  {
    const columns=[
      {Header:'Id Transaksi',accessor:'transaction_id'},
      {Header:'Jumlah',accessor:'transaction_amount'},
      {Header:'Metode',accessor:'transaction_method'},
      {Header:'Tanggal',accessor:'created_at'},
      {Header:'Status',accessor:'status'}
    ]
    if(!isRequesting )
    {
       if(data.length>0)
       {
          return(
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <ReactTable
                    data={data}
                    columns={columns}
                    pageSize={10}
                    minRows={10}
                    loading={isRequesting}
                    // getTrProps={(state, rowInfo, column)=>{
                    //   console.log("rowInfo",rowInfo.row.status)
                    //   return{
                    //     style:{
                    //       backgroundColor: this._generatedColor(rowInfo.row.status,'bg'),
                    //       color:this._generatedColor(rowInfo.row.status,'txt') 
                    //     }
                    //   }
                    // }}
                    // onFetchData={()=>this._loadData()}
                    pages={10}
                  />
                  {/* <div className="card-body">
                    <table id="example2" className="table table-bordered table-hover" >
                      <thead>
                        <tr>
                          <th>Id Transaction</th>
                          <th>Amount</th>
                          <th>Method</th>
                          <th>Date</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((r,i)=>
                         <tr key={i}>
                            <td>{r.transaction_id}</td>
                            <td>{_toRp(r.transaction_amount)}</td>
                            <td>{r.transaction_method}</td>
                            <td>{_formatClientDate(r.created_at)}</td>
                            <td>
                              {r.status == 'SETTLED' && <span style={{padding:5,borderRadius:10,backgroundColor:'#28a745',color:'#fff'}}>Settled</span>}
                              {r.status == 'PENDING' && <span style={{padding:5,borderRadius:10,backgroundColor:'#ffc107',color:'#000'}}>Pending</span>}
                              {r.status == 'CANCEL' && <span style={{padding:5,borderRadius:10,backgroundColor:'#dc3545',color:'#fff'}}>Cancel</span>}
                            </td>
                        </tr>
                        )}
                      </tbody>
                    </table>
                  </div> */}
                </div>
              </div>
            </div>
          )
       }
       else
       {
        return(
          <div className="row">
            <div className="col-12">
              <div className="card">
                {/* /.card-header */}
            <div className="card-body">
                  <table id="example2" className="table table-bordered table-hover">
                    <div>{this.props.f_isFiltering ? 'No data found': 'Sorry, you don\'t have any transaction yet'}</div>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )
       }
    }
    else{
      return (
          <div className="card-body table-responsive p-0" style={{height: 300}}>
          <table className="table table-head-fixed text-nowrap">
            <center><Loader loading type="rpmerah"/> Fetching</center>
          </table>
        </div>
        )
    }
  }
  _filter()
  {
    const {data,isRequesting,f_isFiltering,f_amount_start,f_amount_end,f_status} = this.props
    const dataHistory= f_isFiltering ? _liveFilterData(data) : data
    const csvHeader=[
      { label: "Transaction ID", key: "transaction_id" },
      { label: "Amount", key: "transaction_amount" },
      { label: "Method", key: "transaction_method" },
      { label: "Date", key: "created_at" },
      { label: "Status", key: "status" }
    ]
    return (
      <div className='row' >
      <div className='col-md-12' >
        {/* <div className='card' style={{overflow:'visible',height:'100%'}}> */}
          <div className={data.length <=0 || isRequesting && !f_isFiltering ? 'card collapsed-card' : 'card'}>
                <div className='card-header'>
                  <h5 className='card-title'>Filter Data</h5>
                  <div className='card-tools'>
                    <button id='myCardWidget' type='button' className='btn btn-tool' data-card-widget='collapse'>
                      <i className='fas fa-minus' />
                    </button>
                  </div>
                </div>
                <div className='card-body'>
                  <div className="row">
                  <div className='col-md-6'>
                    <div className="form-group mb-3" style={{marginRight:100}}>
                        <label>Cari satu per satu dengan Id Transaksi</label>
                        <div className="input-group col-40">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <input type="checkbox" placeholder="Masukkan id transaksi di sini" onChange={(e)=>this._handleCheckedIdTransaction(e)} />
                            </span>
                          </div>
                          <input type="text" className="form-control" placeholder="Tempel id transaksi di sini" onChange={(e)=>this.props.doFilter({f_trx_id:e.target.value})} disabled={!this.state.isCheckedIdTransaction ? true : false}/>
                        </div>
                        {/* /input-group */}
                      </div>

                    <div className="form-group">
                        <label>Cari berdasarkan status</label>
                        <select className="form-control col-7" defaultValue={f_status} onChange={e=>this.props.doFilter({f_status:e.target.value,f_isFiltering:true})} disabled={this.state.isCheckedIdTransaction ? true : false}>
                          <option value="">--Semua--</option>
                          {/* <option value="SETTLED">SETTLED</option> 
                          <option value="PENDING">PENDING</option>
                          <option value="CANCEL">CANCEL</option> */}
                          {f_status == 'SETTLED' && <option value="SETTLED" selected>SETTLED</option> }
                          {f_status != 'SETTLED' && <option value="SETTLED">SETTLED</option> }
                          {f_status == 'PENDING' && <option value="PENDING" selected>PENDING</option>}
                          {f_status != 'PENDING' && <option value="PENDING">PENDING</option>}
                          {f_status == 'CANCEL' && <option value="CANCEL" selected>CANCEL</option>}
                          {f_status != 'CANCEL' && <option value="CANCEL">CANCEL</option>}
                        </select>
                    </div>
                    
                  </div>
                  <div className='col-6 '>
                    <div className="form-group" >
                        <label>Cari Berdasarkan Tanggal:</label>
                          {/* <div className="input-group "> */}
                              <div className="input-group col-40">
                                  <div className="input-group-prepend">
                                    <span className="input-group-text">
                                      <i className="far fa-calendar-alt" />
                                    </span>
                                  </div>
                                  <input type="text" className="form-control float-right" id="rp-date-range" disabled={this.state.isCheckedIdTransaction ? true : false}/>
                                </div>
                          {/* </div> */}
                      </div>
                    <div className="form-group">
                      <label>Cari Berdasarkan Jumlah:</label>
                      <div className="input-group">
                          <div className="row">
                            <div className="col-5">
                              <Cleave
                              disabled={this.state.isCheckedIdTransaction ? true : false} 
                              value={f_amount_start}
                              className="form-control"
                              placeholder="Jumlah Awal"
                              options={{
                                // prefix: 'IDR ',
                                placeholder:'Jumlah Awal',
                                numeral: true,
                                rawValueTrimPrefix: true,
                                numeralThousandsGroupStyle: 'thousand'}}
                              onChange={(e)=>{if(!isEmpty(e.target.rawValue)){this.props.doFilter({f_amount_start:parseInt(e.target.rawValue)})}}}
                              /> 
                            </div>
                            <label>to</label> 
                            <div className="col-5">
                              <Cleave
                              disabled={this.state.isCheckedIdTransaction ? true : false} 
                              value={f_amount_end}
                              className="form-control"
                              placeholder="Jumlah Akhir"
                              options={{
                                // prefix: 'IDR ',
                                numeral: true,
                                placeholder:'Jumlah Akhir',
                                rawValueTrimPrefix: true,
                                numeralThousandsGroupStyle: 'thousand'}}
                                onChange={(e)=>{if(!isEmpty(e.target.rawValue)){this.props.doFilter({f_amount_end:parseInt(e.target.rawValue)})}}}
                              />
                            </div>
                          </div>
                        </div>
                    </div>
                  </div>
                  </div>
                </div>
                <div className='card-footer'>
                  <button type='button' className='btn btn-danger' onClick={()=>this.props.filterReset()} style={{ marginRight: 5 }}><i className='fas fa-close' /> Atur Ulang</button>
                  {dataHistory.length>0 &&  <CSVLink filename={`rayapay-merchant-transaction-history-${moment().format("DD-MM-YYYY")}.csv`} className='btn btn-success' data={_previewData(dataHistory)} headers={csvHeader}>Download CSV</CSVLink>}
                </div>
          </div>
        {/* </div> */}
      </div>
      </div>
    )
  }

  render() {  
    const csvHeader=[
      { label: "Transaction ID", key: "transaction_id" },
      { label: "Amount", key: "transaction_amount" },
      { label: "Method", key: "transaction_method" },
      { label: "Date", key: "created_at" },
      { label: "Status", key: "status" }
    ]
    const {data,isRequesting,f_isFiltering,f_amount_start,f_amount_end,f_status} = this.props
    const dataHistory= f_isFiltering ? _liveFilterData(data) : data
    // console.log("filtered data>>>",_liveFilterData(data)," || filtered data2>>>",data)
    console.log("ischecked>>>>>>>",this.state.isCheckedIdTransaction)
    
    return (
        <div className='content-wrapper'>
          <LoginCheck />
          <Helmet>
            <title>Riwayat Transaksi</title>
            <body className='hold-transition sidebar-mini layout-fixed layout-navbar-fixed layout-footer-fixed' />
          </Helmet>
          {/* Content Header (Page header) */}
          <ContentHeader
            title='Riwayat Transaksi'
            breadcrumb={[{ title: 'Transaction History', link: null, isActive: true }]}
          />
          <section className='content'>
            <div class="container-fluid">
              {/* {isRequesting && } */}
              {this._filter()}
              {/* {dataHistory.length>0 &&(
                  <div className="alert alert-info alert-dismissible" style={{marginLeft:20,marginRight:20}}>
                  <button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
                  <h5><i className="icon fas fa-info" /> Tip!</h5>
                  Untuk mengurutkan data, Anda dapat mengklik salah satu tajuk tabel di bawah ini
                </div>
              )} */}
              {this._table(_previewData(dataHistory),isRequesting)}
            </div>
          </section>
        </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
 console.log("mapStateToProps",state.dashboard);
  
  return {
    f_id:state.rptransactionfilter.f_id,
    f_amount_start:state.rptransactionfilter.f_amount_start,
    f_amount_end:state.rptransactionfilter.f_amount_end,
    f_date_start:state.rptransactionfilter.f_date_start,
    f_date_end:state.rptransactionfilter.f_date_end,
    f_status: state.rptransactionfilter.f_status,
    f_trx_id: state.rptransactionfilter.f_trx_id,
    f_isFiltering: state.rptransactionfilter.isFiltering,
    error: state.rptransaction.errors,
    status: state.rptransaction.status,
    isRequesting: state.rptransaction.isRequesting,
    data: state.rptransaction.trxData
  }
}
const mapDispatchToProps = dispatch => {
  
  return {
    transactionSummaryFetch: data => dispatch(SummaryAction.fetchTransaction(data)),
    doFilter:data => dispatch(FilterAction.doFilter(data)),
    filterReset:data => dispatch(FilterAction.filterReset(data))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  injectIntl(withRouter(PageHistoryTransaction))
)