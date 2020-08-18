import React, { Component } from 'react'
// import Moment from 'moment'
import { loadScriptRecallDatePicker } from '../../Utils/Utils'

export default class FilterTransaction extends Component {
  constructor (props) {
    super(props)
    this.handleOnChange = this.handleOnChange.bind(this)
    this.daterangeOnChange = this.daterangeOnChange.bind(this)
    this.handleOnClickResetFilter = this.handleOnClickResetFilter.bind(this)
  }

  // componentWillMount () {
  //   this.props.tablepaginationResetFilter()
  // }

  componentDidMount () {
    loadScriptRecallDatePicker(this.daterangeOnChange)
  }

  daterangeOnChange (start, end) {
    const filter = { transactionStartDate: new Date(parseInt(start)), transactionEndDate: new Date(parseInt(end)) }
    console.log('filter ====>', filter)
    this.props.tablepaginationReadRequestPatch(filter)
  }

  handleOnChange (e, f) {
    console.log('handleOnChange===>', e)
    const filter = {
      consumerUsername: (this.refs.consumerUsername || {}).value || '',
      merchantRefNo: (this.refs.merchantRefNo || {}).value || '',
      merchantUserId: (this.refs.merchantUserId || {}).value || '',
      sourceOfFund: (this.refs.sourceOfFund || {}).value || '',
      transactionStatus: (this.refs.transactionStatus || {}).value || '',
      transactionStartDate: (this.refs.transactionStartDate || {}).value || '',
      transactionEndDate: (this.refs.transactionEndDate || {}).value || '',
      transactionAmountMin: (this.refs.transactionAmountMin || {}).value || '',
      transactionAmountMax: (this.refs.transactionAmountMax || {}).value || ''
    }
    this.props.tablepaginationReadRequestPatch({ ...filter })
  }

  handleOnClickResetFilter (e) {
    if (e) e.preventDefault()
    console.log('handleOnClickResetFilter')
    this.props.tablepaginationResetFilter()
  }

  _formOnSubmit (e) {
    if (e) e.preventDefault()
    console.log('_formOnSubmit')
    if (this.props.table === 'trxForRefundReview') return this.props.tablepaginationFetchAllTrxForRefundReview({})
    if (this.props.table === 'trxForRefundRequest') return this.props.tablepaginationFetchAllTrxForRefundRequest({})
    if (this.props.table === 'trxForRefundReport') return this.props.tablepaginationFetchAllTrxForRefundRequest({})
    if (this.props.table === 'trxForVAReport') return this.props.tablepaginationFetchAllTrxForVaReport({})
    return this.props.tablepaginationReadRequest({})
  }

  _renderFormGroup (type, label, id, placeholder, options) {
    if (type === 'text' || type === 'number') {
      return (
        <div className='form-group'>
          <label htmlFor={id}>{label}</label>
          <input type={type} className='form-control' id={id} placeholder={placeholder} ref={id} onChange={this.handleOnChange} value={this.props[id]} />
        </div>
      )
    }
    if (type === 'datepicker') {
      return (
        <div className='form-group'>
          <label>{label}</label>
          <div className='input-group'>
            <div className='input-group-prepend'>
              <span className='input-group-text'>
                <i className='far fa-calendar-alt' />
              </span>
            </div>
            <input type='text' className='form-control float-right' id={id} ref={id} onChange={this.handleOnChange} value={this.props[id]} />
          </div>
          {/* /.input group */}
        </div>
      )
    }
    if (type === 'select') {
      return (
        <div className='form-group'>
          <label htmlFor={id}>{label}</label>
          <select className='form-control' style={{ width: '100%' }} ref={id} onChange={this.handleOnChange} defaultValue={this.props[id]}>
            {options.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
          </select>
        </div>
      )
    }
  }

  renderFields (type) {
    if (type === 'mbddEvents') {
      return (
        <div className='row'>
          <div className='col-md-6'>
            {this._renderFormGroup('text', 'Merchant Ref. No', 'merchantRefNo', 'Merchant Ref No')}
          </div>
          <div className='col-md-6'>
            {!this.props.withoutStatus && this._renderFormGroup('select', 'Status', 'transactionStatus', 'Status', [{ value: '', label: '-- select status --' }, { value: 'SETLD', label: 'Settle' }, { value: 'PNDNG', label: 'Pending' }, { value: 'REJEC', label: 'Reject' }])}
            {this.props.withRefundStatus && this._renderFormGroup('select', 'Status', 'transactionStatus', 'Status', [{ value: '', label: '-- select status --' }, { value: 'REFREQ', label: 'Refund Request' }, { value: 'REFAPP', label: 'Refund Approve' }, { value: 'REFREJ', label: 'Refund Reject' }])}
            {this._renderFormGroup('datepicker', 'Range Date', 'transactionStartDate', 'Range Date')}
            {/* {this._renderFormGroup('datepicker', 'End Date', 'transactionEndDate', 'End Date')} */}
          </div>
        </div>
      )
    } else if (type === 'trxForVAReport') {
      return (
        <div className='row'>
          <div className='col-md-6'>
            {this._renderFormGroup('text', 'Merchant Ref. No', 'merchantRefNo', 'Merchant Ref No')}
            {this._renderFormGroup('text', 'Student Name', 'consumerUsername', 'Student Name')}
          </div>
          <div className='col-md-6'>
            {/* {!this.props.withoutStatus && this._renderFormGroup('select', 'Status', 'transactionStatus', 'Status', [{ value: '', label: '-- select status --' }, { value: 'SETLD', label: 'Settle' }, { value: 'PNDNG', label: 'Pending' }, { value: 'REJEC', label: 'Reject' }])} */}
            {/* {this.props.withRefundStatus && this._renderFormGroup('select', 'Status', 'transactionStatus', 'Status', [{ value: '', label: '-- select status --' }, { value: 'REFREQ', label: 'Refund Request' }, { value: 'REFAPP', label: 'Refund Approve' }, { value: 'REFREJ', label: 'Refund Reject' }])} */}
            {this._renderFormGroup('datepicker', 'Payment Date', 'transactionStartDate', 'Range Payment Date')}
            {/* {this._renderFormGroup('datepicker', 'End Date', 'transactionEndDate', 'End Date')} */}
          </div>
        </div>
      )
    } else {
      return (
        <div className='row'>
          <div className='col-md-6'>
            {this._renderFormGroup('text', 'Merchant Ref. No', 'merchantRefNo', 'Merchant Ref No')}
            {this._renderFormGroup('text', 'Bank Ref. No', 'bankRefNo', 'Bank Ref No')}
            {this._renderFormGroup('text', 'Merchant User Id', 'merchantUserId', 'Merchant User Id')}
            {!this.props.withoutSof && this._renderFormGroup('select', 'Source Of Fund', 'sourceOfFund', 'Source Of Fund', [{ value: '', label: '-- select bank --' }, { value: 'bank-btpn', label: 'Jenius - Bank BTPN' }, { value: 'bank-cimb', label: 'Bank CIMB Niaga' }])}
            {(this.props.userRole === '100' || this.props.userRole === '200' || this.props.userRole === '210' || this.props.userRole === '400') && this._renderFormGroup('number', 'Merchant Code', 'merchantCode', 'Merchant Code')}
          </div>
          <div className='col-md-6'>
            {!this.props.withoutStatus && this._renderFormGroup('select', 'Status', 'transactionStatus', 'Status', [{ value: '', label: '-- select status --' }, { value: 'SETLD', label: 'Settle' }, { value: 'PNDNG', label: 'Pending' }, { value: 'REJEC', label: 'Reject' }])}
            {this.props.withRefundStatus && this._renderFormGroup('select', 'Status', 'transactionStatus', 'Status', [{ value: '', label: '-- select status --' }, { value: 'REFREQ', label: 'Refund Request' }, { value: 'REFAPP', label: 'Refund Approve' }, { value: 'REFREJ', label: 'Refund Reject' }])}
            {this._renderFormGroup('number', 'Minimal Amount', 'transactionAmountMin', 'Minimal Amount')}
            {this._renderFormGroup('number', 'Maximal Amount', 'transactionAmountMax', 'Maximal Amount')}
            {this._renderFormGroup('datepicker', 'Range Date', 'transactionStartDate', 'Range Date')}
            {/* {this._renderFormGroup('datepicker', 'End Date', 'transactionEndDate', 'End Date')} */}
          </div>
        </div>
      )
    }
  }

  render () {
    console.log('renderfiltertransaction props=', this.props)
    return (
      <form className='form' onSubmit={(e) => this._formOnSubmit(e)}>
        <div className='card'>
          <div className='card-header'>
            <h5 className='card-title'>Data Filter</h5>
            <div className='card-tools'>
              <button type='button' className='btn btn-tool myCardWidget' data-card-widget='collapse'>
                <i className='fas fa-minus' />
              </button>
            </div>
          </div>
          <div className='card-body'>

            {this.renderFields(this.props.type)}

          </div>
          <div className='card-footer'>
            <button type='submit' className='btn btn-info' style={{ marginRight: 5 }}>
              <i className='fas fa-search' /> Search
            </button>
            <button type='button' className='btn btn-info' onClick={this.handleOnClickResetFilter} style={{ marginRight: 5 }}><i className='fas fa-close' /> Reset</button>
            {!this.props.type &&
              <div className='btn-group' style={{ merginLeft: 10 }}>
                <button type='button' className='btn btn-warning'>Download</button>
                <button type='button' className='btn btn-warning dropdown-toggle dropdown-icon' data-toggle='dropdown'>
                  <span className='sr-only'>Toggle Dropdown</span>
                  <div className='dropdown-menu' role='menu'>
                    <a className='dropdown-item' href='/#'>Download CSV</a>
                    <a className='dropdown-item' href='/#'>Download TXT</a>
                  </div>
                </button>
              </div>}
          </div>

        </div>
      </form>
    )
  }
}
